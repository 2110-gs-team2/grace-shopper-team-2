import React from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Routes from "./Routes";

const App = () => {
  return (
    <div>
      <Navbar />
      <Main />
      <Routes />
    </div>
  );
};

export default App;
