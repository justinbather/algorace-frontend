import "./App.css";
import "./assets/styles/index.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/login/LoginPage";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/home/HomePage";
import { ChallengeLobby } from "./pages/challenge/ChallengeLobby";

function App() {
  return (
    <BrowserRouter>
      <div className="main">
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/challenge" element={<ChallengeLobby />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
