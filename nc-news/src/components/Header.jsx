import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import pfp from "../assets/pfp.svg";

function Header() {
  const { loggedInUser, setLoggedInUser } = useContext(LoginContext);
  const { username, avatar_url } = loggedInUser;
  if (username && avatar_url) {
    return (
      <div className="headings">
        <h2 className="header-title">The Digest</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <Link to="/logout">
            <button>log out: @{username}</button>
          </Link>
          <button
            type="button"
            style={{
              padding: 0,
              background: "none",
              border: "none",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <img className="author-avatar" src={avatar_url} alt="" />
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="headings">
      <h2 className="header-title">The Digest</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <Link to="/login">
          <button>login</button>
        </Link>
        <button
          type="button"
          style={{
            padding: 0,
            background: "none",
            border: "none",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <img className="author-avatar" src={pfp} alt="" />
        </button>
      </div>
    </div>
  );
}

export default Header;
