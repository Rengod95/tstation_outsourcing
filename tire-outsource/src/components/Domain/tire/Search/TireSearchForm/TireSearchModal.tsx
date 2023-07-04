import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import TireSearchForm from "@/components/Domain/tire/Search/TireSearchForm/TireSearchForm";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  tireListWithFilterState,
  tireManufacturerListState,
  tireSizeListState,
} from "@/state/state.tire";
import { Controller, useForm } from "react-hook-form";
import { useGetTireList } from "@/components/Domain/tire/tire.hooks";
import { ChevronDownIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useQuery } from "@tanstack/react-query";
import { TireManufacturer } from "@/utils/api";

export type TiresSearchModalProps = {
  isOpen: boolean;
  onClose: (...args: any) => void;
};

export type SearchType = "size" | "car" | "manufacturer";
export const TireSearchModal = () => {
  const [category, setCategory] = useState<SearchType>("car");
  const [categoryIsSelected, setCategoryIsSelected] = useState<boolean>(false);

  console.log(categoryIsSelected);

  const handleModalClose = () => {
    setCategoryIsSelected(false);
  };

  return (
    <Flex
      w={"100%"}
      flexDirection={"column"}
      align={"center"}
      justify={"center"}
    >
      <Flex
        minH={"2rem"}
        w={"100%"}
        justify={"space-around"}
        flexDirection={"column"}
      >
        <Heading mb={6} textAlign={"center"}>
          검색 종류 선택
        </Heading>
        <Divider color={"gray.400"} />
        <ButtonGroup>
          <Button
            fontSize={"2xl"}
            p={8}
            w={"100%"}
            colorScheme={"green"}
            onClick={() => {
              setCategoryIsSelected(true);
              setCategory("car");
            }}
          >
            호환 차종
          </Button>
          <Button
            fontSize={"2xl"}
            p={8}
            w={"100%"}
            colorScheme={"green"}
            onClick={() => {
              setCategoryIsSelected(true);
              setCategory("size");
            }}
          >
            타이어 사이즈
          </Button>
          <Button
            fontSize={"2xl"}
            p={8}
            w={"100%"}
            colorScheme={"green"}
            onClick={() => {
              setCategoryIsSelected(true);
              setCategory("manufacturer");
            }}
          >
            타이어 제조사
          </Button>
        </ButtonGroup>
        {categoryIsSelected && category === "size" && <TireSizeSearch />}
        {categoryIsSelected && category === "manufacturer" && (
          <TireManufacturerSearch />
        )}
      </Flex>
    </Flex>
  );
};

export const TireSizeSearch = () => {
  const { data } = useGetTireList();
  const res: string[] = [];
  data?.forEach((tire) =>
    tire.sizes.forEach((size) => res.push(size.tireSize))
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const tireSizeList: string[] = [...new Set(res)];

  const setFilter = useSetRecoilState(tireListWithFilterState);
  const { isOpen, onClose: alertClose, onOpen: alertOpen } = useDisclosure();

  const [sizeWatch, setSizeWatch] = useState<string>("");

  const handleClickSearchButton = () => {
    if (sizeWatch.length === 0) {
      alertOpen();
    } else {
      console.log(data);
      if (data) {
        console.log("진입");
        setFilter(
          data.filter((tire) =>
            tire.sizes.some((size) => size.tireSize === sizeWatch)
          )
        );
      }
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
          <Heading mb={6}>사이즈 선택</Heading>
          <Menu>
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
              {tireSizeList.map((size) => {
                return (
                  <MenuItem
                    w={"100%"}
                    key={size}
                    value={size}
                    onClick={() => {
                      setSizeWatch(size);
                    }}
                  >
                    {size}
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
            <AlertTitle>타이어 사이즈를 선택해주세요!</AlertTitle>
            <Button onClick={alertClose}>닫기</Button>
          </Alert>
        )}
      </Flex>
    </Flex>
  );
};

export const TireManufacturerSearch = () => {
  const { data } = useGetTireList();
  const setFilter = useSetRecoilState(tireListWithFilterState);
  const { isOpen, onClose: alertClose, onOpen: alertOpen } = useDisclosure();

  const [manWatch, setManWatch] = useState<string>("");

  const tireManufacturers: TireManufacturer[] = Array.from(
    new Set(data?.map((tire) => JSON.stringify(tire.manufacturer)))
  ).map((tire) => JSON.parse(tire));

  const handleClickSearchButton = () => {
    if (manWatch.length === 0) {
      alertOpen();
    } else {
      if (data) {
        setFilter(data.filter((tire) => tire.manufacturer.name === manWatch));
      }
    }
  };

  return (
    <Flex p={4} h={"100%"}>
      <Flex
        h={"100%"}
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
              {manWatch.length === 0 ? "제조사를 선택해주세요" : manWatch}
            </MenuButton>
            <MenuList h={"4rem"}>
              {tireManufacturers.map((man) => {
                return (
                  <MenuItem
                    key={man.id}
                    value={man.name}
                    onClick={() => {
                      setManWatch(man.name);
                    }}
                  >
                    {man.name}
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

export default TireSearchModal;
