import CommentCard from "./CommentCard";
import { useState } from "react";
import { Link } from "react-router-dom";
import conversation from "../assets/conversation.svg";
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import { sendComment } from "/Users/emmanuellaitopa/Northcoders/frontend/nc-news-frontend/nc-news/apiUtils/api.js";

//conditional rendering for comments section vewied in main feed vs in indiviual article page
function Threads({ isOpen, closeComments, articleId, articleName }) {
  const { loggedInUser, setLoggedInUser } = useContext(LoginContext);
  const { username, avatar_url } = loggedInUser;
  const [openForm, setOpenForm] = useState(false);
  const [clicked, setClicked] = useState(0);
  const [post, setPost] = useState("");
  const [status, setStatus] = useState(null);

  const postHandler = async () => {
    try {
      const user = loggedInUser.username;
      const body = post;
      const postedComment = await sendComment(articleId, user, body);
      console.log(postedComment);
      setPost("");
      setStatus("sucess!");
    } catch (err) {
      // error.response — the response object
      // error.response.status — the status code (400, 404 etc.)
      // error.response.data — the response body
      // error.response.data.msg — specific message (assuming you send back { msg: "..." })
      console.log(err.response.data.msg);
      setPost("");
      setStatus(err.response.data.msg);
    }
  };

  console.log(username);
  console.log(status);

  const formHandler = () => {
    setOpenForm(true);
    setClicked(1);
  };

  const closeFormHandler = () => {
    setOpenForm(false);
    setClicked(0);
  };

  if (isOpen === true) {
    return (
      <div className="pop-up">
        <button
          className="close-btn"
          type="button"
          onClick={(e) => {
            closeComments();
          }}
        >
          X
        </button>
        <div className="font">
          <h2>{articleName}</h2>
        </div>

        <CommentCard articleId={articleId} />
      </div>
    );
  } else if (isOpen === undefined) {
    return (
      <div>
        <div className="comment-trigger-row">
          <button
            className={clicked === 0 ? "write-btn" : "send-btn"}
            type="button"
            onClick={() => {
              if (clicked === 0) {
                formHandler();
              } else {
                closeFormHandler();
              }
            }}
          >
            <img src={conversation} alt="" />
          </button>
          <div className="comment-trigger-text">add a comment...</div>
        </div>

        {openForm ? (
          <form className="discussion-form" action="POST">
            <input
              className="discussion-input"
              type="text"
              placeholder={status ? status : "spark a discussion..."}
              value={post}
              onChange={(e) => {
                setPost(e.target.value); //sets input
              }}
            />
            <button
              type="button"
              className="send-btn"
              style={{ marginTop: "12px" }}
              onClick={() => {
                setPost();
                postHandler();
              }}
            >
              post
            </button>
          </form>
        ) : null}

        <CommentCard articleId={articleId} alignRight />
      </div>
    );
  }
}

export default Threads;
