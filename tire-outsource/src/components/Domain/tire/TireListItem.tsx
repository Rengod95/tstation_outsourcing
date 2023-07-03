import React from "react";
import { Card, CardBody, CardFooter } from "@chakra-ui/card";
import {
  Heading,
  Stack,
  Text,
  Image,
  Divider,
  Button,
  ButtonGroup,
  Flex,
  Box,
} from "@chakra-ui/react";
import { Tire } from "@/utils/api";
import { calculateDiscountRate } from "@/utils/getDiscountPercent";
import { useRouter } from "next/router";

export type TireListItemProps = {
  tire: Tire;
};

const TireListItem = ({ tire }: TireListItemProps) => {
  const router = useRouter();

  const handleClickCard = () => {
    router.push(`/tire/${tire.id}`);
  };

  return (
    <Card maxW="sm" p={0} onClick={handleClickCard} boxShadow={"none"}>
      <Image
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Green double couch with wooden legs"
        borderRadius="lg"
        objectFit="cover"
      />
      <CardBody p={2}>
        <Stack spacing="1" mt={2}>
          <Heading size="md" textAlign={"center"}>
            {tire.name}
          </Heading>
          <Text textAlign={"center"}>{tire.description}</Text>
          <Text color="blue.600" textAlign={"center"}>
            ({tire.manufacturer.name} / {tire.modelName})
          </Text>
        </Stack>
      </CardBody>
      <Divider mt={2} color={"gray.400"} />
      <Flex px={4} flexDirection={"column"}>
        <Flex justify={"center"} mt={2}>
          <Flex h={"100%"} align={"end"} mr={2}>
            <Text variant="solid" color="orange" fontWeight={800}>
              {calculateDiscountRate(tire.marketPrice, tire.salePrice)}%
            </Text>
          </Flex>
          <Flex h={"100%"} align={"end"}>
            <Text
              variant="ghost"
              colorScheme="blue"
              fontSize={"3xl"}
              fontWeight={600}
              lineHeight={"22px"}
            >
              {tire.salePrice}₩
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default TireListItem;
