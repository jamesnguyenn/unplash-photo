export function handleClickSearch(searchIcon, searchWrapper, cancelIcon) {
  document.body.addEventListener("click", (e) => {
    if (e.target.contains(searchIcon.current)) {
      searchWrapper.current.style = "width:300px";
      searchIcon.current.style = "opacity:0;visibility:hidden;z-index:1";
      cancelIcon.current.style = "opacity:1;visibility:visible; z-index: 5";
      return () => {
        document.body.removeEventListener("click", () => {});
      };
    } else if (e.target.contains(cancelIcon.current)) {
      searchWrapper.current.style = "width:50px";
      searchIcon.current.style = "opacity:1;visibility:visible;z-index:5";
      cancelIcon.current.style = "opacity:0;visibility:hidden;z-index: 1";
      return () => {
        document.body.removeEventListener("click", () => {});
      };
    }
  });
}
