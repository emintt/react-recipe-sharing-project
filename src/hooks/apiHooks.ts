import { useEffect, useState } from "react";
import { fetchData } from "../lib/functions";
import { RecipeItem, RecipeItemWithOwner, User } from "../types/DBTypes";
import { Credentials } from "../types/LocalTypes";
import { LoginResponse, UserResponse } from "../types/MessageTypes";

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

const useUser = () => {
  // implement network connections for auth/user server
  // tee state user, hae user tietoa
  const getUserByToken = async (token: string) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    };
    return await fetchData<UserResponse>(
      import.meta.env.VITE_AUTH_API + '/users/token',
      options
    );
  }

  return {getUserByToken};
}
const useAuthentication = () => {
  const postLogin = async (creds: Credentials) => {
    // fetch login response from auth server
    return await fetchData<LoginResponse>(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify(creds),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  return {postLogin};
}

export {useRecipe, useAuthentication, useUser};
