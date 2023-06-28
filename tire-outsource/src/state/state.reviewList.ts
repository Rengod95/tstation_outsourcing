import { atom, selector } from "recoil";
import { Review } from "@/utils/api";
import reviewSearchState from "@/state/state.reviewSearchConfig";

export const reviewList = atom<Review[]>({
  key: "reviewList", // 고유한 ID
  default: [],
});

// Selector to calculate derived data
export const filteredReviewList = selector({
  key: "filteredReviewList",
  get: ({ get }) => {
    const searchConfig = get(reviewSearchState);
    const reviews = get(reviewList);

    console.log(searchConfig);

    if (searchConfig.type === "model") {
      return reviews.filter((item) =>
        item.tire?.modelName.includes(searchConfig.keyword)
      );
    }

    if (searchConfig.type === "title") {
      return reviews.filter((item) => {
        item.title.includes(searchConfig.keyword);
      });
    }

    if (searchConfig.type === "content") {
      return reviews.filter((item) => {
        item.content.includes(searchConfig.keyword);
      });
    }

    return reviews;
  },
});
