import React, { useEffect, useState } from "react";
import { isServer } from "../utils/utils";

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState(() => {
    if (isServer()) return { width: 0, height: 0 };
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
