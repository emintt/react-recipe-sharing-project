import RecipeRow from "../components/MediaRow";
import { useRecipe } from "../hooks/apiHooks";

const Home = () => {
  const {recipeArray} = useRecipe();
  return (
    <>
      {recipeArray.map((item) =>
        <RecipeRow key={item.recipe_id} item={item}/>
      )}

    </>
  );
};

export default Home;
