import { Navbar } from "../../components/Navbar";
import incrementIcon from "../../assets/icons/Increment.svg";
import decrementIcon from "../../assets/icons/Decrement.svg";
import "../../assets/styles/pages/challenge_lobby.scss";
import "../../assets/styles/partials/_components.scss";
import { socket } from "../../config/socket";
import axios from "axios";

import { useEffect, useState } from "react";
import { BASE_URL } from "../../config/constants";
import { useNavigate } from "react-router-dom";

export const ChallengeLobby = () => {
  const navigate = useNavigate();

  const [showProblems, setShowProblems] = useState(false);
  const [problemCount, setProblemCount] = useState(3);
  const [submissionsCount, setSubmissionsCount] = useState(3);
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [problemsList, setProblemsList] = useState(null);
  const [lobbyName, setLobbyName] = useState("");
  const [userData, setUserData] = useState(null)

  const fetchProblemList = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/problems`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response.data);
      setProblemsList(response.data.problems);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/verify`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
      )
      setUserData(response.data.userData)
      console.log(response.data.userData)
    } catch (err) {
      console.error(err)
    }
  }

  const handleConfigContinue = (e) => {
    e.preventDefault();
    setShowProblems(true);
  };

  const handleProblemSelect = (problemId) => {
    setSelectedProblems(...selectedProblems, problemId);
  };

  const handleCreateLobby = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/lobby`, { name: lobbyName, selectedProblems }, { withCredentials: true })
      if (response.status === 201) {
        navigate(`/lobby/${lobbyName}`)
      }


    } catch (err) {
      console.error(err)
    }
  };

  useEffect(() => {
    fetchProblemList();
    fetchUserInfo()
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="lobby-setup">
          <div className="lobby-setup__title-cont">
            <h2>Create a Lobby</h2>
            <p>Setup your lobby below</p>
          </div>
          <form className="lobby-setup__form">
            <label htmlFor="lobbyName">Lobby name</label>
            <input
              className="lobby-setup__input"
              placeholder="john123"
              name="lobbyName"
              id="lobbyName"
              onChange={(e) => setLobbyName(e.target.value)}
            ></input>
            <label htmlFor="lobbyPasskey">Passkey</label>
            <input
              className="lobby-setup__input"
              placeholder="1234"
              name="lobbyPasskey"
              id="lobbyPasskey"
            ></input>
            <label># of Problems</label>
            <div className="lobby-setup__counter">
              <a onClick={() => setProblemCount(problemCount - 1)}>
                <img src={decrementIcon}></img>
              </a>
              <p className="lobby-setup__counter">{problemCount}</p>
              <a onClick={() => setProblemCount(problemCount + 1)}>
                <img src={incrementIcon}></img>
              </a>
            </div>
            <label>Max Submissions</label>
            <div className="lobby-setup__counter">
              <a onClick={() => setSubmissionsCount(submissionsCount - 1)}>
                <img src={decrementIcon}></img>
              </a>
              <p className="lobby-setup__counter">{submissionsCount}</p>

              <a onClick={() => setSubmissionsCount(submissionsCount + 1)}>
                <img src={incrementIcon}></img>
              </a>
            </div>
            <button
              className="button button--primary"
              onClick={handleConfigContinue}
            >
              Continue
            </button>
          </form>
        </div>
        {showProblems && (
          <div className="lobby-setup lobby-setup--problems">
            <div className="lobby-setup__title-cont">
              <h2>Pick your problems</h2>
              {/* <p>Setup your lobby below</p> */}
            </div>
            <div className="lobby-setup__problem-container">
              {problemsList &&
                problemsList.map((problem) => (
                  <a onClick={() => handleProblemSelect(problem._id)}>
                    <div className="problem-card">
                      <p>{problem.title}</p>
                      <p>{problem.category}</p>
                      <p>{problem.difficulty}</p>
                    </div>
                  </a>
                ))}
              <button
                className="button button--primary"
                onClick={handleCreateLobby}
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
