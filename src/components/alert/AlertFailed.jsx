import React from "react";

const AlertFailed = ({ msg }) => {
  return (
    <div
      class="flex items-center bg-red-500 rounded-md mb-2 text-white text-sm font-bold px-4 py-3"
      role="alert"
    >
      {/* jika terdapat kesalahan input */}
      {msg.length > 0 &&
        msg.map((v, indx) => (
          <div key={indx}>
            - {v.message}
            <br />
          </div>
        ))}
    </div>
  );
};

export default AlertFailed;
