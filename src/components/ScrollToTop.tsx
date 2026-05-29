import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // We use a small timeout to ensure the DOM has updated and
    // to work correctly with smooth scrolling libraries like Lenis
    const handleScroll = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant" as ScrollBehavior
      });
      document.documentElement.scrollTo(0, 0);
      document.body.scrollTo(0, 0);
    };

    handleScroll();
    
    // Sometimes one call is not enough during route transitions
    const timeoutId = setTimeout(handleScroll, 10);
    const timeoutId2 = setTimeout(handleScroll, 100);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
