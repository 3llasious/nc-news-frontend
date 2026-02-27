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

        <div
          style={{
            marginLeft: "auto",
            marginRight: "20px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              padding: "0px",
              margin: "0px",
              fontSize: "1rem",
              display: "flex",
              fontWeight: "700",
              flexDirection: "column",
              alignItems: "end",
            }}
            className="article-date"
          >
            <span
              className="font"
              style={{
                color: "black",
                fontSize: "clamp(1rem, 3vw, 1.5rem)",
              }}
            >
              Welcome back,
            </span>
            @{username}
          </div>
        </div>
        <Link to="/logout">
          <div className="comment-header-right">
            <img
              className="author-avatar"
              src={avatar_url}
              alt=""
              style={{ padding: "0px", margin: "8px" }}
            />
          </div>
        </Link>
      </div>
    );
  }
  return (
    <div className="headings">
      <h2 className="header-title">The Digest</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <Link to="/login">
          <button className="delete-btn" style={{ borderRadius: "40px" }}>
            login
          </button>
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
