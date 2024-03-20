import { Link } from "react-router-dom";
import { MediaItemWithOwner } from "../types/DBTypes";
import Likes from "./Likes";
import { useUserContext } from "../hooks/contextHooks";
import { useRecipe } from "../hooks/apiHooks";

const RecipeRow = (props: {item: MediaItemWithOwner}) => {

  const {item} = props;
  const {user} = useUserContext();
  const {deleteRecipeByMediaId} = useRecipe();

  const deleteRecipe = async (media_id: number) => {
    const token = localStorage.getItem('token');
    if (!user || !item || !token) {
      return;
    }
    try {
      const deleteResponse = await deleteRecipeByMediaId(media_id, token);
      alert(deleteResponse.message);
    } catch (e) {
      console.log('delete recipe error', (e as Error).message);
    }
  }
  return (
    <div className="grid grid-rows-media-item bg-white p-2 rounded-xl text-2xl ">
      <Link to="/single" state={item} className="">
        <div className="m-2">{item.username}</div>
        <div className="h-full">
          <img src={item.thumbnail ? item.thumbnail : "https://placehold.jp/320x240.png"} alt={item.title}
            className=" object-cover "/>
        </div>
      </Link>
      <div className=" ">
        <Link to="/single" state={item}>
          <h2 className=" text-xl font-medium">
          {item.title}
          </h2>
        </Link>
        <Likes recipeItem={item} />
        {user &&
          (user.user_id === item.user_id || user.level_name === 'Admin') &&
            (<>
              {/* <button className="w-18 text-orange-wheel self-start text-right"
                onClick={() => <Navigate to="/modify" replace={true} />}>Modify</button> */}
              <Link
                className="ml-4 w-18 text-orange-wheel self-start text-right"
                to='/modify'
                state={{item: item }}
              >
                Modify
              </Link>
              <button className="ml-4 w-18 text-orange-wheel self-start text-right"
                onClick={() => deleteRecipe(item.media_id)}>Delete</button>
            </>
        )}
      </div>

    </div>
  );
}

export default RecipeRow;
