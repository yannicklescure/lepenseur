import { createContext, useEffect, useReducer } from "react";
import usePersistedState from "../hooks/usePersistedState";
import { initialStates } from "../settings";

export const StoryContext = createContext(null);

const initialState = {
  status: "idle",
  hasLoaded: false,
  story: initialStates.story,
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
    case "loading-story-from-server": {
      return {
        ...state,
        status: "loading-story",
      };
    }
    case "received-story-from-server": {
      return {
        ...state,
        ...action,
        loggedIn: true,
        hasLoaded: true,
        status: "story-loaded",
      };
    }
    case "received-story-from-storage": {
      return {
        ...state,
        ...action,
        status: "story-loaded",
      };
    }
    case "story-updated": {
      return {
        ...state,
        ...action,
        status: "story-updated",
      };
    }
    case "delete-story": {
      return {
        ...state,
        ...action,
        status: "story-deleted",
      };
    }
    case "error-from-server": {
      return {
        ...state,
        ...action,
        status: "error-from-server",
      };
    }
    case "ready-to-publish": {
      return {
        ...state,
        ...action,
        status: "ready-to-publish",
      };
    }
    case "sending-story-to-server": {
      return {
        ...state,
        ...action,
        status: "sending-story-to-server",
      };
    }
    case "ready-to-update": {
      return {
        ...state,
        ...action,
        status: "ready-to-update",
      };
    }
    default: {
      throw new Error(`Unrecognized action: ${action.type}`);
    }
  }
};

export const StoryProvider = ({ children }) => {
  const [localStorage, setLocalStorage] = usePersistedState("story", {});

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log(localStorage);
    if (localStorage?.title) {
      dispatch({
        hasLoaded: true,
        story: localStorage,
        message: "data loaded from storage",
        type: "received-story-from-storage",
      });
    }
    // eslint-disable-next-line
  }, []);

  const initialStory = () => {
    setLocalStorage({});
    dispatch({
      type: "initial",
    });
  };

  const loadingStory = () => {
    dispatch({
      type: "loading-story-from-server",
    });
  };

  const sendingStoryToServer = () => {
    dispatch({
      type: "sending-story-to-server",
    });
  };

  const updateStory = (data) => {
    // console.log(data);
    setLocalStorage(data);
    dispatch({
      ...data,
      type: "story-updated",
    });
  };

  const deleteStory = (data) => {
    dispatch({
      ...data,
      type: "delete-story",
    });
  };

  const readyToPublish = (data) => {
    // console.log(data);
    setLocalStorage(data);
    dispatch({
      ...data,
      type: "ready-to-publish",
    });
  };

  const readyToUpdate = (data) => {
    // console.log(data);
    setLocalStorage(data);
    dispatch({
      ...data,
      type: "ready-to-update",
    });
  };

  const receivedStoryFromServer = (data) => {
    console.log(data);
    setLocalStorage(data);
    dispatch({
      ...data,
      type: "received-story-from-server",
    });
  };

  const errorStoryFromServer = (data) => {
    dispatch({
      ...data,
      type: "error-from-server",
    });
  };

  return (
    <StoryContext.Provider
      value={{
        state,
        actions: {
          loadingStory,
          receivedStoryFromServer,
          errorStoryFromServer,
          deleteStory,
          updateStory,
          readyToPublish,
          initialStory,
          readyToUpdate,
          sendingStoryToServer,
        },
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};
