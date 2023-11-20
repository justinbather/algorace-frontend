import { Navbar } from "../../components/Navbar";
import "../../assets/styles/partials/_components.scss";
import "../../assets/styles/pages/home.scss";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../config/constants";
import { Link, redirect, useNavigate } from "react-router-dom";

export const HomePage = () => {

  const navigate = useNavigate()
  useEffect(() => {
    const verify = async () => {
      const response = await axios.get(`${BASE_URL}/auth/verify`, { withCredentials: true })

      if (!response.status === 200) {
        navigate('/login')
      }
    }
    verify()
  }, [])

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
          <Link to="/challenge">
            <button className="button button--primary">Start a Lobby</button>
          </Link>
          <Link to='/challenge/join'>
            <button className="button button--secondary">Join a Lobby</button>
          </Link>
        </div>
      </div>
      <div className="practice">
        <div className="practice__text">
          <h2>Practice</h2>
          <p>Practice, learn, repeat</p>
        </div>
        <div className="practice__buttons">
          <Link to="/practice">
            <button className="button button--primary">Quick Start</button>
          </Link>
          <button className="button button--secondary">Setup Practice</button>
        </div>
      </div>
    </>
  );
};
