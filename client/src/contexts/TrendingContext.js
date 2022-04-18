import { createContext, useEffect, useReducer } from "react";
import usePersistedState from "../hooks/usePersistedState";
import { initialStates } from "../settings";

export const TrendingContext = createContext(null);

const initialState = {
  status: "idle",
  hasLoaded: false,
  trending: initialStates.trending,
  message: null,
  type: "initial",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "initial": {
      return {
        ...initialState,
        hasLoaded: false,
        status: "init-trending",
      };
    }
    case "loading-trending-from-server": {
      return {
        ...state,
        status: "loading-trending",
      };
    }
    case "received-trending-from-server": {
      return {
        ...state,
        ...action,
        hasLoaded: true,
        status: "trending-loaded",
      };
    }
    case "received-trending-from-storage": {
      return {
        ...state,
        ...action,
        hasLoaded: true,
        status: "trending-loaded",
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

export const TrendingProvider = ({ children }) => {
  const [localStorage, setLocalStorage] = usePersistedState("trending", []);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // console.log(localStorage);
    if (localStorage) {
      dispatch({
        hasLoaded: true,
        trending: localStorage,
        message: "data loaded from storage",
        type: "received-trending-from-storage",
      });
    }
    // eslint-disable-next-line
  }, []);

  const loadingTrending = () => {
    dispatch({
      type: "loading-trending-from-server",
    });
  };

  const receivedTrendingFromServer = (data) => {
    // console.log(data);
    setLocalStorage(data);
    dispatch({
      ...data,
      type: "received-trending-from-server",
    });
  };

  const errorTrendingFromServer = (data) => {
    dispatch({
      ...data,
      type: "error-from-server",
    });
  };

  return (
    <TrendingContext.Provider
      value={{
        state,
        actions: {
          loadingTrending,
          receivedTrendingFromServer,
          errorTrendingFromServer,
        },
      }}
    >
      {children}
    </TrendingContext.Provider>
  );
};
