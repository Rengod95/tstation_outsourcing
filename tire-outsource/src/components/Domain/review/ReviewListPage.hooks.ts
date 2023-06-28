import { useQuery } from "@tanstack/react-query";
import { ApiApi } from "@/utils/api";

export const useGetReviewList = () => {
  return useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const api = new ApiApi();
      const result = await api.listReviews();
      return result;
    },
  });
};
