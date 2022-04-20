import { createContext, useEffect, useReducer } from "react";
// import usePersistedState from "../hooks/usePersistedState";
import { initialStates } from "../settings";

export const CommentContext = createContext(null);

const initialState = {
  status: "idle",
  hasLoaded: false,
  comments: initialStates.comments,
  message: null,
  type: "initial",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "initial": {
      return {
        ...initialState
      };
    }
    case "loading-comments-from-server": {
      return {
        ...state,
        status: "loading-comments",
      };
    }
    case "received-comments-from-server": {
      return {
        ...state,
        ...action,
        loggedIn: true,
        hasLoaded: true,
        status: "comments-loaded",
      };
    }
    // case "received-comments-from-storage": {
    //   return {
    //     ...state,
    //     ...action,
    //     status: "comments-loaded",
    //   };
    // }
    case "comment-updated": {
      return {
        ...state,
        ...action,
        status: "comment-updated",
      };
    }
    case "delete-comment": {
      return {
        ...state,
        ...action,
        status: "comment-deleted",
      };
    }
    case "error-from-server": {
      return {
        ...state,
        ...action,
        status: "error-from-server",
      };
    }
    case "sending-comment-to-server": {
      return {
        ...state,
        ...action,
        status: "sending-comment-to-server",
      };
    }
    default: {
      throw new Error(`Unrecognized action: ${action.type}`);
    }
  }
};

export const CommentProvider = ({ children }) => {
  // const [localStorage, setLocalStorage] = usePersistedState("comment", {});

  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect(() => {
  //   // console.log(localStorage);
  //   if (localStorage?.title) {
  //     dispatch({
  //       hasLoaded: true,
  //       Comment: localStorage,
  //       message: "data loaded from storage",
  //       type: "received-comment-from-storage",
  //     });
  //   }
  //   // eslint-disable-next-line
  // }, []);

  const initialComments = () => {
    // setLocalStorage({});
    dispatch({
      type: "initial",
    });
  };

  const loadingComments = () => {
    dispatch({
      type: "loading-comments-from-server",
    });
  };

  const sendingCommentToServer = () => {
    dispatch({
      type: "sending-comment-to-server",
    });
  };

  const updateComment = (data) => {
    // console.log(data);
    // setLocalStorage(data);
    dispatch({
      ...data,
      type: "comment-updated",
    });
  };

  const deleteComment = (data) => {
    dispatch({
      ...data,
      type: "delete-comment",
    });
  };

  const receivedCommentsFromServer = (data) => {
    // console.log(data);
    // setLocalStorage(data);
    dispatch({
      ...data,
      type: "received-comments-from-server",
    });
  };

  const errorCommentFromServer = (data) => {
    dispatch({
      ...data,
      type: "error-from-server",
    });
  };

  return (
    <CommentContext.Provider
      value={{
        state,
        actions: {
          loadingComments,
          receivedCommentsFromServer,
          errorCommentFromServer,
          deleteComment,
          updateComment,
          initialComments,
          sendingCommentToServer,
        },
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
