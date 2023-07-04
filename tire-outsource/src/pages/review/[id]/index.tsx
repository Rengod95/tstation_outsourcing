import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { ApiApi, Review } from "@/utils/api";
import {
  Box,
  Flex,
  Image,
  Text,
  Spacer,
  Badge,
  useMediaQuery,
  Heading,
  Button,
} from "@chakra-ui/react";
import { StarRating } from "@/components/Domain/review/ReviewListItem";
import { useRouter } from "next/router";

const ReviewDetailPage = ({ rating, title, image, content, tire }: Review) => {
  const [isMobile] = useMediaQuery("(max-width: 480px)");
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

  return (
    <Flex
      p={4}
      align={"center"}
      justify={"start"}
      h={"auto"}
      flexDirection={"column"}
      w={isMobile ? "100%" : "4xl"}
      overflowY="scroll"
      margin={"0 auto"}
      borderLeftWidth={"1px"}
      borderRightWidth={"1px"}
      bgColor={"white"}
      boxShadow={"lg"}
    >
      <Image
        w={"100%"}
        minH={"300px"}
        src={
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          image as string
        }
        alt={title}
      />

      <Flex mt={5} align="center">
        <Heading fontSize="4xl" fontWeight="700" mr={1}>
          {title}
        </Heading>
      </Flex>
      <Text mt={4} fontSize={"xl"} ml={1} mb={8}>
        {content ?? "후기글 본문"}
      </Text>
      <Flex
        mt={2}
        align="center"
        justify={"start"}
        flexFlow={"column"}
        w={"100%"}
      >
        <Flex
          w={"100%"}
          flexFlow={"row"}
          flexWrap={"wrap"}
          align="center"
          justify={"start"}
          mb={4}
          ml={3}
        >
          <Badge colorScheme="green" fontSize="xl" mr={4}>
            모델명 : {tire?.modelName}
          </Badge>
        </Flex>
        <Flex flexFlow={"row"} flexWrap={"wrap"} w={"100%"}>
          <StarRating rating={rating ?? 3} />
        </Flex>
      </Flex>
      <Box w={isMobile ? "100%" : "4xl"} overflow="hidden" p={4}>
        <Button
          w={"100%"}
          h={"4rem"}
          bgColor={"green.400"}
          boxShadow={"base"}
          color={"white"}
          fontSize={"3xl"}
          onClick={() => {
            router.back();
          }}
        >
          뒤로가기
        </Button>
      </Box>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params;

  if (!params || typeof params.id !== "string") {
    return { props: { initialData: null } };
  }

  const id = params.id;

  try {
    const api = new ApiApi();
    const result = await api.retrieveReview({ id: id });

    return { props: JSON.parse(JSON.stringify(result)) };
  } catch (error) {
    throw new Error("데이터 패칭 중 에러 발생");
  }
};
export default ReviewDetailPage;
