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
        <Link to="/logout" style={{ marginLeft: "auto", marginRight: "20px" }}>
          <button>log out?</button>
        </Link>
        <div className="comment-header-right">
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
            <img
              className="author-avatar"
              src={avatar_url}
              alt=""
              style={{ padding: "0px", margin: "8px" }}
            />
          </button>
          <div
            style={{ padding: "0px", margin: "0px", fontSize: "1rem" }}
            className="article-date"
          >
            @{username}
          </div>
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
