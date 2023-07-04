import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  useMediaQuery,
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
  const [isMobile] = useMediaQuery("(max-width: 480px)");
  const handleForwardReviewCreate = () => {
    // 특정 경로로 이동
    router.push("/review/create");
  };

  return (
    <Flex
      bgColor={"gray.100"}
      h={{ base: "5xl", md: "5xl", sm: "5xl" }}
      align={isMobile ? "space-around" : "center"}
      bgImage={"url(/review_banner.jpeg)"}
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

      <Container maxW={"7xl"} mt={isMobile ? 200 : 0}>
        <Stack
          as={Box}
          w={"100%"}
          textAlign={"center"}
          spacing={{ base: 2, md: 15, sm: 10 }}
        >
          <Heading
            fontWeight={700}
            fontSize={isMobile ? "4xl" : "5xl"}
            lineHeight={"110%"}
            w={"100%"}
          >
            {title ?? ""} <br />
          </Heading>
          <Text
            as={"span"}
            color={"green.400"}
            w={"100%"}
            fontWeight={700}
            fontSize={isMobile ? "4xl" : "5xl"}
          >
            {titleHighlight ?? "기본 하이라이트"}
          </Text>
          <Text
            color={"gray.500"}
            fontSize={{ base: "2xl", sm: "2xl", md: "2xl" }}
            w={"100%"}
          >
            {content ?? ""}
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
