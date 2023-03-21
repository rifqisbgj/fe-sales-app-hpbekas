import React from "react";
import LayoutDashboard from "../../../components/layout/LayoutDashboard";
import AddTransaction from "../../../components/manage-transaction/AddTransaction";

const CreateTransaction = () => {
  return (
    <LayoutDashboard>
      <AddTransaction />
    </LayoutDashboard>
  );
};

export default CreateTransaction;
