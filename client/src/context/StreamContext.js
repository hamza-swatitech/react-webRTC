import { createContext, useContext, useEffect, useState } from "react";

const Stream = createContext();

export const StreamContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const urls = [
    "https://media-wrtc.swatitech.com/SecureEye/play.html?id=swati_web202",
  ];
  useEffect(() => {
    try {
      const personSocket = new WebSocket("ws://36.50.13.21:8765");
      const fightSocket = new WebSocket("ws://36.50.13.21:8766");
      const fireSmokeSocket = new WebSocket("ws://36.50.13.21:8767");
      // const personSocket = new WebSocket("");
      // const fightSocket = new WebSocket("ws://36.50.13.");
      // const fireSmokeSocket = new WebSocket("ws://36.50.21:");

      const processData = (messageData, camera) => {
        let processedData;
        if (camera === "personSocket") {
          processedData =
            messageData > 0 ? `${messageData} Peoples detected` : null;
        } else if (camera === "fightSocket") {
          processedData = messageData === "noFight" ? null : "Fight";
        } else if (camera === "fireSmokeSocket") {
          processedData = messageData === "0" ? null : `Fire Detected`;
        }
        return {
          date: new Date().toLocaleString(),
          camera: "camera 01",
          response: processedData,
        };
      };

      personSocket.onopen = () => {
        console.log("Connected to personSocket");
      };
      personSocket.onmessage = (event) => {
        const messageData = event.data;
        setTimeout(() => {
          const processedData = processData(messageData, "personSocket");
          setData((prevData) => [...prevData, processedData]);
        }, 3000); // Delay processing by 1 second
      };
      personSocket.onerror = (error) => {
        console.error("Error with personSocket:", error);
      };

      fightSocket.onopen = () => {
        console.log("Connected to fightSocket");
      };
      fightSocket.onmessage = (event) => {
        const messageData = event.data;
        setTimeout(() => {
          const processedData = processData(messageData, "fightSocket");
          setData((prevData) => [...prevData, processedData]);
        }, 3000); // Delay processing by 1 second
      };
      fightSocket.onerror = (error) => {
        console.error("Error with fightSocket:", error);
      };

      fireSmokeSocket.onopen = () => {
        console.log("Connected to fireSmokeSocket");
      };
      fireSmokeSocket.onmessage = (event) => {
        const messageData = event.data;
        setTimeout(() => {
          const processedData = processData(messageData, "fireSmokeSocket");
          setData((prevData) => [...prevData, processedData]);
        }, 3000); // Delay processing by 1 second
      };
      fireSmokeSocket.onerror = (error) => {
        console.error("Error with fireSmokeSocket:", error);
      };

      return () => {
        // Close WebSocket connections when the component unmounts
        personSocket.close();
        fightSocket.close();
        fireSmokeSocket.close();
      };
    } catch (err) {
      console.log(err);
    }
  }, []);

  return <Stream.Provider value={{ data, urls }}>{children}</Stream.Provider>;
};

export const useStream = () => useContext(Stream);
