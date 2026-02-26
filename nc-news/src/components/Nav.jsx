import { Link } from "react-router-dom";
import FEED from "../assets/FEED.svg";
import Home from "../assets/Home.svg";
import search from "../assets/search.svg";

function Nav() {
  return (
    <nav>
      <button className="nav-btn">
        <Link to="/">
          <img src={FEED} alt="" />
        </Link>
      </button>
      <button className="nav-btn">
        <Link to="/search">
          <img src={search} alt="" />
        </Link>
      </button>
      <button className="nav-btn">post</button>
    </nav>
  );
}

export default Nav;
