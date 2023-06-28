import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";

import { CTAProps } from "@/components/UI/Banner";
import { useRouter } from "next/router";

export const ReviewCTA = ({
  title,
  titleHighlight,
  content,
  buttonText,
  buttonClickCallback,
}: CTAProps) => {
  const router = useRouter();

  const handleForwardReviewCreate = () => {
    // 특정 경로로 이동
    router.push("/review/create");
  };

  return (
    <Flex
      bgColor={"gray.100"}
      h={{ base: "5xl", md: "5xl", sm: "5xl" }}
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
            <Button
              colorScheme={"green"}
              onClick={buttonClickCallback}
              bg={"green.400"}
              w={"50%"}
              h={{ base: "4rem" }}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "green.500",
              }}
              fontSize={"2xl"}
              mr={"5%"}
            >
              {buttonText}
            </Button>
            <Button
              colorScheme={"green"}
              bg={"green.400"}
              w={"50%"}
              h={{ base: "4rem" }}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "green.500",
              }}
              fontSize={"2xl"}
              onClick={handleForwardReviewCreate}
            >
              장착 후기 작성하기
            </Button>
          </Flex>
        </Stack>
      </Container>
    </Flex>
  );
};

export default ReviewCTA;
