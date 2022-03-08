import {
  SET_PHOTO_LISTS,
  SET_PAGE_URL,
  SET_LOADING_STATE,
  SET_INPUT_VALUE,
  SET_SEARCH_PHOTO_LISTS,
} from "./constants";
export function setPhotos(payload) {
  return {
    type: SET_PHOTO_LISTS,
    payload,
  };
}

export function setPageURL() {
  return {
    type: SET_PAGE_URL,
  };
}

export function setLoadingState(payload) {
  return {
    type: SET_LOADING_STATE,
    payload,
  };
}

export function setInputValue(payload) {
  return {
    type: SET_INPUT_VALUE,
    payload,
  };
}

export function setSearchPhotoLists(payload) {
  return {
    type: SET_SEARCH_PHOTO_LISTS,
    payload,
  };
}
