import { Navbar } from "../../components/Navbar"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config/constants";
import { socket } from "../../config/socket";
import { ChallengeEditor } from "../challenge/ChallengeEditor";


export const Lobby = () => {
  const { lobbyName } = useParams();
  const [userData, setUserData] = useState(null)
  const [lobbyData, setLobbyData] = useState(null)
  const [ready, setReady] = useState(false)
  const [matchStart, setMatchStart] = useState(false)
  const [gameCompleteModalIsOpen, setGameCompleteModalIsOpen] = useState(false)
  const [roundNumber, setRoundNumber] = useState(0)
  const [currentProblem, setCurrentProblem] = useState(null)
  const [userCode, setUserCode] = useState("")
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleUserReady = () => {
    socket.emit('user_ready', { username: userData.username, lobby: lobbyName })
  }

  const handleUserReadyNextRound = () => {
    socket.emit('user_ready_next_match', { username: userData.username, lobby: lobbyName })
  }

  const handleUserUnready = () => {
    socket.emit('user_unready', { username: userData.username, lobby: lobbyName })
  }


  const handleStart = () => {
    socket.emit('start_match', { username: userData.username, lobby: lobbyName })
  }

  const handleChange = (e) => {
    setUserCode(e)
  }

  const closeModal = () => {
    setModalIsOpen(false)
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
    socket.on('successful_ready', (data) => {
      console.log(data.isReady)
      setReady(data.isReady)
    })

    socket.on('begin_match', (data) => {
      setCurrentProblem(data.currentProblem)
      setUserCode(data.currentProblem.userStarterCode)
      setRoundNumber(data.roundNumber)
      setLobbyData(data.lobbyObj)
      setMatchStart(true)
    })

    socket.on('round_completed', (data) => {
      console.log('round has been completed')
      setModalIsOpen(true)
      console.log(data)
    })

    socket.on('game_completed', () => {
      console.log('setting gamecomplete')
      setModalIsOpen(false)
      setTimeout(() => {
        setGameCompleteModalIsOpen(true)

      }, 3000)
    })

    socket.on('next_round', (data) => {

      setLobbyData(data.lobbyObj)
      setUserCode(data.currentProblem.userStarterCode)
      setCurrentProblem(data.currentProblem)
      setRoundNumber(data.lobbyObj.currentRound)

      console.log('new round')
      closeModal()

    })

    return () => {
      socket.off('user_joined')
      socket.off('successful_enter')
      socket.off('user_ready')
      socket.off('successful_ready')
      socket.off('begin_match')
      socket.off('round_completed')
      socket.off('game_completed')
      socket.off('new_round')
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
  }, [lobbyName])

  //When user joins we need to broadcast to rest of lobby that the user is there to update the joined users list
  if (matchStart) {
    return (
      <>
        <ChallengeEditor socket={socket} user={userData} lobbyData={lobbyData} currentProblem={currentProblem} modalIsOpen={modalIsOpen} closeModal={closeModal} gameCompleteModalIsOpen={gameCompleteModalIsOpen} handleUserReady={handleUserReadyNextRound} />
      </>
    )
  }



  return (
    <>
      <Navbar />
      <div className="container">
        <div className="lobby-setup">
          <div className="lobby-setup__title-cont">
            <h2>Lobby</h2>
          </div>
          <br></br> {/*! Temporary: fix the styling for this, needs margin */}

          {lobbyData && lobbyData.problems.map((problem) => (
            <div className="problem-card">
              <>
                <p>{problem.title}</p>
                <p>{problem.category}</p>
                <p>{problem.difficulty}</p>
              </>
            </div>

          ))}
          <button onClick={handleStart} className="button button-primary">Start Game</button>
          {
            ready ?
              <button onClick={handleUserUnready} className="button button--primary">Unready</button> :
              <button onClick={handleUserReady} className="button button--primary">Ready</button>
          }
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
