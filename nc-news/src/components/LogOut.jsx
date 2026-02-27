import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";

function LogoutPage() {
  const { loggedInUser, setLoggedInUser } = useContext(LoginContext);

  return (
    <div id="login-info">
      <p>Logged in as: {loggedInUser.username}</p>
    </div>
  );
}

export default LogoutPage;
