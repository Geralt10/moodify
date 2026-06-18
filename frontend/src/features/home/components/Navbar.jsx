import { Link } from "react-router";
import "./navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">
        🎵 Moodify
      </Link>

      <div className="navbar__links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;