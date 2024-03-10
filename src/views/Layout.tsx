import { Link, Outlet } from "react-router-dom";
import { useUserContext } from "../hooks/contextHooks";

const Layout = () => {
  const {user, handleAutoLogin} = useUserContext();
  // when the app is load, check if there is a valid token
  if (!user) {
    handleAutoLogin();
  }
  return (
    <>
      <header className="px-1.5 py-2 bg-white mb-4">
        <nav className="h-full1">
          <ul className="h-12 flex justify-end text-center uppercase font-medium tracking-wide">
            <li className="mr-auto h-full leading-[3rem]">
              <Link to="/" className="h-full text-center px-0 py-4">
                <img className="h-full object-contain" src="recipe-sharing-logo-360-180.svg" alt="cook note" />
              </Link>
            </li>
            {user ? (
              <>
                <li className="ml-4 h-full leading-[3rem]">
                  <Link to="/create" className="h-full text-center px-0 py-4">Luo Resepti</Link>
                </li>
                <li className="ml-4 h-full leading-[3rem]">
                  <Link to="/profile" className="h-full text-center px-0 py-4">Profiili</Link>
                </li>
              </>
            ) : (
              <>
                <li className="ml-4 h-full leading-[3rem]">
                  <Link to="/login" className="h-full text-center px-0 py-4">Kirjaudu sisään</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main className=" max-w-screen-lg m-auto px-2 py-1 bg-white">
        <Outlet />
      </main>
      <footer className="p-2.5 bg-prussian-blue">
        <p className=" text-white text-center">Keväät 2024</p>
      </footer>
    </>
  );
}

export default Layout;
