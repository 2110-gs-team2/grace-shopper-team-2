import React, { Component } from "react";
import InventoryList from "./InventoryList";

const InventoryView = () => {
  return (
    <div className="min-h-[100vh] bg-forest-green">
      <div className="pt-36 pb-20 max-w-7xl m-auto ">
        <div className="p-10 bg-beige w-full rounded-lg">
          <InventoryList />
        </div>
      </div>
    </div>
  );
};

export default InventoryView;
