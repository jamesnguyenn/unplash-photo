import React, { memo, useContext } from 'react';
import Button from './Button';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@mui/material';
import Explore from '../Explore';
import Nav from '../Nav';
import { ValuesContext } from '../App';
import { setLikePhotoLists } from '../state';

function ListsPhoto({ photos }) {
    const { state, dispatch } = useContext(ValuesContext);
    const photosIDs = state.likedPhotoIDs;

    function handleClickHeart(id) {
        if (!photosIDs.find((ele) => ele === id)) {
            dispatch(setLikePhotoLists([...photosIDs, id]));
            localStorage.setItem(
                'postID-liked',
                JSON.stringify([...photosIDs, id])
            );
        } else {
            const index = photosIDs.findIndex((ele) => ele === id);
            const [...newActiveHeart] = photosIDs;
            newActiveHeart.splice(index, 1);
            dispatch(setLikePhotoLists([...newActiveHeart]));
            localStorage.setItem(
                'postID-liked',
                JSON.stringify([...newActiveHeart])
            );
        }
    }
    return (
        <>
            <Nav />
            <Explore />

            <div className="photos  grid md:grid-cols-2 xl:grid-cols-4  gap-10 ">
                {photos.map((photo, index) => {
                    return (
                        <div
                            key={photo.id}
                            id={photo.id}
                            className="relative h-[500px] xl:h-[400px] rounded-[30px] overflow-hidden  shadow-lg shadow-[#ccc] "
                        >
                            <img
                                src={photo?.urls.regular}
                                className="h-full w-full object-cover cursor-pointer rounded-[30px]"
                                alt={`${photo?.user.first_name}`}
                            ></img>
                            <div className="absolute left-0 bottom-0 flex flex-col justify-center bg-[#f3f5f7] w-full h-[90px]  px-7 ">
                                {/* <h2 className="font-body font-bold text-[16px] mb-3">
                  {photo.author}
                </h2> */}
                                <div className="flex items-center justify-between ">
                                    <div className="flex items-center">
                                        <img
                                            src={
                                                photo?.user?.profile_image
                                                    .medium
                                            }
                                            alt="avatar"
                                            className="inline-block w-[40px] h-[40px] object-cover rounded-full mr-3 "
                                        />
                                        <span className="font-body text-[15px] font-bold">
                                            {photo?.user.first_name}
                                        </span>
                                    </div>
                                    <div className="cursor-pointer text-[23px] ">
                                        <IconButton
                                            onClick={() =>
                                                handleClickHeart(photo.id)
                                            }
                                        >
                                            {photosIDs.find(
                                                (ele) => ele === photo.id
                                            ) ? (
                                                <FavoriteIcon
                                                    sx={{ color: 'red' }}
                                                />
                                            ) : (
                                                <FavoriteBorderIcon />
                                            )}
                                        </IconButton>
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
