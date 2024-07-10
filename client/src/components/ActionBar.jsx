import React from "react";
import { useStore } from "../context/Context";
import IconWrapper from "./IconWrapper";
import { useStream } from "../context/StreamContext";
// import Portal from "../Portal";
// import AddRtsp from "./AddRtsp";
const ActionBar = () => {
  const { lists, setLists, media } = useStore();

  const { urls } = useStream();
  const { setDisplay } = useStore();
  const handleClick = (i) => {
    const newList = lists.map((list, index) => ({
      ...list,
      isActive: i === index,
    }));
    setLists(newList);
    setDisplay(++i);
  };
  // const handleCloseModal = () => {
  //   setStreamModal(false);
  // };
  return (
    <>
      {/* {streamModal && (
        <Portal>
          <AddRtsp onClose={handleCloseModal} />
        </Portal>
      )} */}
      <div className="d-flex align-items-center gap-2">
        <div
          className="d-flex border border-danger cursor-pointer text-danger py-1 px-3 rounded align-items-center"
          style={{ backgroundColor: "#BB3E3E1A" }}
        >
          &bull;&nbsp;Live
        </div>

        <div
          className="d-flex bgMain  text-white cursor-pointer py-2 px-3 rounded align-items-center"
          // onClick={() => setStreamModal(true)}
        >
          Playback
        </div>

        <div className="d-flex align-items-center gap-2">
          {media.length <= 1
            ? lists.slice(0, 1).map((item, i) => (
                <IconWrapper
                  key={i}
                  handleClick={handleClick}
                  index={i}
                  isActive={item.isActive}
                  activeSvg={item.activeSvg}
                  length={urls.length}
                >
                  {item.icon}
                </IconWrapper>
              ))
            : lists.map((item, i) => (
                <IconWrapper
                  key={i}
                  handleClick={handleClick}
                  index={i}
                  isActive={item.isActive}
                  activeSvg={item.activeSvg}
                  length={urls.length}
                >
                  {item.icon}
                </IconWrapper>
              ))}
        </div>
      </div>
    </>
  );
};

export default ActionBar;
