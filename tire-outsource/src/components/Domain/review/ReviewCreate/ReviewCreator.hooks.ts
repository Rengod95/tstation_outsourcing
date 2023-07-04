import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiApi, Review } from "@/utils/api";
import { queryClient } from "@/pages/_app";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
export const useCreateNewReview = () => {
  const toast = useToast();
  const router = useRouter();
  const { mutate } = useMutation({
    mutationKey: ["review", "create"],
    mutationFn: async (review: Review) => {
      const formData = new FormData();
      formData.append("tire_id", review.tireId.toString());
      formData.append("nickname", review.nickname);
      formData.append("password", review.password);
      formData.append("phone_number", review.phoneNumber);
      formData.append("title", review.title);
      formData.append("content", review.content);
      formData.append("rating", review.rating.toString());

      try {
        const result = await fetch(
          "https://backend.tirenautomobile.com/api/v1/reviews/",
          {
            method: "POST",
            body: formData,
          }
        );
        console.log(result);
        return result;
      } catch (e) {
        throw new Error("후기글 생성 도중 에러 발생");
      }
    },
    onSuccess: async () => {
      toast({
        title: "후기글 등록 성공",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      await queryClient.refetchQueries(["review"]);
      await router.push("/review");
    },
    onError: async () => {
      toast({
        title: "리뷰 등록 실패",
        description:
          "일시적인 오류로 후기글 작성에 실패했습니다. 다시 시도해주세요.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      // await router.push("/review");
    },
  });

  return mutate;
};
