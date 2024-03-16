import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { MediaItemWithOwner } from "../types/DBTypes";
import Likes from "../components/Likes";
import Comments from "../components/Comments";

const Single = () => {
  const {state} = useLocation();
  const navigate: NavigateFunction = useNavigate();
  console.log('single state', state);
  const item: MediaItemWithOwner = state;

  return (
    <div className=" flex flex-col p-4">

      {item.media_type?.includes('video') ? (
        <video controls src={item.filename}></video>
      ) : (
        <img className="border rounded-lg max-h-[70vh] object-cover" src={item.filename} alt={item.title} />
      )}
      <h3 className=" text-4xl text-center font-serif font-bold m-5 text-fire-engine-red">{item.title}</h3>
      <div className=" mb-5 text-xl">
        <h4 className=" text-2xl font-medium mb-2  text-red-950">Kirjoittaja</h4>
        <p>{item.username}</p>
        <p>{new Date(item.created_at).toLocaleString('fi-FI')}</p>
      </div>
      <div className=" mb-5 text-xl">
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
      <div className=" mb-5 text-xl">
        <h4 className=" text-2xl font-medium  mb-2 text-red-950">Ohje</h4>
        <p>{item.instruction}</p>
      </div>
      <Likes recipeItem={item}/>
      <Comments recipeItem={item} />
      <button className=" w-28 h-12 my-2 rounded-md bg-orange-wheel p-3 self-center hover:bg-light-orange" onClick={() => {
        navigate(-1);
      }}>
        Go back
      </button>
    </div>
  );
}

export default Single;
