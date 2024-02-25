
const LoginForm = () => {


  return (
    <>
      <div className=" flex flex-col items-center gap-5 my-6">
        <h3 className=" text-3xl text-center">Login</h3>
        <form  className=" flex flex-col py-6 px-3 border rounded">
          <div className=" flex justify-between items-center">
            <label
              className=" p-3"
              htmlFor="loginUsername">
                Username
            </label>
            <input
              className=" text-slate-950 w-96 m-3 rounded p-2 border-slate-500"
              name="username"
              type="text"
              id="loginUsername"
              // onChange={}
              autoComplete="username"
            />
          </div>
          <div className=" flex justify-between">
              <label className=" p-3" htmlFor="loginpassword">Password</label>
              <input
                className=" text-slate-950 w-96 m-3 rounded p-2 border-slate-500"
                name="password"
                type="password"
                id="loginpassword"
                // onChange={}
                autoComplete="current-password"
              />
          </div>
          <button className="m-3 w-1/3 rounded-md bg-slate-700 p-3 self-center" type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default LoginForm;

