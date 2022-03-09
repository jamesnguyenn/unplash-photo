import axios from "./axios";
import { setLoadingState, setPageURL, setPhotos } from "./state";

export function handleClickLoadMore(state, dispatch) {
  try {
    async function getPhotos(state) {
      dispatch(setLoadingState(true));

      const request = await axios.get("/search/photos", {
        params: {
          query: state.input,
          page: state.page,
          per_page: 8,
        },
      });
      dispatch(setPhotos(request.data.results));
      dispatch(setPageURL());
      dispatch(setLoadingState(false));
      return request;
    }
    getPhotos(state);
  } catch (e) {
    console.log(e);
  }
}
