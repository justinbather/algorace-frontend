import logo from "../../assets/images/Logo-text.svg";
import "../../assets/styles/pages/login.scss";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  return (
    <div className="login">
      <div className="login__container">
        <img src={logo}></img>
        <form className="form-container">
          <div className="form-container__inner">
            <label className="form-container__label" htmlFor="username">
              Username
            </label>
            <input
              className="form-container__input"
              placeholder="john_doe"
              id="username"
            ></input>
            <label className="form-container__label" htmlFor="password">
              Password
            </label>
            <input
              className="form-container__input"
              placeholder="***********"
              id="password"
            ></input>
            <Link to="/home">
              <button className="form-container__button">Log in</button>
            </Link>
          </div>
          <p>Sign up</p>
        </form>
      </div>
    </div>
  );
};
