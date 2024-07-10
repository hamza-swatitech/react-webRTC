import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import styles from "./style.module.css";

const CustomDropdown = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const handleClick = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);
  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };
  return (
    <div
      className={styles.dropdown}
      onClick={handleToggle}
      ref={dropDownRef} // Attach the ref to the dropdown div
    >
      <div className="d-flex align-items-center justify-content-between px-2 position-relative ">
        <label className="text-nowrap text-capitalize">{selectedOption}</label>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>
      {isOpen && (
        <div className={styles.dropDownMenu}>
          {options.map((option, index) => (
            <div
              className={styles.dropDownOptions}
              key={index}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
