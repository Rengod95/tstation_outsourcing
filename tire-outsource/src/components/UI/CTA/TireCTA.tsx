import { CTAProps } from "@/components/UI/Banner";
import { Box, Container, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import SearchBar from "@/components/Domain/tire/Search/SearchBar";

export const TireCTA = ({ title, titleHighlight, content }: CTAProps) => {
  return (
    <Flex
      bgColor={"gray.100"}
      h={{ base: "3xl", md: "3xl", sm: "3xl" }}
      align={"center"}
    >
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Container maxW={"5xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 10, md: 15, sm: 10 }}
          p={{ base: 10, md: 10 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "6xl", sm: "6xl", md: "7xl" }}
            lineHeight={"110%"}
            w={"100%"}
          >
            {title ?? "기본 제목기본 제목기본 제목"} <br />
            <Text as={"span"} color={"green.400"} fontSize={"5xl"}>
              {titleHighlight ?? "기본 하이라이트"}
            </Text>
          </Heading>
          <Text
            color={"gray.500"}
            fontSize={{ base: "2xl", sm: "2xl", md: "2xl" }}
            w={"100%"}
          >
            {content ??
              "기본 부연설명 공간기본 부연설명 공간기본 부연설명 공간기본 부연설명 공간"}
          </Text>
          <Flex
            direction={"row"}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
            mt={"10%"}
            w={"100%"}
          >
            <Box
              bgColor={"white"}
              h={"5rem"}
              w={"100%"}
              boxShadow={"lg"}
              borderRadius={"lg"}
            >
              <SearchBar></SearchBar>
            </Box>
          </Flex>
        </Stack>
      </Container>
    </Flex>
  );
};
