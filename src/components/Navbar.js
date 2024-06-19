import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { removeToken } from "../api/storage";
import logo from "../Pics/Book-icon.png";

const Navbar = () => {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    setUser(false);
    navigate("/");
  };

  return (
    <nav className="bg-charcoal-gray text-white shadow-md py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-16 w-auto" />
            </Link>
            <Link to="/" className="ml-4 text-white text-3xl font-serif">
              Aya's Library
            </Link>
          </div>
          <div className="block">
            <div className="ml-10 flex items-baseline space-x-4">
              {user && (
                <>
                  <NavLink
                    to="/book-collection"
                    className={({ isActive }) =>
                      isActive
                        ? "text-white bg-forest-green px-3 py-2 rounded-md text-lg font-medium"
                        : "text-white hover:text-forest-green px-3 py-2 rounded-md text-lg font-medium"
                    }
                  >
                    Books Collection
                  </NavLink>
                  <NavLink
                    to="/search"
                    className={({ isActive }) =>
                      isActive
                        ? "text-white bg-forest-green px-3 py-2 rounded-md text-lg font-medium"
                        : "text-white hover:text-forest-green px-3 py-2 rounded-md text-lg font-medium"
                    }
                  >
                    Search
                  </NavLink>
                  <NavLink
                    to="/modify"
                    className={({ isActive }) =>
                      isActive
                        ? "text-white bg-forest-green px-3 py-2 rounded-md text-lg font-medium"
                        : "text-white hover:text-forest-green px-3 py-2 rounded-md text-lg font-medium"
                    }
                  >
                    Modify
                  </NavLink>
                </>
              )}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="bg-forest-green text-white px-3 py-2 rounded-md text-lg font-medium hover:bg-forest-green-dark"
                >
                  Logout
                </button>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="text-white hover:text-forest-green px-3 py-2 rounded-md text-lg font-medium"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="text-white hover:text-forest-green px-3 py-2 rounded-md text-lg font-medium"
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
