import React, { memo, useContext, useEffect, useRef, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link } from "react-router-dom";
import { ValuesContext } from "../App";
import axios from "../axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import { setLikePhotoLists } from "../state";

function Liked() {
  const { state, dispatch } = useContext(ValuesContext);
  const [photoLiked, setLikedPhoto] = useState([]);
  const photosIDs = state.likedPhotoIDs;
  let handleFetchLikePhoto = useRef();

  handleFetchLikePhoto = (photosIDs) => {
    const promises = photosIDs.map(async (id) => {
      const request = await axios(`/photos/${id}`);
      return request.data;
    });
    Promise.all(promises).then((data) => {
      setLikedPhoto(data);
    });
  };

  useEffect(() => {
    try {
      handleFetchLikePhoto(photosIDs);
    } catch (err) {
      console.log(err);
    }
  }, []);

  function handleClickHeart(id) {
    if (!photosIDs.find((ele) => ele === id)) {
      dispatch(setLikePhotoLists([...photosIDs, id]));
      localStorage.setItem("postID-liked", JSON.stringify([...photosIDs, id]));
    } else {
      const index = photosIDs.findIndex((ele) => ele === id);
      const [...newActiveHeart] = photosIDs;
      newActiveHeart.splice(index, 1);
      dispatch(setLikePhotoLists([...newActiveHeart]));
      localStorage.setItem("postID-liked", JSON.stringify([...newActiveHeart]));
    }
  }

  return (
    <>
      <Link to="/">
        <div className=" p-[25px] fixed top-0 left-0 w-full z-50 bg-transparent items-center  ">
          <ChevronLeftIcon sx={{ fontSize: "30px" }} />
        </div>
      </Link>
      <div className="photos  grid md:grid-cols-2  gap-10 mt-[80px]">
        {photoLiked.map((photo) => {
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
                  <div className="cursor-pointer text-[23px] ">
                    <IconButton onClick={() => handleClickHeart(photo.id)}>
                      <FavoriteIcon sx={{ color: "red" }} />
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default memo(Liked);
