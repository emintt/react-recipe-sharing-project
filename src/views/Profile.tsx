import { useUserContext } from "../hooks/contextHooks";
import LogoutButton from "../components/LogoutButton";

const Profile = () => {
  // user on tallennettu contextiin, haetaan vaan user state
  const {user} = useUserContext();
  console.log('user', user);
  return (
    <>
      <div className=" bg-white p-4 relative">
        <h2 className="text-3xl my-4">Profiili</h2>
        {user && (
          <div className="">
            <div>
              <p>Käyttäjänimi: {user.username}</p>
              <p>Sähköposti: {user.email}</p>
              <p>Luotu: {new Date(user.created_at).toLocaleDateString('fi-FI')}</p>
            </div>
            <div className=" absolute top-8  right-4">
              <LogoutButton />
            </div>
          </div>
        )}
      </div>
      <div className=" h-96">

      </div>
    </>
  );
}

export default Profile;
