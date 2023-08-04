import React from "react";
import { auth } from "../firebaseConfig";
import "../NavBar.css";
import { signOut } from "firebase/auth";

const SignediInOut = ({user}) => {
  return (
    <div>
      <span className="user-email">
        Signed is as {user.displayName || user.email}
      </span>
      <button className="register-button" type="" onClick={() => signOut(auth)}>
        Log Out
      </button>
    </div>
  );
};

export default SignediInOut;
