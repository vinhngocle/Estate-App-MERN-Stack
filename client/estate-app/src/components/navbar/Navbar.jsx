import { useState } from "react";
import "./navbar.scss";

const Navbar = () => {
  const [open, setOpen] = useState(false); 
  return (
    <nav>
      <div className="left">
        <a href="" className="logo">
          <img src="/logo.png" />
          <span>LamaEstate</span>
        </a>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/agent">Agents</a>
      </div>
      <div className="right">
        <a href="/sign-in">Sign in</a>
        <a href="/sign-up" className="register">
          Sign up
        </a>
        <div className="menuIcon">
          <img src="/menu.png" alt="" onClick={() => setOpen((prev) => !prev)} />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/agent">Agents</a>
          <a href="/sign-in">Sign in</a>
          <a href="/sign-up">Sign up</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
