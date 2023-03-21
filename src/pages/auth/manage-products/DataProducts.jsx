import React from "react";
import LayoutDashboard from "../../../components/layout/LayoutDashboard";
import ListProduct from "../../../components/manage-products/ListProduct";

const DataProducts = () => {
  return (
    <>
      <LayoutDashboard>
        <ListProduct />
      </LayoutDashboard>
    </>
  );
};

export default DataProducts;
