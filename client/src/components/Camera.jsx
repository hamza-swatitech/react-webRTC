import React, { useEffect, useState, useRef } from "react";

import { useStore } from "../context/Context";
import { EyeOff, Minimize2 } from "lucide-react";
// import mp4 from "../assets/videos/stream.mp4";
import SimpleIconWrapper from "./SimpleIconWrapper";

const Camera = ({ stream, cameraId }) => {
  const videoRef = useRef(null);
  const [count, setCount] = useState(0);
  const [isRed, setIsRed] = useState(false);

  const { display, media } = useStore();
  const heights = {
    1: "95%",
    2: "192px",
    3: "190px",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(count + 1);
    }, 5000);

    return () => clearTimeout(timer);
  }, [count]);
  useEffect(() => {
    if (count > 0) {
      setIsRed((prev) => !prev);
    }
  }, [count]);
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  return (
    <div
      className={`singleCamera position-relative w-100 h-100   ${
        isRed && "border border-danger"
      }`}
      style={{ height: heights[display] }}
    >
      <div
        className={`streamHeader d-flex ${
          isRed ? "bg-danger" : "bgPrimary"
        } py-3 align-items-center text-white  justify-content-between px-2`}
      >
        <h6>Camera {cameraId}</h6>

        <div className="d-flex gap-3 rounded-sm ">
          <SimpleIconWrapper isRed={isRed}>
            <EyeOff className="text-main" width={15} height={15} />
          </SimpleIconWrapper>
          <SimpleIconWrapper isRed={isRed}>
            <Minimize2 className="text-main" width={15} height={15} />
          </SimpleIconWrapper>
        </div>
      </div>
      {/* camera stream */}
      <div className="bg-card streamArea w-100 overflow-hidden ratio ratio-16x9">
        {/* <img id="cameraA" src={url} alt="stream" />  */}

        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          width={610}
          height={480}
          controls
        ></video>
      </div>
    </div>
  );
};
export default Camera;
