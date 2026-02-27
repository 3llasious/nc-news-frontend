import CommentCard from "./CommentCard";
import { useState } from "react";
import { Link } from "react-router-dom";
import conversation from "../assets/conversation.svg";

//conditional rendering for comments section vewied in main feed vs in indiviual article page
function Threads({ isOpen, closeComments, articleId, articleName }) {
  const [openForm, setOpenForm] = useState(false);
  const [clicked, setClicked] = useState(0);

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
            className="write-btn"
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
              placeholder="spark a discussion..."
            />
          </form>
        ) : null}

        <CommentCard articleId={articleId} alignRight />
      </div>
    );
  }
}

export default Threads;
