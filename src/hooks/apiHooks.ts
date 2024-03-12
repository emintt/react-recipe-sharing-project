import { useEffect, useState } from "react";
import { fetchData } from "../lib/functions";
import { MediaItem, MediaItemWithOwner, User } from "../types/DBTypes";
import { Credentials } from "../types/LocalTypes";
import { LoginResponse, UserResponse } from "../types/MessageTypes";

const useRecipe = () => {
  const [recipeArray, setRecipeArray] = useState<MediaItemWithOwner[]>([]);
  const getRecipe = async () => {
    const recipeItems = await fetchData<MediaItem[]>(
      import.meta.env.VITE_MEDIA_API + '/media',
    );

    const itemsWithOwner = await Promise.all(recipeItems.map( async (item) => {
      const owner = await fetchData<User>(
        import.meta.env.VITE_AUTH_API + '/users/' + item.user_id,
      );
      const itemWithOwner:  MediaItemWithOwner = {...item, username: owner.username};
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

  const postUser = async (user: Record<string, string>) => {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    const result = fetchData<UserResponse>(
      import.meta.env.VITE_AUTH_API + '/users',
      options,
    );
     return result;
  };

  const getUsernameAvailable = async (username: string) => {
    const result = await fetchData<{available: boolean}>(
      import.meta.env.VITE_AUTH_API + '/users/username/' + username
    );
    return result;
  };

  const getEmailAvailable = async (email: string) => {
    const result = await fetchData<{available: boolean}>(
      import.meta.env.VITE_AUTH_API + '/users/email/' + email
    );
    return result;
  };

  return {getUserByToken, postUser, getUsernameAvailable, getEmailAvailable};
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

const useFile = () => {
  const postFile = async (file: File, token: string) => {
    // create FormData object
    const formData = new FormData();
    console.log('form data', formData);
    // TODO: add file to FormData
    // TODO: upload the file to file server and get the file data
    // TODO: return the file data. The type is UploadResponse
  };

  return {postFile};
}

export {useRecipe, useAuthentication, useUser, useFile};
