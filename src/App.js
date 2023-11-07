import "./App.css";
import "./assets/styles/index.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/login/LoginPage";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/home/HomePage";
import { ChallengeLobby } from "./pages/challenge/ChallengeLobby";
import { Signup } from "./pages/signup/Signup";
import { Practice } from "./pages/practice/Practice";
import { PracticeEditor } from "./pages/editor/PracticeEditor";
import { Lobby } from "./pages/lobby/Lobby";

function App() {
  return (
    <BrowserRouter>
      <div className="main">
        <Routes>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/challenge" element={<ChallengeLobby />}></Route>
          <Route path="/practice" element={<Practice />}></Route>
          <Route
            path="/practice/:problemTitle/:language"
            element={<PracticeEditor />}
          ></Route>
          <Route path="/lobby/:lobbyName" element={<Lobby />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
