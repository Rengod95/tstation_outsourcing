import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  useColorModeValue,
  Container,
  Flex,
  Button,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { InfoIcon, TimeIcon } from "@chakra-ui/icons";
import { Store } from "@/utils/api";
import { MapMarker, Map } from "react-kakao-maps-sdk";

export const StoreListItem = ({
  name,
  image,
  description,
  address,
  city,
  operatingHours,
}: Store) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 480px)");
  return (
    <Container maxW={"7xl"} p="12" mt={isMobile ? "10rem" : 0}>
      <Box
        display="flex"
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent="space-between"
        boxShadow={"xl"}
        borderRadius="2xl"
      >
        <Box
          display="flex"
          flex="1"
          position="relative"
          alignItems="center"
          pl={{ base: 10, xs: 0, sm: 10 }}
        >
          <Box width={{ base: "100%" }} zIndex="2">
            <Image
              borderRadius="xl"
              w={"100%"}
              minH={"25rem"}
              h={"25rem"}
              src={
                image ??
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
              fontSize={isMobile ? "4xl" : "5xl"}
            >
              {name ?? "지점 이름"}
            </Link>
          </Heading>
          <Text
            as="p"
            marginTop="1%"
            color={useColorModeValue("gray.700", "gray.200")}
            fontSize="2xl"
            ml={"1px"}
            fontWeight={"600"}
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
            onClick={onOpen}
          >
            지도 정보 확인
          </Button>
          <MapModal
            address={address}
            isOpen={isOpen}
            onClose={onClose}
          ></MapModal>
        </Box>
      </Box>
    </Container>
  );
};

export const MapModal = ({
  address,
  isOpen,
  onClose,
}: {
  address: string;
  isOpen: boolean;
  onClose: (...args: any) => void;
}) => {
  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"4xl"} fontWeight={800}>
            {address}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MapByKeyword address={address} />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={onClose}
              fontSize={"2xl"}
              fontWeight={800}
              w={"100%"}
              h={"5.5rem"}
            >
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export const MapByKeyword = ({ address }: { address: string }) => {
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(address, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const markers = [];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        for (let i = 0; i < data.length; i++) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        map.setBounds(bounds);
      }
    });
  }, [map]);

  return (
    <Map // 로드뷰를 표시할 Container
      center={{
        lat: 37.566826,
        lng: 126.9786567,
      }}
      style={{
        width: "100%",
        height: "350px",
      }}
      level={3}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      onCreate={setMap}
    >
      {markers.map((marker) => (
        <MapMarker
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          position={marker.position}
          onClick={() => setInfo(marker)}
        >
          {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            info && info.content === marker.content && (
              <div style={{ color: "#000" }}>
                {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  marker.content
                }
              </div>
            )
          }
        </MapMarker>
      ))}
    </Map>
  );
};
