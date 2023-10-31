import { Navbar } from "../../components/Navbar";
import incrementIcon from "../../assets/icons/Increment.svg";
import decrementIcon from "../../assets/icons/Decrement.svg";
import "../../assets/styles/pages/challenge_lobby.scss";
import "../../assets/styles/partials/_components.scss";

import { useEffect, useState } from "react";

export const ChallengeLobby = () => {
  const [showProblems, setShowProblems] = useState(false);
  const [problemCount, setProblemCount] = useState(3);
  const [submissionsCount, setSubmissionsCount] = useState(3);

  const handleConfigContinue = (e) => {
    e.preventDefault();
    setShowProblems(true);
  };

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
              <a>
                <div className="problem-card">
                  <p>Two sum</p>
                  <p>Hashtable</p>
                  <p>Easy</p>
                </div>
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
