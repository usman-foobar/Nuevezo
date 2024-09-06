import React from "react";

export const Tab = ({ tabName, key, activeTab, onClickHandler = () => {} }) => {
  return (
    <div key={key}>
      <li className="mb-4">
        <button
          onClick={onClickHandler}
          href="#"
          className="flex items-center p-2 hover:bg-blue-700 rounded w-full"
        >
          <span>{tabName}</span>
        </button>
      </li>
    </div>
  );
};
