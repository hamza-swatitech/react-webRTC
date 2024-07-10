import mediasoup from "mediasoup";
import { spawn } from "child_process";
import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createNewTransport } from "./transport.js";
import cors from "cors";
import { getPorts } from "./port.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const mediaCodecs = [
  {
    kind: "video",
    mimeType: "video/H264",
    clockRate: 90000,
    parameters: {
      "packetization-mode": 1,
      "profile-level-id": "42e01f",
      "level-asymmetry-allowed": 1,
    },
  },
];

let router;
let videoProducers = new Map();
let userStreams = new Map();

let transports = new Map();

const app = express();

app.use(cors());

app.use("/public", express.static(__dirname + "/public"));

app.get("/", async (req, res) => {
  res.sendFile(join(__dirname + "/public/index.html"));
});

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(socket.id, "connected");

  socket.on("getRTPCaps", (callback) => {
    callback(router?.rtpCapabilities);
  });

  socket.on("createTransport", async (rtsp, callback) => {
    const [gstProcess, videoTransport] = await createStream(rtsp, socket);
    const newTrans = await createNewTransport(router);
    transports.set(`${socket.id}-${rtsp}`, newTrans?.transport);

    if (userStreams.has(socket.id)) {
      userStreams.set(socket.id, [
        ...userStreams.get(socket.id),
        {
          rtsp: rtsp,
          process: gstProcess,
          produceTransport: videoTransport,
          consumeTransport: newTrans?.transport,
        },
      ]);
    } else {
      userStreams.set(socket.id, [
        {
          rtsp: rtsp,
          process: gstProcess,
          produceTransport: videoTransport,
          consumeTransport: newTrans?.transport,
        },
      ]);
    }
    callback(newTrans?.params);
  });

  socket.on("startConsuming", async (data) => {
    const producer = videoProducers.get(`${socket.id}-${data?.rtsp}`);
    const transport = transports.get(`${socket.id}-${data?.rtsp}`);
    const VideoConsumer = await transport.consume({
      producerId: producer?.id,
      rtpCapabilities: data?.rtpCapabilities,
      paused: false,
    });

    setTimeout(async () => {
      await VideoConsumer.requestKeyFrame();
    }, 1000);

    io.to(socket.id).emit("videoConsumerCreated", {
      producerId: producer.id,
      kind: VideoConsumer.kind,
      id: VideoConsumer.id,
      rtpParameters: VideoConsumer.rtpParameters,
      paused: VideoConsumer?.paused,
      rtsp: data?.rtsp,
    });
  });

  socket.on("transportConnect", async (data, callback) => {
    try {
      const transport = transports.get(`${socket.id}-${data?.rtsp}`);
      await transport.connect({ dtlsParameters: data?.dtlsParameters });
      callback("ok");
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("disconnect", async () => {
    try {
      const userStream = userStreams.get(socket.id);

      if (userStream) {
        for (let stream of userStream) {
          await stream?.consumeTransport?.close();
          await stream?.produceTransport?.close();
          stream?.process?.kill();

          videoProducers.delete(`${socket.id}-${stream?.rtsp}`);
          transports.delete(`${socket.id}-${stream?.rtsp}`);
        }

        userStreams.delete(socket.id);
      }
    } catch (err) {
      console.log(err);
    }
  });
});

async function createRouter() {
  const worker = await mediasoup.createWorker({
    rtcMinPort: 40000,
    rtcMaxPort: 49999,
  });
  router = await worker.createRouter({ mediaCodecs: mediaCodecs });
}

async function createStream(rtsp, socket) {
  const videoTransport = await router.createPlainTransport({
    listenIp: {
      ip: "0.0.0.0",
      announcedIp: "127.0.0.1",
    },
    rtcpMux: false,
    comedia: false,
  });

  // check transport stats
  // setInterval(() => {
  //   videoTransport.getStats().then((stats) => {
  //     console.log(stats, 'transport stats',videoTransport)
  //   })
  // }, 5000)

  const [rtp, rtcp] = await getPorts();

  await videoTransport.connect({
    ip: "127.0.0.1",
    port: rtp,
    rtcpPort: rtcp,
  });

  const videoRtpPort = videoTransport.tuple.localPort;
  const videoRtcpPort = videoTransport.rtcpTuple.localPort;

  const videoProducer = await videoTransport.produce({
    kind: "video",
    rtpParameters: {
      codecs: [
        {
          kind: "video",
          mimeType: "video/H264",
          payloadType: 102,
          clockRate: 90000,
          parameters: {
            "packetization-mode": 1,
            "profile-level-id": "42e01f",
            "level-asymmetry-allowed": 1,
          },
          rtcpFeedback: [
            { type: "nack" },
            { type: "nack", parameter: "pli" },
            { type: "ccm", parameter: "fir" },
            { type: "goog-remb" },
          ],
        },
      ],
      encodings: [{ ssrc: 22222222 }],
    },
  });

  videoProducers.set(`${socket.id}-${rtsp}`, videoProducer);

  // check producer stats
  // setInterval(() => {
  //   videoProducer.getStats().then((stats) => {
  //     console.log(stats, 'producer stats',videoProducer)
  //   })
  // }, 5000)

  const gstCommand = "gst-launch-1.0";
  const gstPipeline = `
rtpbin name=r
rtspsrc location=${rtsp} ! 
rtph264depay request-keyframe=true ! h264parse config-interval=1 !
rtph264pay aggregate-mode=zero-latency ! capssetter caps=application/x-rtp,payload=(int)102,clock-rate=(int)90000,ssrc=(uint)22222222,rtcp-fb-nack-pli=(int)1,rtcp-fb-nack=(int)1,rtcp-fb-ccm-fir=(int)1,rtcp-fb-goog-remb=(int)1 !
rtprtxqueue max-size-time=2000 ! r.send_rtp_sink_0 r.send_rtp_src_0 !
udpsink host=127.0.0.1 port=${videoRtpPort} bind-address=127.0.0.1 bind-port=${rtp}
r.send_rtcp_src_0 ! udpsink host=127.0.0.1 port=${videoRtcpPort} bind-address=127.0.0.1 sync=false async=false
udpsrc port=${rtcp} ! r.recv_rtcp_sink_0
`;

  const gstArgs = ["-e", ...gstPipeline.split(/\s+/)];

  const gstProcess = spawn(gstCommand, gstArgs);

  gstProcess.stdout.on("data", (data) => {
    console.log(`GST stdout - ${rtsp}: ${data}`);
  });

  gstProcess.stderr.on("data", (data) => {
    console.error(`Gst stderr - ${rtsp}: ${data}`);
  });

  gstProcess.on("close", async (code) => {
    console.log(`Gst process - ${rtsp} exited with code ${code}`);
  });

  return [gstProcess, videoTransport];
}

createRouter();

server.listen(5000, () => {
  console.log("Server Listening Successfully!");
});
