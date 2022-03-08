import React, { memo } from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

function ListsPhoto({ photos }) {
  return (
    <>
      <div className="photos  grid md:grid-cols-2  gap-10 ">
        {photos.map((photo) => {
          console.log(photo);
          return (
            <div
              key={photo.id}
              id={photo.id}
              className="relative h-[600px] lg:h-[800px] rounded-[30px] overflow-hidden  shadow-lg shadow-[#ccc] "
            >
              <img
                src={photo?.urls.regular}
                className="h-full w-full object-cover cursor-pointer rounded-[30px]"
                alt={`${photo?.user.first_name}`}
              ></img>
              <div className="absolute left-0 bottom-0 flex flex-col justify-center bg-[#f3f5f7] w-full h-[90px]  z-10 px-7 ">
                {/* <h2 className="font-body font-bold text-[16px] mb-3">
                  {photo.author}
                </h2> */}
                <div className="flex items-center justify-between ">
                  <div className="flex items-center">
                    <img
                      src={photo?.user?.profile_image.medium}
                      alt="avatar"
                      className="inline-block w-[40px] h-[40px] object-cover rounded-full mr-3 "
                    />
                    <span className="font-body text-[15px] font-bold">
                      {photo?.user.first_name}
                    </span>
                  </div>
                  <div className="cursor-pointer text-[23px]">
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Button></Button>
    </>
  );
}

export default memo(ListsPhoto);
