import { Navbar } from "../../components/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config/constants";
import { socket } from "../../config/socket";

export const Lobby = () => {
  const { lobbyName } = useParams();
  const [userData, setUserData] = useState(null)
  const [lobbyData, setLobbyData] = useState({})

  socket.on("user_joined", (msg) => console.log(msg));
  socket.on('successful_enter', (data) => {
    console.log('successfully joined lobby: ', data)
  })
  socket.on("user_ready", (msg) => console.log(msg))

  const handleReady = () => {
    socket.emit('user_ready', { username: userData.username, lobby: lobbyName })
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/auth/verify`, { withCredentials: true })

        console.log(response.data.userData)
        setUserData(response.data.userData)
        socket.emit('join_lobby', { username: response.data.userData.username, lobby: lobbyName })
      } catch (err) {
        console.log(err)
      }
    }
    fetchUser()
    //Handle disconnect
  }, [])

  //When user joins we need to broadcast to rest of lobby that the user is there to update the joined users list


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
          <button onClick={handleReady} className="button button--primary">Continue</button>
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
