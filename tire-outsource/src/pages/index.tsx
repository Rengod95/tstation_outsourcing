import Head from "next/head";
import { Inter } from "next/font/google";
import { CaptionCarousel } from "@/components/UI/Carousel/Carousel";
import { Box, Divider, Flex, Heading, useMediaQuery } from "@chakra-ui/react";
import TireListItem from "@/components/Domain/tire/TireListItem";
import React, { useEffect } from "react";
import { useGetTireList } from "@/components/Domain/tire/tire.hooks";

const inter = Inter({ subsets: ["latin"] });

import { IconButton } from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { useScroll } from "@/utils/hooks/useScroll";

export default function Home() {
  const { data: tireList, status: tireListStatus } = useGetTireList();
  const [isMobile] = useMediaQuery("(max-width: 480px)");
  const { targetRef, scrollToTarget } = useScroll();

  useEffect(() => {
    scrollToTarget();
  }, []);

  return (
    <Box>
      <div data-nextjs-scroll-focus-boundary />
      <Head>
        <title>TireN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div ref={targetRef}></div>
      <CaptionCarousel></CaptionCarousel>
      <Divider />
      <Box bgColor={"white"}>
        <Flex h={"2xs"} align={"center"} flexFlow={"column"}>
          <Flex
            mt={12}
            h={"100%"}
            w={"100%"}
            justify={"center"}
            align={"center"}
          >
            <Heading size={"4xl"}>타이어 목록</Heading>
          </Flex>
        </Flex>
        <Flex
          w={"100%"}
          gap={{ sm: 4, base: 8, md: 12 }}
          p={20}
          flexWrap={"wrap"}
          justify={isMobile ? "center" : "space-around"}
          maxW={"1024px"}
          m={"0 auto"}
        >
          {tireListStatus === "success" &&
            tireList.map((tire) => {
              return <TireListItem key={tire.id} tire={tire}></TireListItem>;
            })}
        </Flex>
      </Box>
    </Box>
  );
}
