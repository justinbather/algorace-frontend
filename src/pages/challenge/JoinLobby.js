import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Navbar } from "../../components/Navbar"
import { BASE_URL } from "../../config/constants"
//import { socket } from "../../config/socket"
import { io } from 'socket.io-client'

export const JoinLobby = () => {

  const [userData, setUserData] = useState(null)
  const [lobbyState, setLobbyState] = useState("")
  const [lobbyNameInput, setLobbyNameInput] = useState("")
  const [socket, setSocket] = useState(null);
  const [lobbyData, setLobbyData] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const newSocket = io('http://localhost:8000'); // Change the URL to your server
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    // Event handler for lobby_data event
    socket.on('lobby_data', (data) => {
      setLobbyData(data);
      console.log(data)
    });

    // Event handler for other events (user_joined, problems_selected, round_result)
    // Add similar handlers for other events as needed

    return () => {
      // Remove event listeners when the component unmounts
      socket.off('lobby_data');
      // Remove other event listeners as needed
    };
  }, [socket]);



  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/auth/verify`, { withCredentials: true })
        setUserData(response.data.userData)
      } catch (err) {
        console.log(err)
      }
    }
    fetchUser()
  }, [])

  const handleJoinLobby = async () => {

    try {
      const response = await axios.get(`${BASE_URL}/lobby/${lobbyNameInput}`, { withCredentials: true })
      if (response.status === 200) {
        navigate(`/lobby/${response.data.name}`)
      }
    } catch (err) {
      console.log(err)
    }
  }



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
          <button onClick={handleJoinLobby} className="button button--primary">Join Lobby</button>
          <input onChange={(e) => setLobbyNameInput(e.target.value)} placeholder="Room name"></input >
        </div>
      </div>


    </>
  )
}
