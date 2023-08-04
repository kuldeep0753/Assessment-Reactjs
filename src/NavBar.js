import React from "react";
import { blogIma } from "./utils";
import {  NavLink } from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from "./firebaseConfig";
import "./NavBar.css";

import SignediInOut from "./auth/SignediInOut";

const NavBar = () => {
  const nabBar={display:"flex" , justifyContent:"space-evenly"}

const [user] =useAuthState(auth);
console.log(user);

// const signOut=()=>{
//   console.log(signOut(auth));
// }

  return (
    <div className="" style={{ background: "whitesmoke" }}>
      <nav className="">
        <div>
          <img src={blogIma} width={30} height={30} alt="logo" />
        </div>
        <div className="nav-link" style={nabBar}>
          <NavLink to="/">Blog</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Log In</NavLink>
        </div>
        <div className="user-register">
          {user &&(<SignediInOut user={user}/>)}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
