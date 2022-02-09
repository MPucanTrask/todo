import React from "react";

const CustomCheckbox = ({onChange, label, disabled, name, checked}) => (
  <label>
    <div>{label}</div>
    <input
      type="checkbox"
      disabled={disabled}
      name={name}
      onChange={onChange}
      checked={checked}
    />
  </label>
)

export default CustomCheckbox