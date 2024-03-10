import { useUserContext } from "../hooks/contextHooks";

const LogoutButton = () => {
  const {handleLogout} = useUserContext();
  return (
    <>
      <button className="m-3 rounded-md bg-orange-wheel p-3 self-center hover:bg-light-orange" onClick={handleLogout}>
        Kirjaudu ulos
      </button>
    </>
  );
}

export default LogoutButton;
