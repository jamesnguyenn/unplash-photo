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
        className=" flex items-center justify-center mb-5 bg-primary  text-white px-3 py-3 rounded-full shadow transition-all duration-700 ease-in font-body animate-bounce "
      >
        {state.isLoading ? (
          <span className="block w-[20px] h-[20px] border-solid border-2 border-white border-t-transparent rounded-full animate-spin-fast animate-2 transition-all delay-200 ease-in-out "></span>
        ) : (
          <ExpandCircleDownIcon
            className=""
            sx={{ fontSize: "30px" }}
          ></ExpandCircleDownIcon>
        )}
      </button>
    </div>
  );
}

export default Button;
