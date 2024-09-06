import React from "react";

export const Input = ({
  label,
  name,
  type,
  placeholder,
  value = "",
  onChange = () => {},
}) => {
  return (
    <div>
      <div className="mb-8">
        <label className="block ml-1">{label}</label>
        <input
          name={name}
          type={type}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
