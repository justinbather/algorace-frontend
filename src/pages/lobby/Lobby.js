import { Navbar } from "../../components/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config/constants";
import { socket } from "../../config/socket";

export const Lobby = () => {
  const { lobbyName } = useParams();
  const [userData, setUserData] = useState(null)
  const [lobbyData, setLobbyData] = useState(null)

  const handleUserReady = () => {
    socket.emit('user_ready', { username: userData.username, lobby: lobbyName })
  }

  useEffect(() => {

    const handleUserJoined = (data) => {
      setLobbyData(data)
    }
    const handleSuccessfulEnter = (data) => {
      console.log(data)
      setLobbyData(data)
    }
    const handleLobbyUpdate = (data) => {
      setLobbyData(data)
    }

    socket.on('user_joined', handleUserJoined)
    socket.on('successful_enter', handleSuccessfulEnter)
    socket.on('user_ready', handleLobbyUpdate)

    return () => {
      socket.off('user_joined', handleUserJoined)
      socket.off('successful_enter', handleSuccessfulEnter)
      socket.off('user_ready', handleLobbyUpdate)
    }
  }, [socket])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/auth/verify`, { withCredentials: true })

        console.log(response.data.userData)
        setUserData(response.data.userData)
        socket.emit('join_lobby', { username: response.data.userData.username, lobby: lobbyName })
        console.log('joining lobby')
      } catch (err) {
        console.log(err)
      }
    }
    fetchUser()
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

          <button onClick={handleUserReady} className="button button--primary">Ready</button>
        </div>

        <div className="lobby-setup lobby-setup--problems">
          <div className="lobby-setup__title-cont">
            <h2>Users</h2>
            {/* <p>Setup your lobby below</p> */}
          </div>
          <div className="lobby-setup__problem-container">
            {
              lobbyData?.users && lobbyData.users.map((user) => (
                <a key={user.username}>
                  <div className="problem-card">
                    <p>{user.username}</p>
                    <p>{user.isReady ? "Ready" : "Not Ready"}</p>
                  </div>
                </a>

              ))
            }
          </div>
        </div>
      </div>
    </>
  );
};
