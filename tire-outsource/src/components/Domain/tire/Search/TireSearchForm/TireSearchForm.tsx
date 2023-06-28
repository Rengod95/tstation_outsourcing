import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Spinner,
} from "@chakra-ui/react";

import { DevTool } from "@hookform/devtools";

const TireSearchForm = () => {
  const { register, handleSubmit, watch, setValue, control, formState } =
    useForm({
      defaultValues: {
        manufacturer: "kia",
        model: "benz2",
        size: "qqq",
      },
    });
  const menufacturerSelected = watch("manufacturer");
  const modelSelected = watch("model");

  const onSubmit = (data) => {};
  console.log(formState);

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box padding={4}>
          <FormControl marginY={4}>
            <FormLabel>차량 제조사</FormLabel>
            <Select
              {...register("manufacturer")}
              onChange={(e) => setValue("manufacturer", e.target.value)}
            >
              <option key={"kia"} value={"kia"}>
                kia
              </option>
              <option key={"현대"} value={"현대"}>
                hyundai
              </option>
              <option key={"벤츠"} value={"벤츠"}>
                benz
              </option>
            </Select>
          </FormControl>

          <FormControl marginY={4}>
            <FormLabel>차종</FormLabel>
            <Select
              name={"model"}
              {...register("model")}
              onChange={(e) => setValue("model", e.target.value)}
              disabled={!menufacturerSelected}
            >
              <option key={"benz2"} value={"benz2"}>
                benz2
              </option>
              <option key={"ad"} value={"벤ff츠"}>
                benz11
              </option>
              <option key={"sdfg"} value={"벤asd츠"}>
                benzasds
              </option>
            </Select>
          </FormControl>

          <FormControl marginY={4}>
            <FormLabel>사이즈</FormLabel>
            <Select
              name="size"
              {...register("size")}
              disabled={!modelSelected}
              onChange={(e) => setValue("size", e.target.value)}
            >
              <option key={"qqq"} value={"qqq"}>
                qqq
              </option>
              <option key={"www"} value={"www"}>
                www
              </option>
            </Select>
          </FormControl>
          <Button type="submit">Submit</Button>
        </Box>
      </form>
      <DevTool control={control} />
    </Box>
  );
};

export default TireSearchForm;
