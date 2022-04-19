import { createContext, useEffect, useReducer } from "react";
import usePersistedState from "../hooks/usePersistedState";
import { initialStates } from "../settings";

export const UserContext = createContext(null);

const initialState = {
  status: "idle",
  hasLoaded: false,
  user: initialStates.user,
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
    case "loading-user-from-server": {
      return {
        ...state,
        status: "loading-user",
      };
    }
    case "received-user-from-server": {
      return {
        ...state,
        ...action,
        loggedIn: true,
        hasLoaded: true,
        status: "user-loaded",
      };
    }
    case "received-user-from-storage": {
      return {
        ...state,
        ...action,
        status: "user-loaded",
      };
    }
    case "user-updated": {
      return {
        ...state,
        ...action,
        status: "user-updated",
      };
    }
    case "delete-user": {
      return {
        ...state,
        ...action,
        status: "user-deleted",
      };
    }
    case "logout-user": {
      return {
        ...state,
        ...action,
        status: "user-logged-out",
      };
    }
    case "error-from-server": {
      return {
        ...state,
        ...action,
        status: "error-from-server",
      };
    }
    default: {
      throw new Error(`Unrecognized action: ${action.type}`);
    }
  }
};

export const UserProvider = ({ children }) => {
  const [localStorage, setLocalStorage] = usePersistedState("user", {});

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // console.log(localStorage);
    if (localStorage?.user?._id) {
      dispatch({
        hasLoaded: true,
        user: localStorage.user,
        message: "data loaded from storage",
        type: "received-user-from-storage",
      });
    }
    // eslint-disable-next-line
  }, []);

  const loadingUser = () => {
    dispatch({
      type: "loading-user-from-server",
    });
  };

  const updateUser = (data) => {
    // console.log(data);
    setLocalStorage(data);
    dispatch({
      ...data,
      type: "user-updated",
    });
  };

  const deleteUser = (data) => {
    dispatch({
      ...data,
      type: "delete-user",
    });
  };

  const logoutUser = (data) => {
    setLocalStorage({});
    dispatch({
      ...initialState,
      type: "logout-user",
    });
  };

  const receivedUserFromServer = (data) => {
    console.log(data);
    setLocalStorage(data);
    dispatch({
      ...data,
      type: "received-user-from-server",
    });
  };

  const errorFromServerUser = (data) => {
    dispatch({
      ...data,
      type: "error-from-server",
    });
  };

  return (
    <UserContext.Provider
      value={{
        state,
        actions: {
          loadingUser,
          receivedUserFromServer,
          errorFromServerUser,
          deleteUser,
          updateUser,
          logoutUser,
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
