import { useRef } from "react";
import { useHistory } from "react-router";
import "./register.css";
import axios from "axios";
import {Link} from "react-router-dom";


export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory();
    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
          passwordAgain.current.setCustomValidity("Passwords don't match!");
        } else {
          const user = {
            username: username.current.value,
            email: email.current.value,
            password: password.current.value,
          };
          try {
            await axios.post("/auth/register", user);
            history.push("/login");
          } catch (err) {
            console.log(err);
          }
        }
      };
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">FFL</h3>
                    <span className="loginDesc">Welcome Back</span>
                </div>
                <div className="loginRight">
                    <form className="registerBox" onSubmit={handleClick}>
                        <input placeholder="Username" required ref={username} className="registerInput" />
                        <input placeholder="Email" required ref={email} type="email"className="registerInput" />
                        <input placeholder="Password" required ref={password} minLength="6" type="password"className="registerInput" />
                        <input placeholder="Comfirm Password" required ref={passwordAgain} minLength="6" type="password" className="registerInput" />
                        <button className="submitSignUp" type="submit">Sign up</button>
                        <Link to = "/login">
                        <button className="loginRegisterButton">Back to Login</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
