import { atom } from "recoil";
import { TireManufacturer, TireSizesInner, Car, Tire } from "@/utils/api";

export const tireManufacturerListState = atom<TireManufacturer[]>({
  key: "tireManufacturerList",
  default: [],
});

export const tireSizeListState = atom<TireSizesInner[]>({
  key: "tireSizeList",
  default: [],
});

export const carManufacturerListState = atom<string[]>({
  key: "carList",
  default: [],
});

export const tireListWithFilterState = atom<Tire[]>({
  key: "tireList",
  default: [],
});
