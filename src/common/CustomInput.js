import React, { forwardRef } from "react";

const CustomInput = forwardRef(({ value, onClick, placeholder }, ref) => (
  <input
    type="text"
    value={value}
    onClick={onClick}
    placeholder={placeholder}
    readOnly
    ref={ref}
    style={{ cursor: "pointer" }} // Optionally, change the cursor to indicate clickability
  />
));

export default CustomInput;
