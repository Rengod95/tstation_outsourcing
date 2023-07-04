import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  useBreakpointValue,
  Heading,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { ApiApi, Tire } from "@/utils/api";
import React, { useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { calculateDiscountRate } from "@/utils/getDiscountPercent";
import { formatNumberWithCommas } from "@/utils/formatNumberComma";

const TireDetail = (tire: Tire) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [sizeWatch, setSizeWatch] = useState<string>("");

  return (
    <Flex
      flexDirection={"column"}
      justify="center"
      align="center"
      width={"100%"}
      maxW={"1024px"}
      boxShadow={"md"}
      margin={"0 auto"}
      bgColor={"white"}
    >
      <Flex
        flexDirection={isMobile ? "column" : "row"}
        justify={"center"}
        width={"100%"}
        boxShadow={"md"}
      >
        <Box
          p="5"
          flexGrow={0}
          flexShrink={1}
          justifyContent={"center"}
          m={"0 auto"}
        >
          <Image
            src={
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              tire.thumbnailImage as string
            }
            alt={tire.name}
            boxSize={isMobile ? "280px" : "450px"}
            objectFit="cover"
            boxShadow={"inner"}
            bgColor={"gray.100"}
            borderRadius={"md"}
            m={"0 auto"}
          />
        </Box>
        <Flex
          p="5"
          flexGrow={1}
          flexShrink={1}
          justify={"space-around"}
          flexDirection={"column"}
        >
          <Heading fontSize="6xl" fontWeight={800} mt={20}>
            {tire.name}
          </Heading>
          <Text mb="5" fontSize={"2xl"} fontWeight={700}>
            {tire.description}
          </Text>
          <Text mb="2" fontSize={"2xl"} fontWeight={600}>
            제조사 : {tire.manufacturer.name}
          </Text>
          <Text mb="2" fontSize={"2xl"} fontWeight={600}>
            모델명 : {tire.modelName}
          </Text>
          <Text
            mb="2"
            fontSize={"2xl"}
            fontWeight={500}
            textDecoration={"line-through"}
          >
            정상가 : {formatNumberWithCommas(tire.marketPrice)}₩
          </Text>
          <Flex justify={"flex-start"}>
            <Text mb="5" fontSize={"3xl"} fontWeight={800} mr={4}>
              할인가 : {formatNumberWithCommas(tire.salePrice)}₩
            </Text>
            <Text fontSize={"3xl"} color={"blue"} fontWeight={800}>
              {calculateDiscountRate(tire.marketPrice, tire.salePrice)}%
            </Text>
          </Flex>

          <Text mb="5">
            <Flex w={"100%"}>
              <Menu size={"xl"}>
                <MenuButton
                  boxShadow={"base"}
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  fontSize={"xl"}
                >
                  {sizeWatch.length === 0 ? "사이즈를 선택해주세요" : sizeWatch}
                </MenuButton>
                <MenuList
                  h={"10rem"}
                  overflowY={"scroll"}
                  minH={"10rem"}
                  w={"100%"}
                >
                  {tire.sizes.map((size) => {
                    return (
                      <MenuItem
                        w={"100%"}
                        key={size.tireSize}
                        value={size.tireSize}
                        onClick={() => {
                          setSizeWatch(size.tireSize);
                        }}
                      >
                        {size.tireSize}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Menu>
            </Flex>
          </Text>
          <Flex>
            <Button
              colorScheme="teal"
              size="md"
              mr={4}
              w={"100%"}
              boxShadow={"md"}
              minH={"4rem"}
              fontSize={"2xl"}
            >
              구매하기
            </Button>
            <Button
              colorScheme="teal"
              size="md"
              w={"100%"}
              boxShadow={"md"}
              minH={"4rem"}
              fontSize={"2xl"}
            >
              실시간 상담
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Box p="5" mt={isMobile ? "5" : "0"} w={"100%"}>
        <Flex
          minH={"4rem"}
          bgColor={"gray.100"}
          justify={"flex-start"}
          w={"100%"}
        >
          <Button
            w={"12rem"}
            h={"4rem"}
            bgColor={"white"}
            color={"black"}
            fontSize={"2xl"}
            border={"0.5px solid gray"}
          >
            상세 설명
          </Button>
        </Flex>
        <Box
          w={"100%"}
          mt={4}
          bgColor={"gray.100"}
          borderRadius={"lg"}
          h={"auto"}
        >
          <Image
            src="/detail_default.jpeg"
            alt="Detail"
            objectFit="contain"
            w={"100%"}
          />
          <Image
            src={
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              tire.descriptionImage as string
            }
            alt="Detail"
            objectFit="contain"
            w={"100%"}
          />
        </Box>
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
    const result = await api.retrieveTire({ id: id });

    return { props: JSON.parse(JSON.stringify(result)) };
  } catch (error) {
    throw new Error("데이터 패칭 중 에러 발생");
  }
};

export default TireDetail;
