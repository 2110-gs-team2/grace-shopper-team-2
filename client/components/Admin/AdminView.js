import React, { Component } from "react";
import AdminTab from "./AdminTab";
import AddInventory from "./AddInventory";

const AdminView = () => {
  return (
    <div className="min-h-[100vh] bg-forest-green">
      <div className="pt-36 pb-20 max-w-7xl m-auto ">
        <div className="md:p-10 p-5 bg-beige w-full rounded-lg">
          <AddInventory />
          <AdminTab />
        </div>
      </div>
    </div>
  );
};

export default AdminView;
