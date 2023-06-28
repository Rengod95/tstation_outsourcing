import { atom } from "recoil";

const reviewSearchState = atom<{
  type: "default" | "model" | "title" | "content";
  keyword: string;
}>({
  key: "searchState", // 고유한 ID
  default: {
    type: "default", // 기본값
    keyword: "",
  },
});

export default reviewSearchState;
