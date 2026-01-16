import { useState, useEffect } from "react";

export const useDeviceType = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window;

      const isMobile = innerWidth < 768;

      setIsMobile(isMobile);
      setIsDesktop(!isMobile);
    };

    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isMobile, isDesktop };
};
