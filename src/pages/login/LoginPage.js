import logo from "../../assets/images/Logo-text.svg";
import "../../assets/styles/pages/login.scss";
import axios from "axios";
import { BASE_URL } from "../../config/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/login`,
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("redirecting to home");
        navigate("/home");
      } else {
        console.log(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <img src={logo}></img>
        <form onSubmit={handleLogin} className="form-container">
          <div className="form-container__inner">
            <label className="form-container__label" htmlFor="username">
              Username
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              className="form-container__input"
              placeholder="john_doe"
              id="username"
            ></input>
            <label className="form-container__label" htmlFor="password">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="form-container__input"
              placeholder="***********"
              id="password"
            ></input>

            <button className="form-container__button">Log in</button>
          </div>
          <p>Sign up</p>
        </form>
      </div>
    </div>
  );
};
