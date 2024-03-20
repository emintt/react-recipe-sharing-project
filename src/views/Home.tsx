import { useState } from "react";
import RecipeRow from "../components/RecipeRow";
import { useRecipe } from "../hooks/apiHooks";
import { MediaItemWithOwner } from "../types/DBTypes";

const Home = () => {
  const {recipeArray, mostCommentedRecipeArray} = useRecipe();
  // const [recipeState, setRecipeArray] = useState<MediaItemWithOwner[]>(recipeArray);

  // const [mostCommentedRecipeState, setMostCommentedRecipeState] = useState<MediaItemWithOwner[]>(mostCommentedRecipeArray);


  return (
    <>
      <section>
        <h2 className=" text-3xl text-center my-3">Kommentoiduimmat Reseptit</h2>
        <div className="grid grid-cols-media gap-2">
        {mostCommentedRecipeArray.map((item) =>
          <RecipeRow key={item.media_id} item={item} />
        )}
        </div>
      </section>
      <section>
        <h2 className=" text-3xl text-center my-3">Reseptit</h2>
        <div className="grid grid-cols-media gap-2">
        {recipeArray.map((item) =>
          <RecipeRow key={item.media_id} item={item}  />
        )}
        </div>
      </section>
    </>
  );
};

export default Home;
