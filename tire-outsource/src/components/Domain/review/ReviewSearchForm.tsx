import React from "react";
import { useRecoilState } from "recoil";
import { useForm, Controller } from "react-hook-form";
import reviewSearchState from "@/state/state.reviewSearchConfig";
import {
  Select,
  FormControl,
  Input,
  Button,
  FormLabel,
  Container,
} from "@chakra-ui/react";
import { DevTool } from "@hookform/devtools";

export type ReviewSearchFormProps = {
  submitCallback?: (...args: any) => void;
};

const ReviewSearchForm = ({ submitCallback }: ReviewSearchFormProps) => {
  const [search, setSearch] = useRecoilState(reviewSearchState);
  const { control, handleSubmit } = useForm();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const onSubmit = (data) => {
    setSearch(data);
    submitCallback?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl mt={4}>
        <FormLabel fontSize={"3xl"}>검색 종류</FormLabel>
        <Controller
          name="type"
          control={control}
          defaultValue={"model"}
          render={({ field }) => (
            <Select
              {...field}
              mt={4}
              minH={{ base: "4rem", sm: "4rem" }}
              fontSize={"2xl"}
              fontWeight={500}
            >
              <option value="model">모델명</option>
              <option value="title">후기글 제목</option>
              <option value="content">후기글 내용</option>
            </Select>
          )}
        />
        <FormLabel fontSize={"3xl"} mt={4}>
          키워드
        </FormLabel>
        <Controller
          name="keyword"
          control={control}
          defaultValue={search.keyword}
          render={({ field }) => (
            <Input
              minH={{ base: "4rem", sm: "4rem" }}
              type="text"
              required={true}
              fontSize={"2xl"}
              fontWeight={500}
              minLength={2}
              {...field}
              placeholder="검색어를 입력해주세요."
            />
          )}
        />
      </FormControl>
      <Container w={"100%"} h={"5rem"} p={2} mb={20}>
        <Button
          type="submit"
          mt={12}
          w={"100%"}
          h={"100%"}
          bgColor={"green.400"}
          boxShadow={"lg"}
          fontSize={"3xl"}
          fontWeight={600}
          borderRadius={"full"}
          color={"white"}
        >
          검색
        </Button>
      </Container>
      <DevTool control={control} />
    </form>
  );
};

export default ReviewSearchForm;
