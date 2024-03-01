import { useUserContext } from "../hooks/contextHooks";

const Profile = () => {
  // user on tallennettu contextiin, haetaan vaan user state
  const {user} = useUserContext();
  console.log('user', user);
  return (
    <>
      <h2>Profile page la la</h2>
      {user && (
        <>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Created: {new Date(user.created_at).toLocaleDateString('fi-FI')}</p>
        </>
      )}
    </>

  );
}

export default Profile;
