import MainNav from "../navbar/MainNav";
import React from "react";

const LayoutNonUser = ({ children }) => {
  return (
    <React.Fragment>
      <div className="bg-white">
        <MainNav />
        {children}
      </div>
    </React.Fragment>
  );
};

export default LayoutNonUser;
