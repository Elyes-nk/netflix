import Reducer from "./Reducer";
import { createContext, useEffect, useState, useReducer } from "react";

const INITIAL_STATE = {
  user: typeof window!== "undefined" && JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
        search,
        setSearch
      }}
    >
      {children}
    </Context.Provider>
  );
};
