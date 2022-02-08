import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../store";
import { Search, Package } from "react-feather";
import GuestMenu from "./GuestMenu";
import UserMenu from "./UserMenu";
import ProductMenu from "./ProductMenu";

const Navbar = ({ handleClick, isLoggedIn }) => {
  const [styleChange, setStyleChange] = useState(false);
  const changeNavbarStyle = () => {
    if (window.scrollY >= 80) {
      setStyleChange(true);
    } else {
      setStyleChange(false);
    }
  };

  useEffect(() => {
    // clean up code
    window.removeEventListener("scroll", changeNavbarStyle);
    window.addEventListener("scroll", changeNavbarStyle, { passive: true });
    return () => window.removeEventListener("scroll", changeNavbarStyle);
  }, []);

  return (
    <div
      className={`${
        styleChange ? "bg-beige bg-opacity-80 shadow-md" : "bg-transparent"
      } fixed px-5 py-3 inset-x-0 transition duration-300 z-20`}
    >
      <div className="flex justify-between items-center m-2">
        <div className="text-lg font-medium relative hover:before:block hover:before:absolute hover:before:h-2 hover:before:top-1/2 hover:before:-translate-y-1/2 hover:before:-inset-x-0.5 hover:before:bg-xlight-green ">
          <ProductMenu />
        </div>
        <img src="/img/logo.svg" className="w-36" alt="" />

        <div className="flex gap-3 flex-row">
          <button>
            <Search strokeWidth={1} width={30} height={30} />
          </button>
          {isLoggedIn ? <UserMenu /> : <GuestMenu />}
          <button>
            <Package strokeWidth={1} width={30} height={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
