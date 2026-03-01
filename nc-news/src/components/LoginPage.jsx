import { useContext, useState } from "react";
import { LoginContext } from "../context/LoginContext";
import {
  fetchThisUser,
  addThisUser,
} from "/Users/emmanuellaitopa/Northcoders/frontend/nc-news-frontend/nc-news/apiUtils/api.js";

function LoginPage() {
  const { loggedInUser, setLoggedInUser } = useContext(LoginContext);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [username2, setUsername2] = useState("");
  const [img, setImg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const addNewUser = async () => {
    await addThisUser(username, name, img);
    setSuccessMsg("you're in!");
    setLoggedInUser({
      username: username,
      avatar_url: img,
      name: name,
    });
  };

  const getThisUser = async () => {
    const result = await fetchThisUser(username2);
    setSuccessMsg("you're in!");
    setLoggedInUser({
      username: result.username,
      avatar_url: result.avatar_url,
      name: result.name,
    });
  };

  if (successMsg === "") {
    return (
      <div>
        <div id="login-info">
          <form action="GET">
            <input
              type="text"
              placeholder="username"
              value={username2}
              onChange={(e) => {
                setUsername2(e.target.value);
              }}
              required={true}
            />
          </form>
          <button type="button" className="sort-btn" onClick={getThisUser}>
            Login
          </button>
        </div>
        <div id="signin-info">
          <form action="POST">
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required={true}
            />
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
            <input
              type="text"
              placeholder="image_url"
              value={img}
              onChange={(e) => {
                setImg(e.target.value);
              }}
              required
            />
          </form>
          <button type="button" className="sort-btn" onClick={addNewUser}>
            Sign up
          </button>
        </div>
      </div>
    );
  }
  return <p>{successMsg}</p>;
}

export default LoginPage;
