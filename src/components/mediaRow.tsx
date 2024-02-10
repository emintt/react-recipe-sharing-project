import { Link } from "react-router-dom";
import { RecipeItem } from "../types/DBTypes";

const RecipeRow = (props: {item: RecipeItem}) => {
  const {item} = props;

  return (
    <div>
      <div>
        <a href="#">
          <img src={item.thumbnail} alt={item.title} />
        </a>
      </div>
      <div>
        <div>
        {item.title}
        </div>
      </div>
      <button>
        <Link to="/single" state={item}>Show</Link>
      </button>
    </div>
  );
}

export default RecipeRow;
