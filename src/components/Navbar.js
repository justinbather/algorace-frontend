import logo from "../assets/images/Logo.svg";
import "../assets/styles/pages/navbar.scss";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__image-cont">
        <img src={logo}></img>
      </div>
      <div className="navbar__inner-content">
        <p className="navbar__link">Home</p>
        <p className="navbar__link">Contribute</p>
        <p className="navbar__link">Profile</p>
      </div>
      <div className="navbar__spacer"></div>
    </div>
  );
};
