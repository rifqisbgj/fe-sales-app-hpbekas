import React from "react";

const AlertSuccess = ({ msg }) => {
  if (msg) {
    return (
      <div
        class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3"
        role="alert"
      >
        <p>{msg}</p>
      </div>
    );
  }
};

export default AlertSuccess;
