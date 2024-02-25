import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { RecipeItem } from "../types/DBTypes";

const Single = () => {
  const {state} = useLocation();
  const navigate: NavigateFunction = useNavigate();
  console.log('single state', state);
  const item: RecipeItem = state;
  return (
    <>
      <h3>{item.title}</h3>
      {item.media_type?.includes('video') ? (
        <video controls src="{item.filename}"></video>
      ) : (
        <img src={item.filename} alt={item.title} />
      )}

      <p>{item.description}</p>
      <p>{item.ingredients}</p>
      <p>{item.instruction}</p>
      <p>{new Date(item.created_at).toLocaleString('fi-FI')}</p>
      <p>{item.filesize}</p>
      <p>{item.media_type}</p>
      <button onClick={() => {
        navigate(-1);
      }}>
        Go back
      </button>
    </>
  );
}

export default Single;
