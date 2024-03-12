import {  useState } from "react";
import { useUser } from "../hooks/apiHooks";
import { useForm } from "../hooks/formHooks";
import { useUserContext } from "../hooks/contextHooks";
import { Link } from "react-router-dom";


const RegisterForm = () => {
  const initValues = {username: '', password: '', email: ''};
  const {postUser} = useUser();

  const {handleLogin} = useUserContext();

  const doRegister = async () => {
    // console.log('do register');
    try {
      console.log(inputs);
      if (usernameAvailable && emailAvailable) {
        const result = await postUser(inputs);
        alert(result.message);
        if (result.user) {
          handleLogin({username: inputs.username, password: inputs.password});
        }
      }
    } catch (error) {
      console.log((error as Error).message);
      alert((error as Error).message);
    }
  }

  const [usernameAvailable, setUsernameAvailable] = useState<boolean>(true);
  const [emailAvailable, setEmailAvailable] = useState<boolean>(true);

  const {getUsernameAvailable, getEmailAvailable} = useUser();
  const handleUsernameBlur = async () => {
    const result = await getUsernameAvailable(inputs.username);
    setUsernameAvailable(result.available);
  }

  const handleEmailBlur = async (
    event: React.SyntheticEvent<HTMLInputElement>
    ) => {
    console.log(event.currentTarget.value);
    const result = await getEmailAvailable(event.currentTarget.value);
    setEmailAvailable(result.available);
  }

  const {handleSubmit, handleInputChange, inputs} = useForm(doRegister, initValues);

  return (
    <>
      <div className=" flex flex-col items-center gap-5 my-6">
        <h3 className=" text-3xl text-center">Rekisteröidy</h3>
        <form onSubmit={handleSubmit} className=" flex flex-col py-6 px-5 border rounded bg-vanilla">
          <div className=" flex flex-col mb-3">
            <label
              className=""
              htmlFor="username">
                Käyttäjänimi:
            </label>
            <input
              className=" text-slate-950 w-96 rounded p-2 border-slate-500"
              name="username"
              type="text"
              id="username"
              onChange={handleInputChange}
              onBlur={handleUsernameBlur}
              autoComplete="username"
            />
            <span className=" text-slate-500 text-xs">Vähintään 3 merkkiä</span>
            {!usernameAvailable ? (
              <span className=" text-fire-engine-red">Käyttäjän nimi on jo käytössä</span>
            ): ('')}

          </div>

          <div className="flex flex-col mb-3">
              <label className="" htmlFor="password">Salasana:</label>
              <input
                className=" text-slate-950 w-96 rounded p-2 border-slate-500"
                name="password"
                type="password"
                id="password"
                onChange={handleInputChange}
                autoComplete="current-password"
              />
              <span className=" text-slate-500 text-xs">Vähintään 5 merkkiä</span>
          </div>
          <div className=" flex flex-col mb-3">
            <label className="" htmlFor="email">Sähköposti:</label>
            <input
              className=" text-slate-950 w-96 rounded p-2 border-slate-500"
              name="email"
              type="email"
              id="email"
              onChange={handleInputChange}
              onBlur={handleEmailBlur}
              autoComplete="email"
            />
            {!emailAvailable ? (
              <span className="text-fire-engine-red">Sähköpostiosoite on jo käytössä</span>
            ): ('')}
          </div>
          <button
            className="m-3 w-1/3 rounded-md bg-orange-wheel p-3 self-center hover:bg-light-orange"
            type="submit"
          >
            Rekisteröidy
          </button>
          <p className="h-full text-center px-0">
            Onko sinulla jo tili? <Link to="/login" className=" underline" >Kirjaudu sisään</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default RegisterForm;
