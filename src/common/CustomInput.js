import React, { forwardRef } from "react";

const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <input
    type="text"
    value={value}
    onClick={onClick}
    readOnly
    ref={ref}
    style={{ cursor: "pointer" }} // Optionally, change the cursor to indicate clickability
  />
));

export default CustomInput;
