import React, { useEffect } from "react";
import { Box, Divider, Flex, Heading } from "@chakra-ui/react";
import { TireCTA } from "@/components/UI/CTA/TireCTA";
import { useScroll } from "@/utils/hooks/useScroll";
import {
  useGetCarList,
  useGetTireList,
} from "@/components/Domain/tire/tire.hooks";
import { useRecoilState } from "recoil";
import {
  carManufacturerListState,
  tireListWithFilterState,
  tireManufacturerListState,
  tireSizeListState,
} from "@/state/state.tire";
import TireListItem from "@/components/Domain/tire/TireListItem";
import { useRouter } from "next/router";

const TirePage = () => {
  const { targetRef, scrollToTarget } = useScroll();
  const { data: tireList, status: tireListStatus } = useGetTireList();
  const [tireListWithFilter, setTireListWithFilter] = useRecoilState(
    tireListWithFilterState
  );

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
    <Box>
      <TireCTA />
      {tireListWithFilter.length !== 0 && (
        <>
          <Flex
            h={"xs"}
            ref={targetRef}
            align={"center"}
            flexFlow={"column"}
            justify={"center"}
          >
            <Flex mt={12}>
              <Heading size={"4xl"}>타이어 검색 결과</Heading>
            </Flex>
          </Flex>
          <Divider orientation="horizontal" />
          <Flex
            w={"100%"}
            gap={{ sm: 4, base: 8, md: 12 }}
            p={20}
            h={"100%"}
            flexWrap={"wrap"}
            justify={"space-around"}
          >
            {tireListWithFilter.map((tire) => {
              return <TireListItem key={tire.id} tire={tire}></TireListItem>;
            })}
          </Flex>
          <Divider orientation="horizontal" />
        </>
      )}
      {tireListWithFilter.length === 0 && (
        <>
          <Flex h={"xs"} ref={targetRef} align={"center"} flexFlow={"column"}>
            <Flex mt={12}>
              <Heading size={"4xl"}>타이어 목록</Heading>
            </Flex>
          </Flex>
          <Divider orientation="horizontal" />
          <Flex
            w={"100%"}
            gap={{ sm: 4, base: 8, md: 12 }}
            p={20}
            flexWrap={"wrap"}
            justify={"space-around"}
          >
            {tireListStatus === "success" &&
              tireList.map((tire) => {
                return <TireListItem key={tire.id} tire={tire}></TireListItem>;
              })}
          </Flex>
        </>
      )}
    </Box>
  );
};

export default TirePage;
