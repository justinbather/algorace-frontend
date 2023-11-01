import { Navbar } from "../../components/Navbar";
import "../../assets/styles/partials/_components.scss";
import "../../assets/styles/pages/home.scss";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../config/constants";
import { useNavigate } from "react-router-dom";
import { useVerifyUser } from "../../hooks/useVerifyUser";

export const HomePage = () => {
  const navigate = useNavigate();
  const verifyUser = useVerifyUser();

  return (
    <>
      <Navbar />
      <div className="challenge">
        <div className="challenge__text">
          <h2 className="challenge__subtitle">Challenge</h2>
          <p className="challenge__description">
            Put your algorithmic skills to the test
          </p>
        </div>
        <div className="challenge__buttons">
          <button className="button button--primary">Start a Lobby</button>
          <button className="button button--secondary">Join a Lobby</button>
        </div>
      </div>
      <div className="practice">
        <div className="practice__text">
          <h2>Practice</h2>
          <p>Practice, learn, repeat</p>
        </div>
        <div className="practice__buttons">
          <button className="button button--primary">Quick Start</button>
          <button className="button button--secondary">Setup Practice</button>
        </div>
      </div>
    </>
  );
};
