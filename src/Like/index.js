import React, { memo, useContext, useEffect, useRef, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link } from "react-router-dom";
import { ValuesContext } from "../App";
import axios from "../axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import { setLikePhotoLists, setLoadingState } from "../state";
import { handleScroll } from "../handleScroll";

function Liked() {
  const { state, dispatch } = useContext(ValuesContext);
  const [photoLiked, setLikedPhoto] = useState([]);
  const photosIDs = state.likedPhotoIDs;
  let handleFetchLikePhoto = useRef();
  const header = useRef();

  //UseEffect
  useEffect(() => {
    try {
      handleFetchLikePhoto(photosIDs, dispatch);
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
    document.addEventListener("scroll", scroll);
    return () => {
      document.removeEventListener("scroll", scroll);
      window.scrollTo(0, 0);
    };
  }, []);

  //Function

  handleFetchLikePhoto = (photosIDs) => {
    dispatch(setLoadingState(true));
    const promises = photosIDs.map(async (id) => {
      const request = await axios(`/photos/${id}`);
      return request.data;
    });
    Promise.all(promises).then((data) => {
      setLikedPhoto(data);
      dispatch(setLoadingState(false));
    });
  };

  function scroll() {
    handleScroll(header.current);
  }
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
      <Link to="/unplash-photo">
        <div
          ref={header}
          className=" py-[25px] px-3 fixed top-0 left-0 w-full z-50 bg-transparent flex items-center justify-between transition-all delay-300 ease-in  "
        >
          <ChevronLeftIcon sx={{ fontSize: "30px" }} />
          <span className="font-body font-bold text-[25px]">
            Image you've <FavoriteIcon sx={{ color: "red" }} />
          </span>
        </div>
      </Link>
      <div className="flex items-center justify-center mt-[100px]">
        {state.isLoading ? (
          <div className=" w-[20px] h-[20px]">
            <span className="block w-full h-full border-solid border-2 border-black border-t-transparent rounded-full animate-spin "></span>
          </div>
        ) : (
          <div className="photos  grid md:grid-cols-2 gap-10 mb-[30px]">
            {console.log(photoLiked)}
            {photoLiked.length <= 0 ? (
              <span>"YOU STILL NOT HEART ANY POST YET"</span>
            ) : (
              photoLiked.map((photo) => {
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
                    <div className="absolute left-0 bottom-0 flex flex-col justify-center bg-[#f3f5f7] w-full h-[90px] px-7 ">
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
                          <IconButton
                            onClick={() => handleClickHeart(photo.id)}
                          >
                            <FavoriteIcon sx={{ color: "red" }} />
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default memo(Liked);
