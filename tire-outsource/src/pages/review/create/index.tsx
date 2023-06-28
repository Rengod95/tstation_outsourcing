import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import {
  ReviewCreateFormBasicInfo,
  ReviewCreator,
} from "@/components/Domain/review/ReviewCreate/ReviewCreator";

const ReviewCreatePage = () => {
  return (
    <Flex
      justify={"center"}
      align={"start"}
      h={"100vh"}
      p={{ sm: 12, md: "auto" }}
    >
      <ReviewCreator />
    </Flex>
  );
};

export default ReviewCreatePage;
