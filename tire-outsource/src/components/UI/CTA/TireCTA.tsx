import { CTAProps } from "@/components/UI/Banner";
import {
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import SearchBar from "@/components/Domain/tire/Search/SearchBar";
import TireSearchModal from "@/components/Domain/tire/Search/TireSearchForm/TireSearchModal";

export const TireCTA = ({ title, titleHighlight, content }: CTAProps) => {
  const [isMobile] = useMediaQuery("(max-width: 480px)");
  return (
    <Flex
      bgColor={"gray.100"}
      h={"auto"}
      minH={"5xl"}
      align={"center"}
      p={{ base: 10, md: 10 }}
      bgImage={"url(/tire_banner.jpeg)"}
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Container maxW={"8xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 2, md: 15, sm: 10 }}
        >
          <Heading
            fontWeight={700}
            fontSize={isMobile ? "4xl" : "5xl"}
            lineHeight={"110%"}
            w={"100%"}
          >
            {title ?? "잘 나가는 타이어만 싸-악 모았다!"} <br />
          </Heading>
          <Text
            as={"span"}
            color={"green.400"}
            fontWeight={700}
            fontSize={isMobile ? "4xl" : "5xl"}
          >
            {titleHighlight ??
              "자동차와 완벽한 조화를 이루는 타이어, 지금 찾아보세요"}
          </Text>
          <Flex
            direction={"row"}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
            mt={"10%"}
            w={"100%"}
          ></Flex>
        </Stack>
        <TireSearchModal />
      </Container>
    </Flex>
  );
};
