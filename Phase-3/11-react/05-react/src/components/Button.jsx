import React from "react";

const Button = ({ color, text, disabled, size, onClick }) => {
    let colorClass = "";
    switch (color) {
        case "primary":
            colorClass = "bg-blue-500 hover:bg-blue-700";
            break;
        case "secondary":
            colorClass = "bg-gray-500 hover:bg-gray-700";
            break;
        case "success":
            colorClass = "bg-green-500 hover:bg-green-700";
            break;
        case "warning":
            colorClass = "bg-yellow-400 hover:bg-yellow-500";
            break;
        case "danger":
            colorClass = "bg-red-500 hover:bg-red-700";
            break;
        default:
            colorClass = "bg-blue-500 hover:bg-blue-700";
    }
  return (
    <button
      onClick={disabled ? null : onClick}
      className={` border-none rounded text-white font-bold
            ${colorClass}
            
            ${size == "small" && "px-4 py-2 text-sm"}
            ${size == "medium" && "px-6 py-3 text-md"}
            ${size == "large" && "px-8 py-4 text-lg"}

            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
    >
      {text}
    </button>
  );
};

export default Button;
