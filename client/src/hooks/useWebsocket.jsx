// import { useState, useEffect, useCallback } from "react";

// const useWebSocket = (urls) => {
//   const [data, setData] = useState([]);

//   const connect = useCallback(() => {
//     const sockets = urls.map((url) => new WebSocket(url));
//     const messages = Array(urls.length).fill(null); // Store latest messages from each socket

//     sockets.forEach((socket, index) => {
//       socket.onopen = () => {
//         console.log(`Connected to WebSocket ${urls[index]}`);
//       };

//       socket.onmessage = (event) => {
//         const messageData = event.data;
//         messages[index] = messageData;

//         if (messages.every((msg) => msg !== null)) {
//           const currentTime = new Date().toISOString();
//           setData((prevData) => [
//             ...prevData,
//             {
//               response: messages.slice().join(" | "),
//               time: currentTime,
//               camera: "camera1",
//             },
//           ]);
//         }
//       };

//       socket.onerror = (error) => {
//         console.error(`WebSocket ${urls[index]} error: `, error);
//       };

//       socket.onclose = () => {
//         console.log(`WebSocket ${urls[index]} closed`);
//         // Optionally, you can add logic to reconnect
//       };
//     });

//     return () => {
//       sockets.forEach((socket) => socket.close());
//     };
//   }, [urls]);

//   useEffect(() => {
//     const cleanup = connect();
//     return cleanup;
//   }, [connect]);

//   return data;
// };

// export default useWebSocket;

// import { useState, useEffect, useCallback } from "react";

// const useWebSocket = (urls) => {
//   // const getResponse = (socket, data) => {
//   //   if (socket === "ws://103.217.176.234:8765") {
//   //     return `${data} persons`;
//   //   } else if (socket === "ws://103.217.176.234:8766") {
//   //     if (data === "noFight") {
//   //       return "No Fight Detected";
//   //     }
//   //   } else if (socket === "ws://103.217.176.234:8767") {
//   //     if (data === 0) {
//   //       return `No fire detected`;
//   //     } else return data;
//   //   }
//   //   return data;
//   // };

//   const [data, setData] = useState([]);

//   const connect = useCallback(() => {
//     const sockets = urls.map((url) => new WebSocket(url));

//     sockets.forEach((socket, index) => {
//       socket.onopen = () => {
//         console.log(`Connected to WebSocket ${urls[index]}`);
//       };

//       socket.onmessage = (event) => {
//         const messageData = event.data;
//         const currentTime = new Date().toLocaleString();
//         const camera = `camera 01`;

//         setData((prevData) => [
//           ...prevData,
//           {
//             date: currentTime,
//             response: getResponse(socket, messageData),
//             camera: camera,
//           },
//         ]);
//       };

//       socket.onerror = (error) => {
//         console.error(`WebSocket ${urls[index]} error: `, error);
//       };

//       socket.onclose = () => {
//         console.log(`WebSocket ${urls[index]} closed`);
//         // Optionally, you can add logic to reconnect
//       };
//     });

//     return () => {
//       sockets.forEach((socket) => socket.close());
//     };
//   }, [urls]);

//   useEffect(() => {
//     const cleanup = connect();
//     return cleanup;
//   }, [connect]);

//   return data;
// };

// export default useWebSocket;

// import { useState, useEffect, useCallback } from "react";

// const useWebSocket = (urls) => {
//   const [data, setData] = useState([]);

//   const processMessage = (messageData, index) => {
//     console.log(messageData);
//     // Define the logic based on the WebSocket index
//     let processedMessage;
//     if (index === 0) {
//       // for Fight Detetction
//       processedMessage = messageData;
//     } else if (index === 1) {
//       // For fire and smoke
//       const number = parseInt(messageData, 10);
//       if (number === 0) {
//         processedMessage = "no Fire or Smoke";
//       } else {
//         processedMessage = `people detected: ${number}`;
//       }
//     } else if (index === 2) {
//       // The third WebSocket: 'fight', 'no fight' for person
//       processedMessage =
//         messageData > 0 ? `${messageData} peoples` : "No person detected";
//     }
//     return processedMessage;
//   };

//   const connect = useCallback(() => {
//     const sockets = urls.map((url) => new WebSocket(url));

//     sockets.forEach((socket, index) => {
//       socket.onopen = () => {
//         console.log(`Connected to WebSocket ${urls[index]}`);
//       };

//       socket.onmessage = (event) => {
//         const messageData = event.data;
//         const processedMessage = processMessage(messageData, index);
//         const currentTime = new Date().toLocaleString();
//         const camera = `camera${index + 1}`;

//         setData((prevData) => [
//           ...prevData,
//           {
//             date: currentTime,
//             response: processedMessage,
//             camera: camera,
//           },
//         ]);
//       };

//       socket.onerror = (error) => {
//         console.error(`WebSocket ${urls[index]} error: `, error);
//       };

//       socket.onclose = () => {
//         console.log(`WebSocket ${urls[index]} closed`);
//       };
//     });

//     return () => {
//       sockets.forEach((socket) => socket.close());
//     };
//   }, [urls]);

//   useEffect(() => {
//     const cleanup = connect();
//     return cleanup;
//   }, [connect]);

//   return data;
// };

// export default useWebSocket;

import { useState, useEffect, useCallback } from "react";

const useWebSocket = (urls) => {
  const [data, setData] = useState([]);

  const processMessage = (messageData, index) => {
    // Define the logic based on the WebSocket index
    let processedMessage;
    if (index === 0) {
      // The first WebSocket: 'no smoke', 'no fire', 'fire', 'smoke'
      processedMessage = messageData;
    } else if (index === 1) {
      // The second WebSocket: returning a number
      const number = parseInt(messageData, 10);
      if (number === 0) {
        processedMessage = "no fire detected";
      } else {
        processedMessage = `people detected: ${number}`;
      }
    } else if (index === 2) {
      // The third WebSocket: 'fight', 'no fight'
      processedMessage = messageData;
    }
    return processedMessage;
  };

  const connect = useCallback(() => {
    const sockets = urls.map((url) => new WebSocket(url));

    sockets.forEach((socket, index) => {
      socket.onopen = () => {
        console.log(`Connected to WebSocket ${urls[index]}`);
      };

      const receiveMessage = async () => {
        socket.onmessage = (event) => {
          const messageData = event.data;
          const processedMessage = processMessage(messageData, index);
          const currentTime = new Date().toLocaleString();

          setData((prevData) => [
            ...prevData,
            {
              date: currentTime,
              response: processedMessage,
              camera: urls[index],
            },
          ]);
        };
      };

      receiveMessage();
    });

    return () => {
      sockets.forEach((socket) => socket.close());
    };
  }, [urls]);

  useEffect(() => {
    const cleanup = connect();
    return cleanup;
  }, [connect]);

  return data;
};

export default useWebSocket;
