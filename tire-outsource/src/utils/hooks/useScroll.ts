import { useRef } from "react";

export const useScroll = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const scrollToTarget = () => {
    if (targetRef.current) {
      targetRef.current?.scrollIntoView({ behavior: "instant" });
    }
  };

  return {
    targetRef,
    scrollToTarget,
  };
};
