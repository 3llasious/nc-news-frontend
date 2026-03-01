import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import { Link } from "react-router-dom";

function LogoutPage() {
  const { loggedInUser, setLoggedInUser } = useContext(LoginContext);
  const { username, avatar_url } = loggedInUser;
  const previousUsers = [];
  return (
    <div id="login-info">
      <p>Logged in as: {username}</p>
      <Link to="/login">
        <button
          onClick={(e) => {
            setLoggedInUser({});
          }}
          className="sort-btn"
        >
          logout?
        </button>
      </Link>
    </div>
  );
}

export default LogoutPage;
