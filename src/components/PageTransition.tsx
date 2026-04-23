import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [displayed, setDisplayed] = useState(children);
  const [stage, setStage] = useState<"in" | "out">("in");
  const [pathKey, setPathKey] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname === pathKey) return;
    setStage("out");
    const t = window.setTimeout(() => {
      setDisplayed(children);
      setPathKey(location.pathname);
      setStage("in");
    }, 180);
    return () => window.clearTimeout(t);
  }, [location.pathname, children, pathKey]);

  useEffect(() => {
    if (location.pathname === pathKey) setDisplayed(children);
  }, [children, location.pathname, pathKey]);

  return (
    <div
      key={pathKey}
      className={
        stage === "in"
          ? "animate-page-in"
          : "animate-page-out"
      }
    >
      {displayed}
    </div>
  );
};

export default PageTransition;
