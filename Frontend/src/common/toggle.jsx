import React from "react";
import styled from "styled-components";
import { useTheme } from "../context/themcontext";

const Switch = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <StyledWrapper>
      <label className="switch">
        <input
          type="checkbox"
          checked={mode === "dark"}
          onChange={toggleTheme}
        />
        <span className="slider" />
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .switch {
    font-size: 17px;
    position: relative;
    display: inline-block;
    width: 3.5em;
    height: 2em;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    /* Background for Light Mode */
    --background: #f4f4f5; 
    position: absolute;
    cursor: pointer;
    inset: 0;
    background-color: var(--background);
    transition: .5s;
    border-radius: 30px;
    border: 1px solid #e4e4e7;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.4em;
    width: 1.4em;
    border-radius: 50%;
    left: 10%;
    bottom: 15%;
    /* SUN APPEARANCE (Default/Light Mode) */
    background: #ffdb00; 
    box-shadow: 0 0 10px #ffdb00, 0 0 20px #ffdb00;
    transition: .5s;
  }

  /* Background for Dark Mode */
  input:checked + .slider {
    background-color: #28096b;
    border-color: #28096b;
  }

  input:checked + .slider:before {
    transform: translateX(100%);
    /* MOON APPEARANCE (Dark Mode) */
    background: #28096b; /* Match slider background to hide part of the circle */
    box-shadow: inset 8px -4px 0px 0px #fff000; /* This creates the crescent moon shape */
  }
`;

export default Switch;