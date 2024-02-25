import { useEffect, useState } from "react";
import { fetchData } from "../lib/functions";
import { RecipeItem, RecipeItemWithOwner, User } from "../types/DBTypes";

const useRecipe = () => {
  const [recipeArray, setRecipeArray] = useState<RecipeItemWithOwner[]>([]);
  const getRecipe = async () => {
    const recipeItems = await fetchData<RecipeItem[]>(
      import.meta.env.VITE_RECIPE_API + '/recipe',
    );

    const itemsWithOwner = await Promise.all(recipeItems.map( async (item) => {
      const owner = await fetchData<User>(
        import.meta.env.VITE_AUTH_API + '/users/' + item.user_id,
      );
      const itemWithOwner:  RecipeItemWithOwner = {...item, username: owner.username};
      return itemWithOwner;
    }));

    setRecipeArray(itemsWithOwner);
  }

  useEffect(() => {
    getRecipe()
  }, []);

  return {recipeArray};

}

export {useRecipe};
