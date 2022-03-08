import { createContext, useEffect, useReducer } from "react";
import "./App.css";
import Explore from "./Explore";
import { handleClickLoadMore } from "./handleClickLoadMore";
import ListsPhoto from "./ListsPhoto.js";
import Nav from "./Nav";
import { initialState, reducer } from "./state";

export const ValuesContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    handleClickLoadMore(state, dispatch);
  }, []);

  return (
    <ValuesContext.Provider value={{ state, dispatch, handleClickLoadMore }}>
      <div className="wrapper px-5">
        <Nav />
        <Explore />
        <ListsPhoto photos={state.photos} />
      </div>
    </ValuesContext.Provider>
  );
}

export default App;
