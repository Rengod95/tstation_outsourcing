import { useRef } from "react";

export const useScroll = () => {
  const targetRef = useRef<HTMLDivElement>();

  const scrollToTarget = () => {
    if (targetRef.current) {
      targetRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return {
    targetRef,
    scrollToTarget,
  };
};
