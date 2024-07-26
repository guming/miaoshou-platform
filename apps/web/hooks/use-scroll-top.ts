import React, { useEffect, useState } from "react";

const useScrollTop = (treshold = 10) => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > treshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", scrollHandler);

    return () => window.removeEventListener("scroll", scrollHandler);
  }, [treshold]);
  return scrolled
};

export default useScrollTop;
