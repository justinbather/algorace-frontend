import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Navbar } from "../../components/Navbar"
import { BASE_URL } from "../../config/constants"

export const JoinLobby = () => {

  const [userData, setUserData] = useState(null)
  const [lobbyState, setLobbyState] = useState("")
  const [lobbyNameInput, setLobbyNameInput] = useState("")
  const [socket, setSocket] = useState(null);
  const [lobbyData, setLobbyData] = useState(null);
  const navigate = useNavigate()



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
