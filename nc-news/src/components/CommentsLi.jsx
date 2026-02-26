import CommentCard from "./CommentCard";
import { Link } from "react-router-dom";

//conditional rendering for comments section vewied in main feed vs in indiviual article page
function Threads({ isOpen, closeComments, articleId, articleName }) {
  if (isOpen === true) {
    return (
      <div
        className="pop-up"
        onClick={(e) => {
          closeComments();
        }}
      >
        <div className="font">
          <h2>{articleName}</h2>
        </div>

        <CommentCard articleId={articleId} />
      </div>
    );
  } else if (isOpen === undefined) {
    return (
      <div>
        <CommentCard articleId={articleId} alignRight />
      </div>
    );
  }
}

export default Threads;
