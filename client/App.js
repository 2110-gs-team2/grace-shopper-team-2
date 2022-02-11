import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import Routes from "./Routes";
import { me } from "./store";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
