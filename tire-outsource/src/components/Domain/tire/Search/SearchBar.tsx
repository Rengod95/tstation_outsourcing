import {
  Input,
  InputGroup,
  InputRightElement,
  Box,
  useMediaQuery,
  Modal,
  ModalOverlay,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import React, { useState } from "react";
import TireSearchModal from "@/components/Domain/tire/Search/TireSearchForm/TireSearchModal";
export const SearchBar = () => {
  const [isPC] = useMediaQuery("(min-width: 768px)");
  const { isOpen, onClose: closeModal, onOpen } = useDisclosure();
  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  return (
    <Box margin="0 auto" maxW="72rem" w={"100%"} h={"100%"}>
      <InputGroup
        h={"100%"}
        onClick={() => {
          onOpen();
          setIsInteracting((prev) => !prev);
        }}
      >
        <Input
          h={"100%"}
          placeholder="원하는 제품을 검색해보세요."
          fontSize={isPC ? "3xl" : "2xl"}
          disabled={isInteracting}
        />
        <InputRightElement w={"4rem"} h={"100%"}>
          <Search2Icon color="gray.500" w={"1.5rem"} h={"1.5rem"} />
        </InputRightElement>
      </InputGroup>
      <TireSearchModal
        isOpen={isOpen}
        onClose={() => {
          setIsInteracting((prev) => !prev);
          closeModal();
        }}
      />
    </Box>
  );
};

export default SearchBar;
