import SearchBar from "./searchBar";
import search from "../assets/search.svg";
import { fetchAllComments } from "/Users/emmanuellaitopa/Northcoders/frontend/nc-news-frontend/nc-news/apiUtils/api.js";
import { useEffect, useState } from "react";
import LoadingState from "./LoadingState";
import { Link } from "react-router-dom";
import commentIcon from "../assets/comments.svg";
import upvoteIcon from "../assets/up-vote.svg";
import downvoteIcon from "../assets/down-vote.svg";

function SearchPage() {
  const [commentsArr, setCommentsArr] = useState([]);
  useEffect(() => {
    const getComments = async () => {
      const { comments } = await fetchAllComments();
      setCommentsArr(comments);
    };
    getComments();
  }, []);

  return commentsArr.length === 0 ? (
    <LoadingState isLoading />
  ) : (
    <div>
      <div>
        <SearchBar />
        <button className="nav-btn">
          <img src={search} alt="" />
        </button>
      </div>
      {commentsArr.map((comment) => {
        return (
          <div key={comment.comment_id}>
            <div className="comment-header">
              {/* <img className="user-pic" src={comment.avatarImg} alt="" /> */}
              <span className="article-author">@{comment.author}</span>
            </div>

            <div className="comments-divider">{comment.body}</div>
            <div className="comments-prompt">
              <Link to={`/articles/${comment.article_id}`}>
                <button className="comment-wrapper">
                  <img src={commentIcon} alt="" />
                </button>
              </Link>

              <p>join the conversation</p>
              <span className="vote-wrapper">
                <div className="vote-text">{comment.votes}</div>
                <button className="overlay-btn">
                  <img src={upvoteIcon} alt="" />
                </button>
                <button className="overlay-btn">
                  <img src={downvoteIcon} alt="" />
                </button>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SearchPage;
