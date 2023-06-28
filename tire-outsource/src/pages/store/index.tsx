import React from "react";
import { Box, Center, Flex, Divider, Heading } from "@chakra-ui/react";
import { StoreListItem } from "@/components/Domain/Store/StoreListItem/StoreListItem";
import { CallToActionWithAnnotation, Banner } from "@/components/UI/Banner";
import { useScroll } from "@/utils/hooks/useScroll";
import { useGetStoreList } from "@/components/Domain/Store/StoreListPage.hooks";
import ReviewListItem from "@/components/Domain/review/ReviewListItem";
import { ReviewSearchBar } from "@/components/Domain/review/ReviewSearchBar";

const StorePage = () => {
  const { targetRef, scrollToTarget } = useScroll();
  const { data, status } = useGetStoreList();

  const RenderedStoreList = () => {
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
          data.map((item) => {
            return <StoreListItem {...item} key={item.id} />;
          })}
      </>
    );
  };

  return (
    <Box>
      <CallToActionWithAnnotation
        content={"내용 테스트내용 테스트내용 테스트내용 테스트내용 테스트"}
        buttonText={"지점 찾으러 가기"}
        buttonClickCallback={scrollToTarget}
      />
      <Flex
        h={"xs"}
        ref={targetRef}
        align={"center"}
        flexFlow={"column"}
        justify={"center"}
      >
        <Flex mt={12}>
          <Heading size={"4xl"}>내 주변 지점 목록</Heading>
        </Flex>
      </Flex>
      <Divider orientation="horizontal" />
      <Flex flexFlow={"column"}>
        <RenderedStoreList />
      </Flex>
    </Box>
  );
};

export default StorePage;
