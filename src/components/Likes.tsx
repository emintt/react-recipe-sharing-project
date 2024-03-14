import { useEffect, useReducer } from "react";
import { Like, LikeItemWithOwner, MediaItemWithOwner } from "../types/DBTypes";
import { useLike } from "../hooks/apiHooks";
import { useUserContext } from "../hooks/contextHooks";

// likeCount: total likes of the recipe
// useLike: object Like if user has liked, otherwise null
type LikeState = {
  likeCount: number;
  userLike: Like | null;
  likeList: LikeItemWithOwner[] | null;
};

// action inlcudes type and payload
type LikeAction = {
  type: 'setLikeCount' | 'like' | 'setLikeList';
  like?: Like | null;
  likeCount?: number;
  likeList?: LikeItemWithOwner[] | null;
};

const likeInitialState: LikeState = {
  likeCount: 0,
  userLike: null,
  likeList: null,
};

function likeReducer(state: LikeState, action: LikeAction): LikeState {
  switch (action.type) {
    case 'setLikeCount':
      return {...state, likeCount: action.likeCount ?? 0};
    case 'like':
      if (action.like !== undefined) {
        return {...state, userLike: action.like};
      }
      return state; // no change if action.like is undefined
    case 'setLikeList':
      return {...state, likeList: action.likeList ?? null};
    default:
      return state; // Return the unchanged state if the action type is not recognized
  }
}

const Likes = (props: {recipeItem: MediaItemWithOwner}) => {
  const {recipeItem} = props;

  // likeDispatch: dispatch function
  const [likeState, likeDispatch] = useReducer(likeReducer, likeInitialState);

  const {postLike, deleteLike, getCountByMediaId, getUserLike} = useLike();
  const {getLikeListWithOwner} = useLike();

  const {user} = useUserContext();
  // get user like
  const getLike = async () => {
    const token = localStorage.getItem('token');
    if (!recipeItem || !token) {
      return;
    }
    try {
      const userLike = await getUserLike(recipeItem.media_id, token);
      likeDispatch({type: 'like', like: userLike});
    } catch (e) {
      likeDispatch({type: 'like', like: null});
      console.log('get user like error', (e as Error).message);
    }
  };

  // get like count and dispatch it to the state
  const getLikeCount = async () => {
    if (!recipeItem) {
      return;
    }
    try {
      const likeResponse = await getCountByMediaId(recipeItem.media_id);
      likeDispatch({type: 'setLikeCount', likeCount: likeResponse.count});
    } catch (e) {
      console.log('get like count error', (e as Error).message);
      likeDispatch({type: 'setLikeCount', likeCount: 0});
    }
  };

  const getLikeList = async () => {
    if (!recipeItem) {
      return;
    }
    try {
      const likeListWithOwner = await getLikeListWithOwner(recipeItem.media_id);
      console.log(likeListWithOwner);
      likeDispatch({type: 'setLikeList', likeList: likeListWithOwner});
    } catch (e) {
      console.log('get like list error', (e as Error).message);
      likeDispatch({type: 'setLikeList', likeList: null});
    }
  };

  // render likeCount and like
  useEffect(() => {
    getLikeCount();
    getLike();
    getLikeList();
  }, [recipeItem]);

  const handleLike = async () => {
    if (!user) {
      alert('Please sign in to like recipe!');
    }
    try {
      const token = localStorage.getItem('token');
      if (!recipeItem || !token) {
        return;
      }
      // If user has liked the media, delete the like. Otherwise, post the like.
      if (likeState.userLike) {
        // delete the like and dispatch the new like count to the state (to update).
        await deleteLike(likeState.userLike.like_id, token);
        likeDispatch({type: 'setLikeCount', likeCount: likeState.likeCount -1});
        likeDispatch({type: 'like', like: null});
        likeDispatch({type: 'setLikeList', likeList: likeState.likeList?.filter((item) => item.user_id !== likeState.userLike?.user_id)});
      } else {
        //post the like and dispatch the new like count to the state.
        // Dispatching is already done in the getLikes and getLikeCount functions.
        await postLike(recipeItem.media_id, token);
        getLike();
        getLikeCount();
        getLikeList();
      }

    } catch (e) {
      console.log('like error', (e as Error).message);
    }
  };

  return (
    <div className=" mb-5 text-xl">
      <h4 className=" text-2xl font-medium mb-2  text-red-950">Reaktio</h4>
      <button
        className={likeState.userLike ? "flex border rounded-2xl w-16 h-8 justify-center items-center gap-1  bg-orange-200 border-orange-700" : "flex border rounded-2xl w-16 h-8 justify-center items-center gap-1"}

        onClick={handleLike}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-carrot-orange">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
        </svg>
        <span>{likeState.likeCount}</span>
      </button>
      {
      likeState.likeList && (
        (likeState.likeList.length === 1 && likeState.userLike)
          ? <p>You liked this</p>
        : (likeState.likeList.length === 1 && !likeState.userLike)
          ? <span>{likeState.likeList[0].username + ' liked this' }</span>
        : (likeState.likeList?.length > 1)
          ? <span>
            {likeState.likeList.map((likeItem) => <span>{`${likeItem.username} `}</span>)}
            <span>liked this</span>
            </span>
        :null)
      }
    </div>
  );
}

export default Likes;
