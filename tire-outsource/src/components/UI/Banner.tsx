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
  useMediaQuery,
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
  buttonText?: string;
  buttonClickCallback?: (...args: any) => void;
};
export const CallToActionWithAnnotation = ({
  title,
  titleHighlight,
  content,
  buttonText,
  buttonClickCallback,
}: CTAProps) => {
  const [isMobile] = useMediaQuery("(max-width: 480px)");
  return (
    <Flex
      h={{ base: "5xl", md: "5xl", sm: "5xl" }}
      align={"center"}
      bgImage={"url(/store_banner.png)"}
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

      <Container maxW={"6xl"}>
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
            {title ?? "당신을 위한 완벽한 타이어 파트너"} <br />
          </Heading>
          <Text
            as={"span"}
            color={"green.400"}
            fontWeight={700}
            fontSize={isMobile ? "4xl" : "5xl"}
          >
            {titleHighlight ??
              "최고의 장비와 서비스로 유명한 장착점을 모았습니다. "}
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
