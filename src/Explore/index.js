import React, { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
function Explore() {
  return (
    <div className="my-10 flex items-center justify-between p-3 pt-[90px]">
      <h1 className="font-body font-bold text-[25px] ">Image You've Liked</h1>
      <div className="cursor-pointer">
        <FontAwesomeIcon icon={faAngleRight} />
      </div>
    </div>
  );
}

export default memo(Explore);
