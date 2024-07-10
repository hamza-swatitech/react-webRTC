const video = document.getElementById("video");
const audio = document.getElementById("audio");
const play = document.getElementById("play");

const socket = io("http://36.50.13.22:5000");

let receiveTransport;
let device;

socket.on("connect", () => {
  socket.emit("getRTPCaps", async (caps) => {
    device = new window.mediasoup.Device();
    console.log("device", device);

    await device.load({ routerRtpCapabilities: caps });

    console.log("device", device);

    if (device.loaded) {
      console.log("device loaded successfully");
    } else {
      console.log("not loaded");
    }
  });

  socket.on("videoConsumerCreated", async (data) => {
    console.log(data, "videoConsumerCreated");

    const { producerId, kind, id, rtpParameters, rtsp } = data;

    let codecOptions = {};

    const consumer = await receiveTransport?.consume({
      id,
      producerId,
      kind,
      rtpParameters,
      codecOptions,
    });
    const mediaStream = new MediaStream();
    mediaStream.addTrack(consumer.track);

    const videosCont = document.getElementById("videos");

    const video = document.createElement("video");
    video.width = 640;
    video.height = 480;
    video.srcObject = mediaStream;
    video.autoplay = true;
    video.controls = true;

    videosCont.appendChild(video);

    console.log(mediaStream, "mediastream", consumer.track);
  });
});

async function handlePublish() {
  const rtsp = document.getElementById("rtsp").value;

  socket.emit("createTransport", rtsp, async (params) => {
    console.log("in create transport");
    receiveTransport = await device?.createRecvTransport(params);

    receiveTransport?.on("connect", ({ dtlsParameters }, callback, errback) => {
      console.log("in connect transport");
      socket.emit("transportConnect", { rtsp: rtsp, dtlsParameters }, () => {
        callback();
      });
    });

    receiveTransport?.on("connectionstatechange", (state) => {
      console.log(state, "state");
      switch (state) {
        case "connecting":
          console.log("Connecting To Stream!");
          break;
        case "connected":
          console.log("subscribed!");
          break;
        case "failed":
          console.log("Failed!");
          break;
        default:
          break;
      }
    });

    socket.emit("startConsuming", {
      rtsp: rtsp,
      rtpCapabilities: device?.rtpCapabilities,
    });
  });
}
