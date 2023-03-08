import React from "react";
import { useSelector } from "react-redux";

const CompDashboardSuper = () => {
  const { user } = useSelector((state) => state.auth);
  return <div>Hi, {user && user.nama}</div>;
};

export default CompDashboardSuper;
