import React, { useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import {
  ReviewCreateFormBasicInfo,
  ReviewCreator,
} from "@/components/Domain/review/ReviewCreate/ReviewCreator";
import { useRouter } from "next/router";

const ReviewCreatePage = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // When the component is unmounted, unsubscribe from the event
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

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
