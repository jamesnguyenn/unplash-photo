import React from "react";
import instance from "../axios";
const array = ["vcu-OZBxxRk", "8MhejqEghLk", "rem9J638fPs"];
const promise = [];

function Likes() {
  for (let i = 0; i < array.length; i++) {
    promise.push(searchPhotoId(array[i]));
  }
  async function searchPhotoId(idURL) {
    const request = await instance(`/photos/${idURL}`);
    return request.data;
  }

  Promise.all(promise).then((results) => {
    console.log(results);
  });
  return <div>index</div>;
}

export default Likes;
