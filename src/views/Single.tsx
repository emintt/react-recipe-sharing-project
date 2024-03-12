import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { MediaItem, UserWithNoPassword } from "../types/DBTypes";
import { useUser } from "../hooks/apiHooks";
import { useEffect, useState } from "react";

const Single = () => {
  const {state} = useLocation();
  const navigate: NavigateFunction = useNavigate();
  console.log('single state', state);
  const item: MediaItem = state;

  const {getUserById} = useUser();
  const [owner, setOwner] = useState<UserWithNoPassword | null>(null);
  const getOwner = async () => {
    try {
      const result = await getUserById(item.user_id);
      setOwner(result);
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  useEffect(() => {
    getOwner();
  }, []);

  return (
    <div className=" flex flex-col">

      {item.media_type?.includes('video') ? (
        <video controls src="{item.filename}"></video>
      ) : (
        <img className="border rounded-lg" src={item.filename} alt={item.title} />
      )}
      <h3 className=" text-3xl text-center font-serif font-bold m-4">{item.title}</h3>
      <div className=" mb-5">
        <h4 className=" text-2xl font-medium mb-2  text-red-950">Kirjoittaja</h4>
        <p>{owner?.username}</p>
        <p>{new Date(item.created_at).toLocaleString('fi-FI')}</p>
      </div>
      <div className=" mb-5">
        <h4 className=" text-2xl font-medium  mb-2 text-red-950">Aineosat</h4>
        <div className=" flex mb-2">
          <div className=" mr-6">
            <img className=" inline w-8 h-8 mr-2" src="icons8-clock-50.png" alt="clock" />
            <span className="inline">{item.cook_time}</span>
          </div>
          <div>
            <img className=" inline w-8 h-8 mr-2" src="icons8-person-64.png" alt="person" />
            <span className="inline">{item.cook_time}</span>
          </div>
        </div>
        <p>{item.ingredients}</p>
      </div>
      <div className=" mb-5">
        <h4 className=" text-2xl font-medium  mb-2 text-red-950">Ohje</h4>
        <p>{item.instruction}</p>
      </div>

      <button className=" w-28 h-12 my-2 rounded-md bg-orange-wheel p-3 self-center hover:bg-light-orange" onClick={() => {
        navigate(-1);
      }}>
        Go back
      </button>
    </div>
  );
}

export default Single;
