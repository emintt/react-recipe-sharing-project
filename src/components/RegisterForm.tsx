import {  useState } from "react";
import { useUser } from "../hooks/apiHooks";
import { useForm } from "../hooks/formHooks";
import { useUserContext } from "../hooks/contextHooks";


const RegisterForm = () => {
  const initValues = {username: '', password: '', email: ''};
  const {postUser} = useUser();

  const {handleLogin} = useUserContext();

  const doRegister = async () => {
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
        <form onSubmit={handleSubmit} className=" flex flex-col py-6 px-3 border rounded">
          <div className=" flex justify-between items-center">
            <label
              className=" p-3"
              htmlFor="username">
                Username
            </label>
            <input
              className=" text-slate-950 w-96 m-3 rounded p-2 border-slate-500"
              name="username"
              type="text"
              id="username"
              onChange={handleInputChange}
              onBlur={handleUsernameBlur}
              autoComplete="username"
            />
            {!usernameAvailable ? (
              <span>Käyttäjän nimi on jo käytössä</span>
            ): ('')}

          </div>

          <div className=" flex justify-between">
              <label className=" p-3" htmlFor="password">Password</label>
              <input
                className=" text-slate-950 w-96 m-3 rounded p-2 border-slate-500"
                name="password"
                type="password"
                id="password"
                onChange={handleInputChange}
                autoComplete="current-password"
              />
          </div>
          <div className=" flex justify-between">
              <label className=" p-3" htmlFor="passwordConfirm">Confirm Password</label>
              <input
                className=" text-slate-950 w-96 m-3 rounded p-2 border-slate-500"
                name="passwordConfirm"
                type="password"
                id="passwordConfirm"
                onChange={handleInputChange}
                autoComplete="current-password"
              />
          </div>
          <div className=" flex justify-between items-center">
            <label className=" p-3" htmlFor="email">Email</label>
            <input
              className=" text-slate-950 w-96 m-3 rounded p-2 border-slate-500"
              name="email"
              type="email"
              id="email"
              onChange={handleInputChange}
              onBlur={handleEmailBlur}
              autoComplete="email"
            />
            {!emailAvailable ? (
              <span>Sähköpostiosoite on jo käytössä</span>
            ): ('')}
          </div>
          <button className="m-3 w-1/3 rounded-md bg-slate-700 p-3 self-center" type="submit">Rekisteröidy</button>
        </form>
      </div>
    </>
  );
}

export default RegisterForm;
