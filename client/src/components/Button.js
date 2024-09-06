import React from "react";

const Button = ({text, onClickHandler = () => {}}) => {
  return (
    <div>
        <button onClick={onClickHandler} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            {text}
        </button>
    </div>
  );
};

export default Button;
