import {
  Box,
  Input,
  Center,
  useMediaQuery,
  FormControl,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Search2Icon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import ReviewSearchModal from "@/components/Domain/review/ReviewSearchModal";

export const ReviewSearchBar = () => {
  const [isPC] = useMediaQuery("(min-width: 768px)");
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const { isOpen, onClose: closeModal, onOpen } = useDisclosure();

  return (
    <Center margin="0 auto" pl={8} pr={8} maxW="72rem" w={"100%"} h={"100%"}>
      <FormControl
        display={"flex"}
        justifyContent={"space-between"}
        h={"100%"}
        alignItems={"center"}
        p={3}
      >
        <Input
          h={"50%"}
          placeholder="원하는 장착 후기를 검색해보세요."
          fontSize={isPC ? "3xl" : "2xl"}
          boxShadow={"lg"}
          borderRadius={"3xl"}
          disabled={isInteracting}
          onClick={() => {
            onOpen();
            setIsInteracting((prev) => !prev);
          }}
        />
      </FormControl>
      <ReviewSearchModal
        isOpen={isOpen}
        onClose={() => {
          setIsInteracting((prev) => !prev);
          closeModal();
        }}
      />
    </Center>
  );
};
