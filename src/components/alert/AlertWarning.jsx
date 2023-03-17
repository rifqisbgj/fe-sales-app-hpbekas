import React from "react";

const AlertWarning = ({ msg }) => {
  if (msg) {
    return (
      <div
        class="flex items-center bg-orange-500 rounded-md mb-2 text-white text-sm font-bold px-4 py-3"
        role="alert"
      >
        <p>{msg}</p>
      </div>
    );
  }
};

export default AlertWarning;
