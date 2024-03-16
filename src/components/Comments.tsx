import { useEffect, useReducer, useRef } from "react";
import { useUserContext } from "../hooks/contextHooks";
import { useForm } from "../hooks/formHooks";
import { Comment, MediaItemWithOwner } from "../types/DBTypes";
import { useComment } from "../hooks/apiHooks";

type CommentType =  Partial<Comment & {username: string;}>;

type CommentState = {
  comments:  CommentType[] | null,
  userComment: CommentType | null
}

// action inlcudes type and payload
type CommentAction = {
  type: 'setComments' | 'doComment';
  comments?: CommentType[] | null;
  userComment?: CommentType | null;
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
  const formRef = useRef<HTMLFormElement>(null);

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
      commentDispatch({type: 'setComments', comments: null});
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
      if (formRef.current) {
        formRef.current.reset();
      }
      commentDispatch({type: 'setComments', comments: comments});
    } catch (e) {
      console.log('like error', (e as Error).message);
    }
  }

  const {handleInputChange, handleSubmit, inputs} = useForm(doComment, initValues);

  return (
    <div className=" mb-5 text-xl">

        <h4 className=" text-2xl font-medium mb-3  text-red-950">
          <label className="" htmlFor="comment">Kommentit</label>
        </h4>
        <ul className=" ml-6">
          {(commentState.comments && commentState.comments.length > 0) && (
            commentState.comments.map((item) => (
              <li key={item.comment_id} className="mb-4 border px-2 py-1 w-fit rounded-xl bg-slate-100">
                <p className=" font-medium">{item.username}
                  <span className="text-base text-slate-500"> on {new Date(item.created_at!).toLocaleDateString()}</span>
                </p>
                <p>{item.comment_text}</p>
              </li>
          )))}
        </ul>
        <form onSubmit={handleSubmit} ref={formRef} className="flex  ml-6">
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
        </form>


    </div>

  );
};

export default Comments;
