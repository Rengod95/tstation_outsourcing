import React, { useEffect } from "react";
import { Box, Center, Flex, Divider, Heading } from "@chakra-ui/react";
import { StoreListItem } from "@/components/Domain/Store/StoreListItem/StoreListItem";
import { CallToActionWithAnnotation, Banner } from "@/components/UI/Banner";
import { useScroll } from "@/utils/hooks/useScroll";
import { useGetStoreList } from "@/components/Domain/Store/StoreListPage.hooks";
import ReviewListItem from "@/components/Domain/review/ReviewListItem";
import { ReviewSearchBar } from "@/components/Domain/review/ReviewSearchBar";
import { useRouter } from "next/router";
import Script from "next/script";
import Head from "next/head";

const StorePage = () => {
  const { targetRef, scrollToTarget } = useScroll();
  const { data, status } = useGetStoreList();

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // When the component is unmounted, unsubscribe from the event
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

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
    <>
      {/* eslint-disable-next-line @next/next/no-script-component-in-head */}
      <Head>
        <Script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=4291dcb2d439a4b95453c1350fbca094"
        />
      </Head>
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
            <Heading size={"4xl"}>장착점 소개</Heading>
          </Flex>
        </Flex>
        <Divider orientation="horizontal" />
        <Flex flexFlow={"column"}>
          <RenderedStoreList />
        </Flex>
      </Box>
    </>
  );
};

export default StorePage;
