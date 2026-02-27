import { Link } from "react-router-dom";
import FEED from "../assets/FEED.svg";
import Home from "../assets/Home.svg";
import search from "../assets/search.svg";
import Post from "../assets/Post.svg";

function Nav() {
  return (
    <nav>
      <Link to="/">
        <button className="nav-btn">
          <img src={FEED} alt="" />
        </button>
      </Link>
      <Link to="/search">
        <button className="nav-btn">
          <img src={search} alt="" />
        </button>
      </Link>
      <button className="nav-btn">
        {" "}
        <img src={Post} alt="" />
      </button>
    </nav>
  );
}

export default Nav;
