import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="headings">
      <h2 className="header-title">The Digest</h2>
      <div>
        <Link to="/login">
          <button>login</button>
        </Link>

        <button className="user-pic" type="button"></button>
      </div>
    </div>
  );
}

export default Header;
