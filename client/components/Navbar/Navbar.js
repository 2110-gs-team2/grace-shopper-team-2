import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../../store";
import { Search, Package, Settings } from "react-feather";
import { Link } from "react-router-dom";
import GuestMenu from "./GuestMenu";
import UserMenu from "./UserMenu";
import ProductMenu from "./ProductMenu";
import Cart from "../Purchase/Cart";
import { useLocation } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import SearchBarContainer from "./SearchBarContainer";

const Navbar = ({ isLoggedIn, isAdmin }) => {
  const [styleChange, setStyleChange] = useState(false);
  const { pathname } = useLocation();
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
      className={`${styleChange ? "bg-beige shadow-lg" : ""} ${
        pathname === "/" && !styleChange ? "bg-transparent" : "bg-beige"
      } fixed md:px-5 md:py-3 px-2 py-2 inset-x-0 transition duration-300 z-20`}
    >
      <div className="flex justify-between items-center m-2">
        <div className="md:block hidden text-lg font-medium relative hover:before:block hover:before:absolute hover:before:h-2 hover:before:top-1/2 hover:before:-translate-y-1/2 hover:before:-inset-x-0.5 hover:before:bg-xlight-green ">
          <ProductMenu />
        </div>
        <div className="md:hidden block">
          <MobileMenu />
        </div>
        <Link to="/" className="">
          <img src="/img/logo.svg" className="md:w-36 w-28" alt="" />
        </Link>

        <div className="flex gap-3 flex-row items-center">
          <div>
            <SearchBarContainer setStyleChange={setStyleChange} />
          </div>
          {isLoggedIn ? (
            <UserMenu className="md:block hidden" />
          ) : (
            <GuestMenu />
          )}
          <Cart />
          {isAdmin ? (
            <Link to="/manage" className="md:flex items-center hidden">
              <Settings strokeWidth={1} width={30} height={30} />
            </Link>
          ) : null}
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
    isAdmin: state.auth.role === "ADMIN",
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
