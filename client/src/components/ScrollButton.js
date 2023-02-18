import React from "react";

const ScrollButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      title="Về đầu trang"
      className="z-90 bottom-8 right-8 border-0 w-12 h-12 rounded-full drop-shadow-md bg-indigo-500 text-white text-3xl font-bold"
    >
      &uarr;
    </button>
  );
};

export default ScrollButton;
