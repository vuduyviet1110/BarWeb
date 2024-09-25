import React, { forwardRef } from "react";

const CustomInput = forwardRef(({ value, onClick, placeholder }, ref) => (
  <input
    type="text"
    value={value}
    onClick={onClick}
    placeholder={placeholder}
    readOnly
    ref={ref}
    style={{
      cursor: "pointer",
      border: "4px solid #ffff",
      borderRadius: "5px",
    }}
  />
));

export default CustomInput;
