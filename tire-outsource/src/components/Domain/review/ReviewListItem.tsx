import React from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  useColorModeValue,
  chakra,
  Icon,
  useBreakpointValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { InfoIcon, TimeIcon } from "@chakra-ui/icons";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/router";

export type ReviewListItemProps = {
  title?: string;
  model?: string;
  createdAt?: Date;
  thumbnail?: string;
  starRating?: number;
  id: number;
};

const ReviewListItem = ({
  title,
  model,
  thumbnail,
  createdAt,
  starRating,
  id,
}: ReviewListItemProps) => {
  const router = useRouter();
  const [isPC] = useMediaQuery("(max-width: 768px)");
  return (
    <Container maxW={"7xl"} p="12" minH={"30rem"}>
      <Box
        display="flex"
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent="space-between"
        boxShadow={"lg"}
        borderRadius="2xl"
      >
        <Box
          display="flex"
          flex="1"
          position="relative"
          alignItems="center"
          ml={{ lg: "4%", md: "4%", sm: 0 }}
          pl={{ base: 10, xs: 0, sm: 10 }}
        >
          <Box
            width={{ base: "100%" }}
            zIndex="2"
            marginLeft={{ md: 4, sm: 0 }}
          >
            <Image
              borderRadius="lg"
              ml={isPC ? "4%" : 0}
              maxH={"sm"}
              minH={"sm"}
              src={
                thumbnail ??
                "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
              }
              alt="some good alt text"
              objectFit="cover"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="space-between"
          minH={"100%"}
          marginTop="3%"
          pl={"4%"}
          pr={"4%"}
          marginBottom={"3%"}
        >
          <Heading
            _hover={{ textDecoration: "none" }}
            fontSize={"5xl"}
            textDecoration="none"
          >
            {title ?? "후기글 제목"}
          </Heading>
          <Text
            as="p"
            marginTop="1%"
            color={useColorModeValue("gray.700", "gray.200")}
            fontSize="3xl"
            fontWeight={"500"}
          >
            모델명 : {model ?? "제품 모델 명"}
          </Text>
          <Flex flexFlow={"row"} flexWrap={"wrap"} w={"100%"} mt={"1.5%"}>
            <StarRating rating={starRating ?? 3} />
          </Flex>
          <Flex flexFlow={"row"} flexWrap={"wrap"} w={"100%"} mt={"3%"}>
            <Center mr={"2%"}>
              <TimeIcon w={{ base: 7, sm: 6 }} h={{ base: 7, sm: 6 }} />
            </Center>
            <Text fontWeight="bold" align={"center"} fontSize="xl">
              {createdAt?.toDateString() ?? new Date().toDateString()}
            </Text>
          </Flex>
          <Button
            bgColor={"green.400"}
            w={"100%"}
            h={{ base: "4rem", sm: "4rem" }}
            mt={"4%"}
            fontSize={"2xl"}
            color={"white"}
            boxShadow={"base"}
            onClick={() => {
              router.push(`/review/${id}`);
            }}
          >
            상세보기
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export type StarRatingProps = {
  rating: number;
};
export const StarRating = ({ rating }: StarRatingProps) => {
  const fulled = Array.from({ length: rating }, (_, idx) => {
    return <Icon as={FaStar} key={idx} w={"2rem"} h={"2rem"} color={"gold"} />;
  });
  const empty = Array.from({ length: 5 - rating }, (_, idx) => {
    return (
      <Icon as={FaStar} key={idx} color={"gray.300"} w={"2rem"} h={"2rem"} />
    );
  });

  return (
    <Flex align={"center"} display={"inline-flex"}>
      {...fulled}
      {...empty}
    </Flex>
  );
};

export default ReviewListItem;
