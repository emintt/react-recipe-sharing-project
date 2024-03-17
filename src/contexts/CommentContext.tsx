import { createContext, useEffect, useReducer, useState } from "react";
import { Comment } from "../types/DBTypes";
import { useComment } from "../hooks/apiHooks";


type CommentContextType = {
  commentState: CommentState,
  commentDispatch: React.Dispatch<CommentAction>,
  getComments: (media_id: number) => Promise<void>,

  editFormState: boolean[] | null,
  setEditFormState:  React.Dispatch<React.SetStateAction<boolean[] >>
}

type CommentType =  Partial<Comment & {username: string;}>;
type CommentState = {
  comments:  CommentType[] | null,
}

// action inlcudes type and payload
type CommentAction = {
  type: 'setComments';
  comments?: CommentType[] | null;
};

const commentInitialState: CommentState = {
  comments: [],
}

// action includes type and payload, payload receive data from dispatch func
const commentReducer = (state: CommentState, action: CommentAction): CommentState => {
  switch (action.type) {
    case 'setComments':
      if (action.comments !== undefined) {
        return {...state, comments: action.comments ?? []};
      }
      return state;
    default:
      return state; // Return the unchanged state if the action type is not recognized
  }
};


const CommentContext = createContext<CommentContextType | null>(null);

const CommentProvider = ({children} : {children: React.ReactNode}) => {
  const [commentState, commentDispatch] = useReducer(commentReducer, commentInitialState);
  // const editFormStateInit: boolean[] = Array(commentState.comments?.length).fill(false);
  const [editFormState, setEditFormState] = useState<boolean[]>([]);
  // console.log(editFormStateInit);
  console.log(editFormState);

  useEffect(() => {
    if (commentState.comments) {
      const editFormStateInit: boolean[] = Array(commentState.comments.length).fill(false);
      setEditFormState(editFormStateInit);
    }
  }, [commentState.comments]);
  const {getCommentsByMediaId} = useComment();
  const getComments = async(media_id: number) => {
    try {
      const comments = await getCommentsByMediaId(media_id);
      console.log(comments);
      commentDispatch({type: 'setComments', comments: comments});
    } catch (e) {
      console.log('get comments error', (e as Error).message);
      commentDispatch({type: 'setComments', comments: null});
    }
  }
  return (
    <CommentContext.Provider value={{commentState, commentDispatch, getComments, editFormState, setEditFormState}}>
      {children}
    </CommentContext.Provider>
  );
};

export { CommentProvider, CommentContext };

