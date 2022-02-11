import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import Routes from "./Routes";
import { me } from "./store";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
