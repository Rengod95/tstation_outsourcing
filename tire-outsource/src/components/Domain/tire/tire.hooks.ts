import { useQuery } from "@tanstack/react-query";
import { ApiApi } from "@/utils/api";

export const useGetTireList = () => {
  return useQuery({
    queryKey: ["tire"],
    queryFn: async () => {
      const api = new ApiApi();
      const result = await api.listTires();
      return result;
    },
  });
};
