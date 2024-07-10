import React from "react";
import { X } from "lucide-react";
import { useStore } from "../context/Context";
const AddRtsp = ({ onClose }) => {
  const { setRtsp, rtsp, publishStream } = useStore();
  return (
    <div className="rtsp-modal">
      <div className="inner-content">
        <input
          className=" "
          placeholder="Enter RTSP Link"
          value={rtsp}
          onChange={(e) => setRtsp(e.target.value)}
        />
        <button
          className="btn btn-primary btn-sm w-auto whitespace-nowrap"
          onClick={publishStream}
        >
          Publish Stream
        </button>
      </div>
      <X className="close-icon" onClick={onClose} />
    </div>
  );
};

export default AddRtsp;
