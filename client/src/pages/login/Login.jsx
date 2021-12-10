import { useContext, useRef, useState } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import { Link } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);
  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">FFL</h3>
          <span className="loginDesc">Welcome Back</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="password"
              type="password"
              minLength="6"
              required
              className="loginInput"
              ref={password}
            />
            <button className="loginButton">
              {isFetching ? "loading" : "Login"}
            </button>

            <Link to="/register">
              <button className="loginRegisterButton">
                Create your Account
              </button>
            </Link>
            <span className="forgot">Forgot password?</span>
          </form>
        </div>
      </div>
    </div>
  );
}
