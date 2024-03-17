import { useEffect, useRef } from "react";
import { useCommentContext, useUserContext } from "../hooks/contextHooks";
import { useForm } from "../hooks/formHooks";
import { MediaItemWithOwner } from "../types/DBTypes";
import { useComment } from "../hooks/apiHooks";
import CommentEditForm from "./CommentEditForm";

// type CommentType =  Partial<Comment & {username: string;}>;
// type CommentState = {
//   comments:  CommentType[] | null,
// }

// // action inlcudes type and payload
// type CommentAction = {
//   type: 'setComments' | 'doComment' | 'deleteComment';
//   comments?: CommentType[] | null;
// };

// const commentInitialState: CommentState = {
//   comments: [],
// }

// // action includes type and payload, payload receive data from dispatch func
// const commentReducer = (state: CommentState, action: CommentAction): CommentState => {
//   switch (action.type) {
//     case 'setComments':
//       if (action.comments !== undefined) {
//         return {...state, comments: action.comments ?? []};
//       }
//       return state;
//     default:
//       return state; // Return the unchanged state if the action type is not recognized
//   }
// };

const Comments = (props: {recipeItem: MediaItemWithOwner}) => {
  const {commentState, commentDispatch, getComments, editFormState, setEditFormState} = useCommentContext();
  const {recipeItem} = props;
  const {user} = useUserContext();
  const formRef = useRef<HTMLFormElement>(null);

  // handle toggle editing form
  console.log(editFormState);

  const handleToggleEditForm = (index: number) => {
    if (!editFormState) {
      return;
    }
    setEditFormState((editFormState) => {
      const newState = [...editFormState];
      newState[index] = !newState[index];
      return newState;
    })
    console.log(editFormState);

  }

  const {getCommentsByMediaId, postComment, deleteCommentById} = useComment();
  // const [commentState, commentDispatch] = useReducer(commentReducer, commentInitialState);
  console.log('comment state', commentState);

  const initValues =  {comment_text: ''};

  // const getComments = async() => {
  //   if (!recipeItem) {
  //     return;
  //   }
  //   try {
  //     const comments = await getCommentsByMediaId(recipeItem.media_id);
  //     console.log(comments);
  //     commentDispatch({type: 'setComments', comments: comments});
  //   } catch (e) {
  //     console.log('get comments error', (e as Error).message);
  //     commentDispatch({type: 'setComments', comments: null});
  //   }
  // }

  // get comments of the recipe
  useEffect(() => {
    getComments(recipeItem.media_id);
  }, []);

  const deleteComment = async (comment_id: number) => {
    const token = localStorage.getItem('token');
    if (!user || !recipeItem || !token) {
      return;
    }
    try {
      const deleteResult = await deleteCommentById(comment_id, token);
      console.log(deleteResult);
      // dispatch is already done in getComments func
      getComments(recipeItem.media_id);
    } catch (e) {
      console.log('delete comment error', (e as Error).message);
      commentDispatch({type: 'setComments', comments: undefined});

    }
  };

  // const toggleIsEditFormOpen = (comment_id: number) => {
  //   const commentToBeToggled = commentState.comments?.find((comment) => { comment.comment_id === comment_id});
  // };
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
      await postComment(inputs.comment_text, recipeItem.media_id, token);
      const comments = await getCommentsByMediaId(recipeItem.media_id);
      if (formRef.current) {
        formRef.current.reset();
      }
      commentDispatch({type: 'setComments', comments: comments});
    } catch (e) {
      console.log('comment error', (e as Error).message);
    }
  }


  console.log(editFormState);
  const {handleInputChange, handleSubmit, inputs} = useForm(doComment, initValues);

  return (
    <div className=" mb-5 text-xl">
        <h4 className=" text-2xl font-medium mb-3  text-red-950">
          <label className="" htmlFor="comment">Kommentit</label>
        </h4>
        <ul className=" ml-6">
          {(commentState.comments && commentState.comments.length > 0) && (
            commentState.comments.map((item, index) => (
              <li key={item.comment_id} className="mb-4  border px-2 py-1 w-fit break-all rounded-xl bg-slate-100">
                <div className=" w-5/6 min-w-full">
                  <p className=" font-medium">{item.username}
                    <span className="text-base text-slate-500"> on {new Date(item.created_at!).toLocaleDateString()}</span>
                  </p>
                  <p>{item.comment_text}</p>
                </div>
                {
                  (item.user_id === user?.user_id && item.comment_id && item.comment_text)
                  ? <>
                      <button onClick={() => {handleToggleEditForm(index)}} className=" w-16 text-orange-wheel self-start text-right"> Edit </button>
                      <button
                        onClick={() => {deleteComment(item.comment_id as number)}}
                        className="ml-2 w-20 text-orange-wheel self-start text-right"
                      >
                        Delete
                      </button>

                      {((editFormState) && editFormState[index] )&&
                        <CommentEditForm commentId={item.comment_id} commentText={item.comment_text} recipeId={recipeItem.media_id} />
                      }
                    </>
                  : null
                }

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
