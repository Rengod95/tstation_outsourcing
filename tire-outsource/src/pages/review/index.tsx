import React, { RefObject, useEffect } from "react";
import { Box, Divider, Flex, Center, Heading } from "@chakra-ui/react";
import { useScroll } from "@/utils/hooks/useScroll";
import ReviewCTA from "@/components/UI/CTA/ReviewCTA";
import { ReviewSearchBar } from "@/components/Domain/review/ReviewSearchBar";
import ReviewListItem from "@/components/Domain/review/ReviewListItem";
import { useGetReviewList } from "@/components/Domain/review/ReviewListPage.hooks";
import { useRecoilState, useRecoilValue } from "recoil";
import { filteredReviewList, reviewList } from "@/state/state.reviewList";

const ReviewListPage = () => {
  const { targetRef, scrollToTarget } = useScroll();
  const { data, status } = useGetReviewList();
  const filteredReviews = useRecoilValue(filteredReviewList);
  const [reviews, setReviews] = useRecoilState(reviewList);
  useEffect(() => {
    if (data) {
      setReviews(data);
    }
  }, [data]);
  const RenderedReviewList = () => {
    return (
      <>
        {status === "loading" && (
          <Center h={"100%"} w={"100%"}>
            <Heading>데이터 로딩 중..</Heading>
          </Center>
        )}
        {status === "error" && (
          <Center h={"100%"}>
            <Heading>
              데이터 로딩 중 에러 발생.
              <br />
              새로고침 해 주세요.
            </Heading>
          </Center>
        )}
        {status === "success" &&
          filteredReviews.map((item) => {
            return (
              <ReviewListItem
                id={item.id as number}
                key={item.id}
                title={item.title}
                model={item.tire?.modelName}
                thumbnail={
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  item.image as string
                }
                createdAt={item.created}
                starRating={item.rating}
              />
            );
          })}
        {filteredReviews.length === 0 && (
          <Center fontSize={"4xl"} w={"100%"} minH={"sm"} h={"100%"}>
            해당 키워드를 포함하는 검색 결과가 존재하지 않습니다.
          </Center>
        )}
      </>
    );
  };

  return (
    <Box>
      <ReviewCTA
        title={"다양한 제품에 대한 장착후기를 만나보세요!"}
        titleHighlight={"타이어"}
        content={"내용 테스트내용 테스트내용 테스트내용 테스트내용 테스트"}
        buttonClickCallback={scrollToTarget}
        buttonText={"장착 후기 살펴보기"}
      />

      <Flex
        h={"xs"}
        ref={targetRef as RefObject<HTMLDivElement>}
        align={"center"}
        flexFlow={"column"}
        justify={"center"}
      >
        <Flex mt={12}>
          <Heading size={"4xl"}>장착 후기글 검색</Heading>
        </Flex>
        <ReviewSearchBar />
      </Flex>
      <Divider orientation="horizontal" />
      <Flex flexFlow={"column"} minH={"md"} align={"center"}>
        <RenderedReviewList />
      </Flex>
    </Box>
  );
};

export default ReviewListPage;
