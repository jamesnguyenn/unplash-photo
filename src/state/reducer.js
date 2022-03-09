import {
  SET_PHOTO_LISTS,
  SET_PAGE_URL,
  SET_LOADING_STATE,
  SET_INPUT_VALUE,
  SET_SEARCH_PHOTO_LISTS,
  SET_LIKED_PHOTO_ID,
} from "./constants";
export const initialState = {
  photos: [],
  page: 1,
  input: "Vietnam",
  isLoading: false,
  likedPhotoIDs: JSON.parse(localStorage.getItem("postID-liked")) || [],
};

export const reducer = (state, actions) => {
  switch (actions.type) {
    case SET_INPUT_VALUE:
      return {
        ...state,
        input: actions.payload,
      };
    case SET_PHOTO_LISTS:
      return {
        ...state,
        photos: [...state.photos, ...actions.payload],
      };
    case SET_PAGE_URL:
      return {
        ...state,
        page: state.page + 1,
      };
    case SET_LOADING_STATE:
      return {
        ...state,
        isLoading: actions.payload,
      };
    case SET_SEARCH_PHOTO_LISTS:
      return {
        ...state,
        photos: [...actions.payload],
      };
    case SET_LIKED_PHOTO_ID:
      return {
        ...state,
        likedPhotoIDs: [...actions.payload],
      };
    default:
      throw new Error(`Invalid action ${actions.type}`);
  }
};
