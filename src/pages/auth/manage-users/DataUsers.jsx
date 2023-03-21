import React from "react";
import LayoutDashboard from "../../../components/layout/LayoutDashboard";
import ListUser from "../../../components/manage-users/ListUser";

const DataUsers = () => {
  return (
    <>
      <LayoutDashboard>
        <ListUser />
      </LayoutDashboard>
    </>
  );
};

export default DataUsers;
