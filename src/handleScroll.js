export const handleScroll = (element) => {
  if (element) {
    if (window.scrollY > 50) {
      element.classList.remove("bg-transparent");
      element.classList.add("bg-white");
    } else {
      element.classList.add("bg-transparent");
      element.classList.remove("bg-white");
    }
  }
};
