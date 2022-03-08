import React, { memo, useContext, useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { makeStyles } from "@mui/styles";
import styled from "styled-components";
import { handleClickSearch } from "./handleClickSearch";
import { ValuesContext } from "../App";
import {
  setInputValue,
  setLoadingState,
  setPageURL,
  setSearchPhotoLists,
} from "../state";
import axios from "../axios";
function Nav() {
  const navBar = useRef();
  const searchWrapper = useRef();
  const searchIcon = useRef();
  const cancelIcon = useRef();
  const cancelClasses = useStyles();
  const { state, dispatch } = useContext(ValuesContext);
  const inputValue = state.input;
  useEffect(() => {
    document.addEventListener("scroll", (e) => {
      if (window.scrollY > 50) {
        navBar.current.classList.remove("bg-transparent");
        navBar.current.classList.add("bg-white");
      } else {
        navBar.current.classList.add("bg-transparent");
        navBar.current.classList.remove("bg-white");
      }
    });
  }, []);
  function handleSubmit(e) {
    e.preventDefault();

    try {
      async function getPhoto(term) {
        dispatch(setLoadingState(true));
        const request = await axios.get("/search/photos", {
          params: {
            query: term,
            page: state.page,
            per_page: 8,
          },
        });
        dispatch(setSearchPhotoLists(request.data.results));
        dispatch(setPageURL());
        dispatch(setLoadingState(false));
      }
      getPhoto(inputValue);
      window.scrollTo(0, 0);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div
      ref={navBar}
      className="flex fixed top-0 left-0 w-full z-50 bg-transparent items-center justify-between px-[30px] py-[20px] transition-all delay-300 ease-in "
    >
      {console.log("Nav render")}
      <div className="w-[40px] h-[40px]">
        <img
          className="w-full h-full object-cover"
          src="https://avatars.githubusercontent.com/u/66525324?v=4"
          alt="User Avatar"
        />
      </div>
      <SearchWrapper ref={searchWrapper}>
        <SearchWrapperInput>
          <form onSubmit={handleSubmit}>
            <input
              value={inputValue}
              type="text"
              placeholder="Search..."
              onChange={(e) => dispatch(setInputValue(e.target.value))}
            />
            <button type="submit"></button>
          </form>
        </SearchWrapperInput>
        <SearchWrapperIcon
          onClick={() => {
            handleClickSearch(searchIcon, searchWrapper, cancelIcon);
          }}
        >
          <SearchIcon ref={searchIcon} className="width-1rem text-[2.0rem]" />
          <ClearIcon ref={cancelIcon} className={cancelClasses.root} />
        </SearchWrapperIcon>
      </SearchWrapper>
    </div>
  );
}

export default memo(Nav);

const SearchWrapper = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(239 239 239);
  border-radius: 100rem;
  padding: 15px;
  transition: all 0.4s ease-in-out;
`;

const SearchWrapperInput = styled.div`
  flex: 1;

  input {
    width: 100%;
    height: 100%;
    background-color: transparent;
    font-family: "Poppins", sans-serif;
    font-size: 0.9rem;
  }
  input:hover,
  input:focus,
  input:active {
    border: none;
    background-color: transparent;
    outline: none;
  }

  button {
    display: none;
  }
`;

const SearchWrapperIcon = styled.div`
  cursor: pointer;
  width: 50px;
  height: 50px;
  position: relative;

  .MuiSvgIcon-root {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: rgb(51 51 51);
    font-size: 1.5rem;
    z-index: 5;
    transition: all 0.2s ease-in-out;
  }
`;
const useStyles = makeStyles({
  root: {
    opacity: 0,
    visibility: "hidden",
    zIndex: 1,
  },
});
