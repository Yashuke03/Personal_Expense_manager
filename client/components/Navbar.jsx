import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const leave = () => {
    logout();
    nav("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark app-nav">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Money Manager
        </Link>
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            {user ? (
              <>
                <NavLink to="/dashboard" className="nav-link">
                  Dashboard
                </NavLink>
                <NavLink to="/transactions" className="nav-link">
                  Transactions
                </NavLink>
                <button
                  onClick={leave}
                  className="btn btn-outline-light btn-sm ms-lg-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="btn btn-light btn-sm ms-lg-2">
                  Create account
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
