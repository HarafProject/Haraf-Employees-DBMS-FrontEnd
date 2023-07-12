import React, { useState } from "react";
import "./selectfield.css";

const SelectField = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Default option*");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <input
        type="checkbox"
        className="dropdown__switch"
        id="filter-switch"
        hidden
        checked={isOpen}
        onChange={handleToggle}
      />
      <label htmlFor="filter-switch" className="dropdown__options-filter">
        <ul className="dropdown__filter" role="listbox" tabIndex="-1">
          <li className="dropdown__filter-selected" aria-selected="true">
            {selectedOption}
          </li>
          {isOpen && (
            <li>
              <ul className="dropdown__select">
                <li
                  className="dropdown__select-option"
                  role="option"
                  onClick={() => handleOptionSelect("Option 1")}
                >
                  Option 1
                </li>
                <li
                  className="dropdown__select-option"
                  role="option"
                  onClick={() => handleOptionSelect("Option 2")}
                >
                  Option 2
                </li>
                <li
                  className="dropdown__select-option"
                  role="option"
                  onClick={() => handleOptionSelect("Option 3")}
                >
                  Option 3
                </li>
                <li
                  className="dropdown__select-option"
                  role="option"
                  onClick={() => handleOptionSelect("Option 4")}
                >
                  Option 4
                </li>
                <li
                  className="dropdown__select-option"
                  role="option"
                  onClick={() => handleOptionSelect("Option 5")}
                >
                  Option 5
                </li>
              </ul>
            </li>
          )}
        </ul>
        <div>hello</div>
      </label>
    </div>
  );
};

export default SelectField;
