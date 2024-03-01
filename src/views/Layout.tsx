import { Link, Outlet } from "react-router-dom";
import { useUserContext } from "../hooks/contextHooks";

const Layout = () => {
  const {user, handleAutoLogin} = useUserContext();
  // check if there is a valid token when the app is load
  if (!user) {
    handleAutoLogin();
  }
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
              <Link to="/create" className="nav-link">Luo Resepti</Link>
            </li>
            <li className="nav-list-item">
              <Link to="/profile" className="nav-link">Profiili</Link>
            </li>
            <li className="nav-list-item">
              <Link to="/logout" className="nav-link">Kirjaudu ulos</Link>
            </li>
            <li className="nav-list-item">
              <Link to="/login" className="nav-link">Kirjaudu sisään</Link>
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
