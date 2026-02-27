import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";

function Header() {
  const { loggedInUser, setLoggedInUser } = useContext(LoginContext);
  const { username, avatar_url } = loggedInUser;
  return (
    <div className="headings">
      <h2 className="header-title">The Digest</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <Link to="/login">
          <button>@{username}</button>
        </Link>
        <button className="user-pic" type="button"></button>
      </div>
    </div>
  );
}

export default Header;
