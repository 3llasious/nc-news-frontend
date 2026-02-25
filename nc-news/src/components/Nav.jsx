import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <button className="nav-btn">
        <Link to="/">Feed</Link>
      </button>
      <button className="nav-btn">
        <Link to="/articles">Search</Link>
      </button>
      <button className="nav-btn">post</button>
    </nav>
  );
}

export default Nav;
