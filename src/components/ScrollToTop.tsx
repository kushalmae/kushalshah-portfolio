import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      let attempts = 0;
      let timeout: number | undefined;

      const scrollToHash = () => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ block: "start" });
          return;
        }

        if (attempts < 20) {
          attempts += 1;
          timeout = window.setTimeout(scrollToHash, 50);
          return;
        }

        window.scrollTo(0, 0);
      };

      scrollToHash();
      return () => {
        if (timeout) window.clearTimeout(timeout);
      };
    }

    window.scrollTo(0, 0);
  }, [hash, pathname]);
  return null;
};

export default ScrollToTop;
