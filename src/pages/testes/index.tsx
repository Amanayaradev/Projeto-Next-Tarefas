import { useState } from "react";

export default function Toggle() {
const [btnDesabled, setBtnDesabled] = useState("ON")
  function handleClick() {
    if(btnDesabled === "ON") {
      setBtnDesabled("OFF")
    } else {
    setBtnDesabled("ON")
    }

  }
  
  return (
    <button onClick={() => handleClick()}>{btnDesabled}</button>
  );
}