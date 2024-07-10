import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { io } from "socket.io-client";
import * as mediasoup from "mediasoup-client";
import { viewStyle } from "../constants/display";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  let device = useRef(null);
  let receiveTransport = useRef(null);
  const [socket, setSocket] = useState(null);
  const [display, setDisplay] = useState(1);
  const [streamModal, setStreamModal] = useState(false);
  const [lists, setLists] = useState(viewStyle);
  const [media, setMedia] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [cameraData, setCameraData] = useState([]);

  useEffect(() => {
    const fetchCameraData = async () => {
      try {
        const res = await fetch("https://secure-api.swatitech.com/cameras/");
        const data = await res.json();
        setCameraData(data.results);
      } catch (err) {
        console.log("Error fetching camera data:", err);
      }
    };

    fetchCameraData();

    const socketCon = io("http://36.50.13.22:5000");
    setSocket(socketCon);

    socketCon.on("connect", () => {
      console.log("Connected to the socket server");

      socketCon.emit("getRTPCaps", async (caps) => {
        try {
          device.current = new mediasoup.Device();
          await device.current.load({ routerRtpCapabilities: caps });

          console.log("Device loaded successfully", device.current);
          setIsReady(true);
        } catch (error) {
          console.error("Error loading device:", error);
        }
      });

      socketCon.on("videoConsumerCreated", async (data) => {
        try {
          const { producerId, kind, id, rtpParameters } = data;

          const consumer = await receiveTransport.current.consume({
            id,
            producerId,
            kind,
            rtpParameters,
          });
          const mediaStream = new MediaStream();
          mediaStream.addTrack(consumer.track);

          setMedia((prevMedia) => [...prevMedia, mediaStream]);

          console.log("Media stream created:", mediaStream);
        } catch (error) {
          console.error("Error creating video consumer:", error);
        }
      });
    });

    socketCon.on("disconnect", () => {
      console.log("Disconnected from the socket server");
    });

    return () => socketCon.close();
  }, []);

  const publishStream = useCallback(
    async (rtspUrl) => {
      if (!socket || !device.current) return;

      console.log("Publishing stream:", rtspUrl);
      socket.emit("createTransport", rtspUrl, async (params) => {
        try {
          receiveTransport.current = await device.current.createRecvTransport(
            params
          );

          receiveTransport.current.on(
            "connect",
            ({ dtlsParameters }, callback, errback) => {
              socket.emit(
                "transportConnect",
                { rtsp: rtspUrl, dtlsParameters },
                callback
              );
            }
          );

          receiveTransport.current.on("connectionstatechange", (state) => {
            console.log("Connection state changed:", state);
            switch (state) {
              case "connecting":
                console.log("Connecting to stream!");
                break;
              case "connected":
                console.log("Subscribed!");
                break;
              case "failed":
                console.log("Failed!");
                break;
              default:
                break;
            }
          });

          socket.emit("startConsuming", {
            rtsp: rtspUrl,
            rtpCapabilities: device.current.rtpCapabilities,
          });
        } catch (error) {
          console.error("Error creating transport:", error);
        }
      });
    },
    [socket, device]
  );

  useEffect(() => {
    if (isReady && cameraData.length > 0) {
      cameraData.forEach((camera) => {
        const rtspUrl = `rtsp://${camera.username}:${camera.password}@${camera.ip_address}:${camera.port}`;
        publishStream(rtspUrl);
      });
    }
  }, [isReady, cameraData, publishStream]);

  const value = {
    display,
    setDisplay,
    lists,
    setLists,
    media,
    publishStream,
    // rtsp,
    // setRtsp,
    streamModal,
    setStreamModal,
    socket,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useStore = () => useContext(AppContext);
