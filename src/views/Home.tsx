import RecipeRow from "../components/MediaRow";
import { useRecipe } from "../hooks/apiHooks";

const Home = () => {
  const {recipeArray} = useRecipe();
  return (
    <>
      <section>
        <h2 className=" text-3xl text-center my-3">Reseptit</h2>
        <div className="grid grid-cols-media gap-2">
        {recipeArray.map((item) =>
          <RecipeRow key={item.media_id} item={item}/>
        )}
        </div>
      </section>
    </>
  );
};

export default Home;
