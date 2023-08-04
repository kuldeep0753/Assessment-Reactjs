import React, { useState } from "react";
import "./Register.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth,email, password);
      updateProfile(auth.currentUser, { displayName: name })
      navigate("/");
    } catch (error) {
        toast(error.code,{type:"error"})
      console.log(error.code);
    }
  };

  return (
    <div className="form">
      <form className="main-form">
        <div>
          <label htmlFor="name" className="">
            Name:
          </label>
          <br />
          <input
            type="text"
            placeholder="Enter Name"
            onChange={handleName}
            value={name}
          />
        </div>
        <br />
        <div>
          <label htmlFor="name">Email:</label>
          <br />
          <input
            type="email"
            placeholder="Enter Email"
            onChange={handleEmail}
            value={email}
          />
        </div>
        <br />
        <div>
          <label htmlFor="name">Password</label>
          <br />
          <input
            type="password"
            placeholder="Enter Password"
            onChange={handlePassword}
            value={password}
          />
        </div>
        <br />
        <button type="submit" className="register-btn" onClick={handleSignUp}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
