import { createContext, useEffect, useReducer } from "react";
import "./App.css";
import Footer from "./Footer";
import { handleClickLoadMore } from "./handleClickLoadMore";
import ListsPhoto from "./ListsPhoto.js";
import { initialState, reducer } from "./state";
import { Routes, Route } from "react-router-dom";
import Liked from "./Like";
export const ValuesContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    handleClickLoadMore(state, dispatch);
  }, []);

  return (
    <ValuesContext.Provider value={{ state, dispatch, handleClickLoadMore }}>
      <div className="wrapper px-5">
        <Routes>
          <Route
            path="/"
            element={<ListsPhoto photos={state.photos} />}
          ></Route>
          <Route path="/liked" element={<Liked />}></Route>
        </Routes>
        <Footer></Footer>
      </div>
    </ValuesContext.Provider>
  );
}

export default App;
