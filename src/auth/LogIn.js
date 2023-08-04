import React,{useState} from "react";
import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  let navigate = useNavigate();
  
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin=async (e)=>{
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth,email, password);
      navigate("/");
    } catch (error) {
        toast(error.code,{type:"error"})
      console.log(error.code);
    }
  }
  return (
    <div className="form">
      <form className="main-form">
        <div>
          <label htmlFor="email">Email:</label><br />
          <input type="email" placeholder="Enter Email"  onChange={handleEmail}/>
        </div><br />

        <div>
          <label htmlFor="password">Password:</label><br />
          <input type="password"  placeholder="Enter Password" onChange={handlePassword}/>
        </div><br />
        <button type="button" className="" onClick={handleLogin}>Log In</button>
      </form>
    </div>
  );
};

export default LogIn;
