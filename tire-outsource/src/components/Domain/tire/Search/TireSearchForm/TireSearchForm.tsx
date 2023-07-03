import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";

import { DevTool } from "@hookform/devtools";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  carManufacturerListState,
  tireListWithFilterState,
} from "@/state/state.tire";
import {
  useGetCarList,
  useGetTireList,
} from "@/components/Domain/tire/tire.hooks";
import { Car, TireManufacturer } from "@/utils/api";
import { ChevronDownIcon } from "@chakra-ui/icons";

const TireSearchForm = ({ onClose }: { onClose: (...args: any) => void }) => {
  const { data: tireListData } = useGetTireList();
  const { data: carListData } = useGetCarList();
  const [selectedCarManufacturer, setSelectedCarManufacturer] =
    useState<string>("");
  const [selectedCar, setSelectedCar] = useState<string>("");
  const [selectedTireSize, setSelectedTireSize] = useState<string>("");
  const setFilter = useSetRecoilState(tireListWithFilterState);
  const { isOpen, onClose: alertClose, onOpen: alertOpen } = useDisclosure();

  const carManufacturerList: string[] = [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ...new Set(carListData?.map((car) => car.manufacturerName)),
  ];

  const getCarListFromSelectedManufacturer = (): Car[] => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return carListData?.filter(
      (car) => car.manufacturerName === selectedCarManufacturer
    );
  };

  const handleClickSearchButton = () => {
    if (selectedTireSize.length === 0) {
      alertOpen();
    } else {
      if (tireListData) {
        setFilter(
          tireListData.filter(
            (tire) => tire.manufacturer.name === selectedTireSize
          )
        );
      }

      onClose();
    }
  };

  return (
    <Flex p={4}>
      <Flex
        flexDirection={"column"}
        justify={"start"}
        align={"center"}
        w={"100%"}
        mt={2}
      >
        <Flex w={"100%"} flexDirection={"column"} mb={4}>
          <Heading mb={6}>타이어 제조사 선택</Heading>
          <Menu>
            <MenuButton
              boxShadow={"base"}
              as={Button}
              rightIcon={<ChevronDownIcon />}
              fontSize={"xl"}
            >
              {selectedCarManufacturer.length === 0
                ? "차량 제조사를 선택해주세요"
                : selectedCarManufacturer}
            </MenuButton>
            <MenuList h={"4rem"}>
              {carManufacturerList.map((man) => {
                return (
                  <MenuItem
                    key={man}
                    value={man}
                    onClick={() => {
                      setSelectedCarManufacturer(man);
                    }}
                  >
                    {man}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
        </Flex>
        <Flex w={"100%"} flexDirection={"column"} mb={4}>
          <Heading mb={6}>차량 선택</Heading>
          <Menu>
            <MenuButton
              boxShadow={"base"}
              as={Button}
              rightIcon={<ChevronDownIcon />}
              fontSize={"xl"}
            >
              {selectedCar.length === 0 ? "차량을 선택해주세요." : selectedCar}
            </MenuButton>
            <MenuList h={"4rem"}>
              {getCarListFromSelectedManufacturer().map((car) => {
                return (
                  <MenuItem
                    key={car.id}
                    value={car.carName}
                    onClick={() => {
                      setSelectedCar(car.carName);
                    }}
                  >
                    {car.carName}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
        </Flex>
        <Button
          mt={4}
          colorScheme={"green"}
          onClick={handleClickSearchButton}
          w={"100%"}
          h={"40px"}
        >
          검색
        </Button>
        {isOpen && (
          <Alert status="error" mt={4}>
            <AlertIcon />
            <AlertTitle>제조사를 먼저 선택해주세요!</AlertTitle>
            <Button onClick={alertClose}>닫기</Button>
          </Alert>
        )}
      </Flex>
    </Flex>
  );
};

export default TireSearchForm;
