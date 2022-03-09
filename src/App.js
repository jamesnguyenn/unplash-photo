import { createContext, useEffect, useReducer, useRef } from "react";
import "./App.css";
import Footer from "./Footer";
import axios from "./axios";
import { setLoadingState, setPageURL, setPhotos } from "./state";
import ListsPhoto from "./ListsPhoto.js";
import { initialState, reducer } from "./state";
import { Routes, Route, Link } from "react-router-dom";
import Liked from "./Like";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
export const ValuesContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  let handleClickLoadMore = useRef();
  handleClickLoadMore = (state, dispatch) => {
    try {
      async function getPhotos(state) {
        dispatch(setLoadingState(true));

        const request = await axios.get("/search/photos", {
          params: {
            query: state.input,
            page: state.page,
            per_page: 8,
          },
        });
        dispatch(setPhotos(request.data.results));
        dispatch(setPageURL());
        dispatch(setLoadingState(false));
        return request;
      }
      getPhotos(state);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    handleClickLoadMore(state, dispatch);
  }, []);

  return (
    <ValuesContext.Provider value={{ state, dispatch, handleClickLoadMore }}>
      <div className="wrapper px-5 w-full relative">
        <Routes>
          <Route
            path="/unplash-photo"
            element={<ListsPhoto photos={state.photos} />}
          ></Route>
          <Route path="/unplash-photo/liked" element={<Liked />}></Route>
        </Routes>
        <div className="fixed bottom-0 left-0 w-full flex items-center justify-center mb-[20px] z-1000000">
          <div className="bg-[#ccc] bg-opacity-70 px-5 py-2 flex items-center justify-center gap-[20px] text-grey rounded-lg">
            <Link to="/unplash-photo">
              <HomeIcon></HomeIcon>
            </Link>
            <Link to="/unplash-photo/liked">
              <FavoriteIcon></FavoriteIcon>
            </Link>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </ValuesContext.Provider>
  );
}

export default App;
