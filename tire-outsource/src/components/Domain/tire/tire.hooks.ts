import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ApiApi, Car, Tire } from "@/utils/api";
import { useRecoilState } from "recoil";
import {
  carManufacturerListState,
  tireManufacturerListState,
  tireSizeListState,
} from "@/state/state.tire";

export const useGetTireInfomations = () => {};

export const useGetTireList = () => {
  const [tireManufacturers, setTIreManufacturers] = useRecoilState(
    tireManufacturerListState
  );
  const [tireSizeList, setTireSizeList] = useRecoilState(tireSizeListState);
  return useQuery<Tire[]>({
    queryKey: ["tire"],
    queryFn: async () => {
      const api = new ApiApi();
      const result = await api.listTires();
      console.log(result);
      return result;
    },
    onSuccess: (data) => {
      const res: string[] = [];
      data.forEach((tire) =>
        tire.sizes.forEach((size) => res.push(size.tireSize))
      );
      const resSet = new Set(res);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setTireSizeList([...resSet]);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore

      setTIreManufacturers(
        Array.from(
          new Set(data.map((tire) => JSON.stringify(tire.manufacturer)))
        ).map((tire) => JSON.parse(tire))
      );
    },
  });
};

export const useGetCarList = () => {
  const [_, setCarManufacturerList] = useRecoilState(carManufacturerListState);
  return useQuery<Car[]>({
    queryKey: ["car"],
    queryFn: async () => {
      const api = new ApiApi();
      const result = await api.listCars();
      return result;
    },
    onSuccess: (data) => {
      setCarManufacturerList(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        [...new Set(data.map((car) => car.manufacturerName))]
      );
    },
  });
};
