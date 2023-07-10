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
import { ApiApi, TireManufacturer } from "@/utils/api";

export type TiresSearchModalProps = {
  isOpen: boolean;
  onClose: (...args: any) => void;
};

export type SearchType = "size" | "car" | "manufacturer";
export const TireSearchModal = ({
  onSearch,
}: {
  onSearch: (...args: any) => void;
}) => {
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
          {/*<Button*/}
          {/*  fontSize={"2xl"}*/}
          {/*  p={8}*/}
          {/*  w={"100%"}*/}
          {/*  colorScheme={"green"}*/}
          {/*  onClick={() => {*/}
          {/*    setCategoryIsSelected(true);*/}
          {/*    setCategory("car");*/}
          {/*  }}*/}
          {/*>*/}
          {/*  호환 차종*/}
          {/*</Button>*/}
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
        {categoryIsSelected && category === "size" && (
          <NewTireSizeSearch onSearch={onSearch} />
        )}
        {categoryIsSelected && category === "manufacturer" && (
          <TireManufacturerSearch onSearch={onSearch} />
        )}
      </Flex>
    </Flex>
  );
};

const callAPI = async (step1?: string, step2?: string) => {
  if (step2 && !step1) {
    throw new Error("step2 cannot be provided without step1");
  }

  let basePath = " https://backend.tirenautomobile.com/api/v1/tire-sizes/";

  const queryStrings: string[] = [];
  if (step1) {
    queryStrings.push(`step1=${step1}`);
  }
  if (step2) {
    queryStrings.push(`step2=${step2}`);
  }

  if (queryStrings.length > 0) {
    basePath += "?" + queryStrings.join("&");
  }

  const response = await fetch(basePath);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
};

const NewTireSizeSearch = ({
  onSearch,
}: {
  onSearch: (...args: any) => void;
}) => {
  const [baseTireSizes, setBaseTireSizes] = useState([]);
  const [step1TireSizes, setStep1TireSizes] = useState([]);
  const [step2TireSizes, setStep2TireSizes] = useState([]);
  const [baseSize, setBaseSize] = useState("");
  const [step1Size, setStep1Size] = useState("");
  const [step2Size, setStep2Size] = useState("");

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

  const resetSizes = () => {
    setBaseSize("");
    setStep1Size("");
    setStep2Size("");
  };

  const handleClickSearchButton = () => {
    if (!baseSize || !step1Size || !step2Size) {
      alertOpen();
    } else {
      console.log(data);
      if (data) {
        console.log("진입");
        setFilter(
          data.filter((tire) =>
            tire.sizes.some(
              (size) =>
                size.tireSize === baseSize + "/" + step1Size + "R" + step2Size
            )
          )
        );
        resetSizes();
        onSearch();
      }
    }
  };

  useEffect(() => {
    callAPI()
      .then((data) => setBaseTireSizes(data))
      .catch((error) => console.error(error));
  }, []);

  const handleClickBaseSize = (size: string) => {
    if (step1Size.length > 0) {
      resetSizes(); // 기본 사이즈 선택 시 사이즈 초기화
    }
    setBaseSize(size);
    callAPI(size)
      .then((data) => setStep1TireSizes(data))
      .catch((error) => console.error(error));
  };

  const handleClickStep1Size = (size: string) => {
    setStep1Size(size);
    setStep2Size(""); // step1 사이즈 선택 시 step2 사이즈 초기화
    callAPI(baseSize, size)
      .then((data) => setStep2TireSizes(data))
      .catch((error) => console.error(error));
  };

  const handleClickStep2Size = (size: string) => {
    setStep2Size(size);
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
              w={"100%"}
              as={Button}
              rightIcon={<ChevronDownIcon />}
              fontSize={"xl"}
            >
              {baseSize || "단면폭을 선택해주세요"}
            </MenuButton>
            <MenuList
              h={"10rem"}
              overflowY={"scroll"}
              minH={"10rem"}
              w={"100%"}
            >
              {baseTireSizes.map((size) => (
                <MenuItem
                  w={"100%"}
                  key={size}
                  onClick={() => handleClickBaseSize(size)}
                >
                  {size}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          {baseSize && (
            <Flex mt={4} w={"100%"}>
              <Menu>
                <MenuButton
                  boxShadow={"base"}
                  w={"100%"}
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  fontSize={"xl"}
                >
                  {step1Size || "편평비를 선택해주세요"}
                </MenuButton>
                <MenuList
                  h={"10rem"}
                  overflowY={"scroll"}
                  minH={"10rem"}
                  w={"100%"}
                >
                  {step1TireSizes.map((size) => (
                    <MenuItem
                      w={"100%"}
                      key={size}
                      onClick={() => handleClickStep1Size(size)}
                    >
                      {size}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Flex>
          )}
          {step1Size && (
            <Flex mt={4} w={"100%"}>
              <Menu>
                <MenuButton
                  boxShadow={"base"}
                  w={"100%"}
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  fontSize={"xl"}
                >
                  {step2Size || "인치를 선택해주세요"}
                </MenuButton>
                <MenuList
                  h={"10rem"}
                  overflowY={"scroll"}
                  minH={"10rem"}
                  w={"100%"}
                >
                  {step2TireSizes.map((size) => (
                    <MenuItem
                      w={"100%"}
                      key={size}
                      onClick={() => handleClickStep2Size(size)}
                    >
                      {size}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Flex>
          )}
        </Flex>
        <Button
          mt={4}
          colorScheme={"green"}
          onClick={handleClickSearchButton}
          w={"100%"}
          h={"40px"}
          fontSize={"3xl"}
        >
          검색
        </Button>
        {isOpen && (
          <Alert status="error" mt={4}>
            <AlertIcon />
            <AlertTitle>모든 사이즈를 선택해주세요!</AlertTitle>
            <Button onClick={alertClose}>닫기</Button>
          </Alert>
        )}
      </Flex>
    </Flex>
  );
};

export const TireManufacturerSearch = ({
  onSearch,
}: {
  onSearch: (...args: any) => void;
}) => {
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
      onSearch();
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
          fontSize={"3xl"}
        >
          검색
        </Button>
        {isOpen && (
          <Alert status="error" mt={4}>
            <AlertIcon />
            <AlertTitle>제조사를 먼저 선택해주세요!</AlertTitle>
            <Button fontSize={"3xl"} onClick={alertClose}>
              닫기
            </Button>
          </Alert>
        )}
      </Flex>
    </Flex>
  );
};

export default TireSearchModal;
