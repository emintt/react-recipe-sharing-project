import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-list-item">
              <Link to="/" className="nav-link">
                <img src="recipe-sharing-logo-360-180.svg" alt="cook note" />
              </Link>
            </li>
            <li className="nav-list-item">
              <Link to="/create" className="nav-link">Create</Link>
            </li>
            <li className="nav-list-item">
              <Link to="/profile" className="nav-link">Profile</Link>
            </li>
            <li className="nav-list-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>

      </footer>
    </>
  );
}

export default Layout;
