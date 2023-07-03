import React from "react";
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Center,
  useColorModeValue,
  Container,
  Flex,
  Button,
} from "@chakra-ui/react";
import { InfoIcon, TimeIcon } from "@chakra-ui/icons";
import { Store } from "@/utils/api";

export const StoreListItem = ({
  name,
  image,
  description,
  address,
  city,
  operatingHours,
}: Store) => {
  return (
    <Container maxW={"7xl"} p="12" minH={"30rem"}>
      <Box
        display="flex"
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent="space-between"
        boxShadow={"xl"}
        borderRadius="2xl"
      >
        <Box display="flex" flex="1" position="relative" alignItems="center">
          <Box width={{ base: "100%" }} zIndex="2" h={"100%"} borderRadius="xl">
            <Image
              borderRadius="xl"
              h={"100%"}
              src={
                image ??
                "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
              }
              alt="some good alt text"
              objectFit="contain"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          h={"100%"}
          marginTop="3%"
          pl={"4%"}
          pr={"4%"}
          marginBottom={"3%"}
        >
          <Heading>
            <Link
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
              fontSize={"5xl"}
            >
              {name ?? "지점 이름"}
            </Link>
          </Heading>
          <Text
            as="p"
            marginTop="1%"
            color={useColorModeValue("gray.700", "gray.200")}
            fontSize="xl"
            fontWeight={"500"}
          >
            {description ?? "지점 한줄 소개"}
          </Text>
          <Flex flexFlow={"row"} flexWrap={"nowrap"} w={"100%"} mt={"5%"}>
            <Flex mr={"2%"} align={"start"} mt={"2px"}>
              <InfoIcon w={{ base: 7, sm: 6 }} h={{ base: 7, sm: 6 }} />
            </Flex>
            <Text
              fontWeight="bold"
              align={"center"}
              fontSize="xl"
              textAlign={"start"}
            >
              {address ?? "지점 주소"}
            </Text>
          </Flex>
          <Flex flexFlow={"row"} flexWrap={"nowrap"} w={"100%"} mt={"2%"}>
            <Flex mr={"2%"} align={"start"} mt={"2px"}>
              <TimeIcon w={{ base: 7, sm: 6 }} h={{ base: 7, sm: 6 }} />
            </Flex>
            <Text
              fontWeight="bold"
              align={"center"}
              fontSize="xl"
              textAlign={"start"}
            >
              {operatingHours ?? "지점 운영 시간"}
            </Text>
          </Flex>
          <Button
            bgColor={"green.400"}
            w={"100%"}
            h={{ base: "4rem", sm: "4rem" }}
            mt={"15%"}
            fontSize={"2xl"}
            color={"white"}
            boxShadow={"base"}
          >
            지도 정보 확인
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
