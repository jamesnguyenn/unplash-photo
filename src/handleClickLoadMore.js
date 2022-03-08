import axios from "./axios";
import { setLoadingState, setPageURL, setPhotos } from "./state";

export function handleClickLoadMore(state, dispatch) {
  console.log(state.page);
  try {
    async function getRandomPhotos(state) {
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
    getRandomPhotos(state);
  } catch (e) {
    console.log(e);
  }
}
