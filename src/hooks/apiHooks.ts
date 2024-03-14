import { useEffect, useState } from "react";
import { fetchData } from "../lib/functions";
import { Like, LikeItemWithOwner, MediaItem, MediaItemWithOwner, User, UserWithNoPassword } from "../types/DBTypes";
import { Credentials } from "../types/LocalTypes";
import { LoginResponse, MediaResponse, MessageResponse, UploadResponse, UserResponse } from "../types/MessageTypes";

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

  const postRecipe = async (
    file: UploadResponse,
    inputs: Record<string, string>,
    token: string
    ) => {
      // create a suitable object for Media API, the type is MediaItem without media_id, user_id, thumbnail and created_at.
      // All those are generated by the API. Remember to add app_id from .env.local
      const recipe: Omit<MediaItem, 'media_id' | 'user_id' | 'thumbnail' | 'created_at'> = {
        title: inputs.title,
        description: inputs.description,
        serving: inputs.serving,
        cook_time: inputs.cookTime,
        ingredients: inputs.ingredients,
        instruction: inputs.instruction,
        filename: file.data.filename,
        filesize: file.data.filesize,
        media_type: file.data.media_type
      };
      // post the data to Media API and get the data as MediaResponse
      const options = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      }

      // return the data
      return await fetchData<MediaResponse>(
        import.meta.env.VITE_MEDIA_API + '/media',
        options
      );
    };

  return {recipeArray, postRecipe};

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

  const getUserById = async (id: number) => {
    const result = await fetchData<UserWithNoPassword>(import.meta.env.VITE_AUTH_API + '/users/' + id);
    return result;
  };

  return {getUserByToken, postUser, getUsernameAvailable, getEmailAvailable, getUserById};
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
    // add file to FormData
    formData.append('file', file);
    console.log(formData);
    // upload the file to file server and get the file data
    // return the file data. The type is UploadResponse
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    }
    return await fetchData<UploadResponse>(import.meta.env.VITE_UPLOAD_SERVER + '/upload', options);
  };

  return {postFile};
}

const useLike = () => {
  const postLike = async (media_id: number, token: string) => {
    // Send a POST request to /likes with object { media_id }
    // and the token in the Authorization header.
    const options: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({media_id}),
    };

    return await fetchData<MessageResponse>(
      import.meta.env.VITE_MEDIA_API + '/likes',
      options,
    );
  };

  const deleteLike = async (like_id: number, token: string) => {
    // Send a DELETE request to /likes/:like_id with the
    // token in the Authorization header.
    const options: RequestInit = {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,

      },
    };

    return await fetchData<MessageResponse>(
      import.meta.env.VITE_MEDIA_API + '/likes/' + like_id,
      options,
    );
  };

  const getCountByMediaId = async (media_id: number) => {
    // TODO: Send a GET request to /likes/:media_id to get the number of likes.
    return await fetchData<{count: number}>(
      import.meta.env.VITE_MEDIA_API + '/likes/count/' + media_id,
    );
  };

  const getUserLike = async (media_id: number, token: string) => {
    // Send a GET request to /likes/bymedia/user/:media_id
    // to get the user's like on the media.
    const options: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return await fetchData<Like>(
      import.meta.env.VITE_MEDIA_API + '/likes/bymedia/user/' + media_id,
      options,
    );
  };

  const {getUserById} = useUser();
  const getLikeListWithOwner = async (media_id: number) => {
    // send request to /bymedia/:media_id to get like list by media
    const getLikeListByMediaId =  await fetchData<Like[]>(
        import.meta.env.VITE_MEDIA_API + '/likes/bymedia/' + media_id,
    );

    const likeListWithOwner = await Promise.all(getLikeListByMediaId.map(async (likeItem) => {
      const owner = await getUserById(likeItem.user_id);
      const likeItemWithOwner: LikeItemWithOwner = {...likeItem, username: (owner).username};
      return likeItemWithOwner;
    }));

    return likeListWithOwner;
  }


  return {postLike, deleteLike, getCountByMediaId, getUserLike, getLikeListWithOwner};
};

export {useRecipe, useAuthentication, useUser, useFile, useLike};
