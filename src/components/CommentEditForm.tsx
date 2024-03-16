import { useRef } from "react";
import { useForm } from "../hooks/formHooks";
import { useComment } from "../hooks/apiHooks";
import { useCommentContext } from "../hooks/contextHooks";


const CommentEditForm = (props: {commentId: number, commentText: string, recipeId: number}) => {
  const {commentId, commentText, recipeId} = props;
  const formRef = useRef<HTMLFormElement>(null);
  const {updateCommentById} = useComment();
  const {getComments}= useCommentContext();
  const initValues = {
    comment_text: commentText
  }

  const doEdit = async() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    await updateCommentById(commentId, inputs.comment_text, token);
    if (formRef.current) {
      formRef.current.reset();
    }
    // dispatch is already done in getComments function
    getComments(recipeId);
  }
  const {handleInputChange, handleSubmit, inputs} = useForm(doEdit, initValues);
  return (
    <>
      <form onSubmit={handleSubmit} ref={formRef} className="flex  ml-6">
        <input
          className=" w-full md:w-[50rem] border border-slate-500 p-4 text-slate-950"
          name="comment_text"
          type="text"
          id="comment-to-edit"
          placeholder={initValues.comment_text}
          onChange={handleInputChange}
        />
        <button
        className=" rounded bg-orange-wheel p-4 hover:bg-light-orange  disabled:bg-slate-300"
        type="submit"
        disabled={ inputs.comment_text ? false : true}
        >
          Save
        </button>
      </form>
    </>
  );
}


export default CommentEditForm;
