import { useEffect, useReducer } from "react";
import { useUserContext } from "../hooks/contextHooks";
import { useForm } from "../hooks/formHooks";
import { Comment, MediaItemWithOwner } from "../types/DBTypes";
import { useComment } from "../hooks/apiHooks";

type CommentState = {
  comments:  Partial<Comment & {username: string;}>[] | null,
  userComment: Partial<Comment & {username: string;}> | null
}

// action inlcudes type and payload
type CommentAction = {
  type: 'setComments' | 'doComment';
  comments?: Partial<Comment & {username: string;}>[] | null;
  userComment?: Partial<Comment & {username: string;}> | null;
};

const commentInitialState: CommentState = {
  comments: [],
  userComment: null
}

// action includes type and payload, payload receive data from dispatch func
const commentReducer = (state: CommentState, action: CommentAction): CommentState => {
  switch (action.type) {
    case 'doComment':
      if (action.userComment !== undefined) {
        return {...state,
            userComment: action.userComment
          };
      }
      return state;
    case 'setComments':
      if (action.comments !== undefined) {
        return {...state, comments: action.comments ?? []};
      }
      return state;
    default:
      return state; // Return the unchanged state if the action type is not recognized
  }
};

const Comments = (props: {recipeItem: MediaItemWithOwner}) => {
  const {recipeItem} = props;
  const {user} = useUserContext();

  const {getCommentsByMediaId, postComment} = useComment();
  const [commentState, commentDispatch] = useReducer(commentReducer, commentInitialState);
  console.log('comment state', commentState);

  const initValues =  {comment_text: ''};

  const getComments = async() => {
    if (!recipeItem) {
      return;
    }
    try {
      const comments = await getCommentsByMediaId(recipeItem.media_id);
      console.log(comments);
      commentDispatch({type: 'setComments', comments: comments});
    } catch (e) {
      console.log('get comments error', (e as Error).message);
      commentDispatch({type: 'setComments', likeList: null});
    }
  }

  useEffect(() => {
    getComments();
  }, []);
  const doComment = async () => {
    if (!user) {
      alert('Please sign in to comment!');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (!recipeItem || !token) {
        return;
      }
      const postResponse = await postComment(inputs.comment_text, recipeItem.media_id, token);
      const comments = await getCommentsByMediaId(recipeItem.media_id);
      console.log(postResponse);
      console.log(comments);
      commentDispatch({type: 'setComments', comments: comments});
    } catch (e) {
      console.log('like error', (e as Error).message);
    }
  }

  const {handleInputChange, handleSubmit, inputs} = useForm(doComment, initValues);

  return (
    <div className=" mb-5 text-xl">
      <form
        onSubmit={handleSubmit}
        // ref={formRef}
      >
        <h4 className=" text-2xl font-medium mb-3  text-red-950">
          <label className="" htmlFor="comment">Kommentit</label>
        </h4>
        <div className="flex">
          <input
            className=" w-full md:w-[50rem] border border-slate-500 p-4 text-slate-950"
            name="comment_text"
            type="text"
            id="comment"
            placeholder="Lisää kommentti"
            onChange={handleInputChange}
          />
          <button
          className=" rounded bg-orange-wheel p-4 hover:bg-light-orange"
          type="submit"
          >
            Post
          </button>
        </div>
      </form>

    </div>

  );
};

export default Comments;
