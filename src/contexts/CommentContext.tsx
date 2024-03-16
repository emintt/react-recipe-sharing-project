import { createContext } from "react";

type CommentContextType = {

}
const CommentContext = createContext(null);

const CommentProvider = ({children} : {children: React.ReactNode}) => {

};



  return (
    <CommentContext.Provider value={{}}>
      {children}
    </CommentContext.Provider>
  );
};

export { CommentProvider, CommentContext };

