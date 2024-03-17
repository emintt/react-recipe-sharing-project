import { Link } from "react-router-dom";
import { MediaItemWithOwner } from "../types/DBTypes";
import Likes from "./Likes";

const RecipeRow = (props: {item: MediaItemWithOwner}) => {
  const {item} = props;

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
      </div>

    </div>
  );
}

export default RecipeRow;
