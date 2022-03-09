import React, { useContext } from "react";
import { ValuesContext } from "../../App.js";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
function Button() {
  const { state, dispatch, handleClickLoadMore } = useContext(ValuesContext);
  function handleClickButton() {
    handleClickLoadMore(state, dispatch);
  }
  return (
    <div className="text-center flex items-center justify-center mt-10">
      <button
        onClick={handleClickButton}
        className=" flex flex-col  items-center justify-center mb-5 bg-primary bg-opacity-50 text-white hover:bg-opacity-100 px-5 py-5 rounded-full shadow transition-all duration-700 ease-in font-body  "
      >
        {state.isLoading ? (
          <span className="block w-[20px] h-[20px] border-solid border-2 border-white border-t-transparent rounded-full animate-spin "></span>
        ) : (
          <ExpandCircleDownIcon></ExpandCircleDownIcon>
        )}
      </button>
    </div>
  );
}

export default Button;
