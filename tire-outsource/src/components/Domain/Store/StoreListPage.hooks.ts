import { useQuery } from "@tanstack/react-query";
import { ApiApi } from "@/utils/api";

export const useGetStoreList = () => {
  return useQuery({
    queryKey: ["store"],
    queryFn: async () => {
      const api = new ApiApi();
      const result = await api.listStores();
      return result;
    },
  });
};
