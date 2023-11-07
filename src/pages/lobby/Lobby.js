import { Navbar } from "../../components/Navbar";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { socket } from "../../config/socket";

export const Lobby = () => {
  const { lobbyName } = useParams();

  socket.on("user_joined", (msg) => console.log(msg));

  useEffect(() => {
    socket.emit("join_lobby", lobbyName);
  }, [lobbyName]);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="lobby-setup">
          <div className="lobby-setup__title-cont">
            <h2>Lobby</h2>
          </div>
          <br></br> {/*! Temporary: fix the styling for this, needs margin */}
          <div className="problem-card">
            <p>Two Sum</p>
            <p>Hashmap</p>
            <p>Easy</p>
          </div>
          <button className="button button--primary">Continue</button>
        </div>

        <div className="lobby-setup lobby-setup--problems">
          <div className="lobby-setup__title-cont">
            <h2>Users</h2>
            {/* <p>Setup your lobby below</p> */}
          </div>
          <div className="lobby-setup__problem-container">
            <a>
              <div className="problem-card">
                <p>Name</p>
                <p>Ready</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
