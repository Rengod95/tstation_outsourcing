import React, { useEffect } from "react";
import { Box, Divider, Flex, Heading, useMediaQuery } from "@chakra-ui/react";
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
  const [isMobile] = useMediaQuery("(max-width: 480px)");
  const { targetRefTop, scrollToTarget: scrollTop } = useScroll();

  useEffect(() => {
    scrollTop();
  }, []);

  const router = useRouter();

  return (
    <Box>
      <div ref={targetRefTop}></div>
      <Box bgColor={"gray"} w={"100%"} boxShadow={"md"}>
        <TireCTA />
      </Box>
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
            justify={isMobile ? "center" : "space-around"}
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
          <Flex h={"xs"} align={"center"} flexFlow={"column"} mt={10}>
            <Flex
              mt={12}
              h={"100%"}
              w={"100%"}
              justify={"center"}
              align={"center"}
            >
              <Heading size={"4xl"}>타이어 목록</Heading>
            </Flex>
          </Flex>
          <Divider orientation="horizontal" />
          <Flex
            w={"100%"}
            gap={{ sm: 4, base: 8, md: 12 }}
            p={20}
            flexWrap={"wrap"}
            justify={isMobile ? "center" : "space-around"}
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
