import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { ApiApi, Tire } from "@/utils/api";

const TireDetail = (tire: Tire) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      direction={isMobile ? "column" : "row"}
      justify="center"
      align="center"
    >
      <Box p="5">
        <Image
          src="image_url"
          alt={tire.name}
          boxSize="300px"
          objectFit="cover"
        />
      </Box>
      <Box p="5">
        <Text fontSize="2xl" mb="5">
          {tire.name}
        </Text>
        <Text mb="5">{tire.description}</Text>
        <Text mb="5">Manufacturer: {tire.manufacturer.name}</Text>
        <Text mb="5">Model: {tire.modelName}</Text>
        <Text mb="5">Market Price: {tire.marketPrice}</Text>
        <Text mb="5">Sale Price: {tire.salePrice}</Text>
        <Text mb="5">
          Sizes: {tire.sizes.map((size) => size.tireSize).join(", ")}
        </Text>
        <Button colorScheme="teal" size="md">
          Buy Now
        </Button>
      </Box>
      <Box p="5" mt={isMobile ? "5" : "0"}>
        <Text fontSize="2xl" mb="5">
          Detailed Description
        </Text>
        {/* 여기에 상세 설명 이미지를 넣어주세요 */}
        <Image
          src="detail_image_url"
          alt="Detail"
          boxSize="300px"
          objectFit="cover"
        />
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
