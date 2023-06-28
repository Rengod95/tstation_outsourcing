import React from "react";
import {
  Flex,
  Heading,
  Image,
  Center,
  useBreakpointValue,
  Box,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
} from "@chakra-ui/react";
import Head from "next/head";

export type BannerProps = {
  imgUrl?: string;
};

export const Banner = ({ imgUrl }: BannerProps) => {
  const imageSize = useBreakpointValue({
    md: "35rem",
    sm: "15rem",
  });
  return (
    <Flex
      w={"100%"}
      minH={"20rem"}
      justify={"center"}
      align="center"
      position={"relative"}
    >
      <Center
        top={"50%"}
        left={"50%"}
        position={"absolute"}
        transform={"translate(-50%, -50%)"}
      >
        <Heading size={"4xl"} color={"teal"}>
          내 주변 지점
        </Heading>
      </Center>
      <Image
        w={"100%"}
        h={imageSize}
        src={
          imgUrl ??
          "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
        }
        alt={"배너이미지"}
      />
    </Flex>
  );
};

export type CTAProps = {
  title?: string;
  titleHighlight?: string;
  content?: string;
  buttonText: string;
  buttonClickCallback: (...args: any) => void;
};
export const CallToActionWithAnnotation = ({
  title,
  titleHighlight,
  content,
  buttonText,
  buttonClickCallback,
}: CTAProps) => {
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
          <Stack
            direction={"column"}
            spacing={3}
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
            >
              {buttonText}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Flex>
  );
};
