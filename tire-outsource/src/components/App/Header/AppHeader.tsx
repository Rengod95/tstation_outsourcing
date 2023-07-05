import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Img,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import React, { PropsWithRef, RefObject } from "react";
import { FocusableElement } from "@chakra-ui/utils";
import SearchBar from "@/components/Domain/tire/Search/SearchBar";
import { HamburgerIcon } from "@chakra-ui/icons";

import style from "./Header.module.scss";
import { useRouter } from "next/router";

export type HPath = {
  name: string;
  path: `/${string}`;
};

export const HEADER_PATH: HPath[] = [
  {
    name: "타이어 찾기",
    path: "/tire",
  },
  {
    name: "장착 후기",
    path: "/review",
  },
  {
    name: "장착점 소개",
    path: "/store",
  },
];

export const HeaderLogo = () => {
  const router = useRouter();
  return (
    <Center
      as={"section"}
      flexGrow={1}
      minW={"5rem"}
      maxW={"23rem"}
      mr={"2rem"}
      p={4}
      onClick={() => {
        router.push("/");
      }}
      cursor={"pointer"}
    >
      <Img
        src={"/logo.png"}
        alt={"logo"}
        w={"100%"}
        maxH={"6rem"}
        objectFit={"contain"}
      />
    </Center>
  );
};

export const HeaderSearchBar = () => {
  const [isHidden] = useMediaQuery("(max-width: 500px)", { ssr: true });
  return (
    <>
      {!isHidden ? (
        <Center flexGrow={2} mr={"2rem"} h={"4rem"}>
          {/*<SearchBar />*/}
        </Center>
      ) : (
        <div></div>
      )}
    </>
  );
};

export const HeaderNavItem = ({ path, name }: HPath) => {
  const router = useRouter();
  return (
    <Button
      as={"li"}
      minH={"3rem"}
      mr={8}
      mt={4}
      mb={4}
      justifyContent={"center"}
      bgColor={"transparent"}
      h={"100%"}
      borderRadius={0}
      textAlign={"center"}
      fontSize={"2xl"}
      textDecoration={"none"}
      onClick={() => {
        router.push(`/${path}`);
      }}
      cursor={"pointer"}
    >
      {name}
    </Button>
  );
};

export type DrawerProps = {
  isOpen: boolean;
  onClose: (...args: any) => void;
  finalFocusRef: RefObject<FocusableElement>;
};
export const HeaderMenuDrawer = ({
  isOpen,
  onClose,
  finalFocusRef,
}: DrawerProps) => {
  const router = useRouter();

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={finalFocusRef as RefObject<FocusableElement>}
      size={"md"}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <Heading size={"2xl"}>Menu</Heading>
        </DrawerHeader>
        <Divider />
        <DrawerBody p={0}>
          <Button
            minH={"6rem"}
            minW={"100%"}
            colorScheme={"white"}
            fontSize={"2xl"}
            color={"black"}
            textAlign={"center"}
            onClick={() => {
              router.push("/tire");
              onClose();
            }}
          >
            타이어 찾기
          </Button>
          <Divider />
          <Button
            minH={"6rem"}
            minW={"100%"}
            colorScheme={"white"}
            fontSize={"2xl"}
            color={"black"}
            onClick={() => {
              router.push("/review");
              onClose();
            }}
          >
            사용 후기
          </Button>
          <Divider />
          <Button
            minH={"6rem"}
            minW={"100%"}
            colorScheme={"white"}
            onClick={() => {
              router.push("/store");
              onClose();
            }}
            fontSize={"2xl"}
            color={"black"}
          >
            장착점 소개
          </Button>
          <Divider />
        </DrawerBody>
        <Divider />
        <DrawerFooter bgColor={"blackAlpha.200"}>
          <Button
            boxShadow={"base"}
            minH={"4rem"}
            minW={"100%"}
            bgColor={"green.400"}
            onClick={() => {
              onClose();
            }}
            fontSize={"2xl"}
          >
            <Text fontSize={"2xl"} color={"white"}>
              메뉴 종료
            </Text>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export const HeaderNav = () => {
  const [isPC] = useMediaQuery("(min-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<FocusableElement>();

  return (
    <>
      <Flex
        as={"ul"}
        justify={"center"}
        h={"100%"}
        align={"center"}
        display={isPC ? "flex" : "none"}
      >
        {HEADER_PATH.map((data) => {
          return (
            <HeaderNavItem name={data.name} path={data.path} key={data.name} />
          );
        })}
      </Flex>
      <Button
        minH={"4rem"}
        bgColor={"white"}
        onClick={onOpen}
        display={!isPC ? "flex" : "none"}
        mr={"5%"}
        p={0}
      >
        <HamburgerIcon w={"3rem"} h={"3rem"} color={"black"} />
      </Button>
      <HeaderMenuDrawer
        finalFocusRef={btnRef as RefObject<FocusableElement>}
        isOpen={isOpen}
        onClose={onClose}
      ></HeaderMenuDrawer>
    </>
  );
};

export const AppHeader = (props: PropsWithRef<any>) => {
  return (
    <>
      <div></div>
      <Box
        ref={props.ref}
        as={"header"}
        top={0}
        zIndex={10}
        minH={"9rem"}
        w={"100%"}
        position={"sticky"}
      >
        <Flex
          w={"100%"}
          bgColor={"white"}
          boxShadow={"lg"}
          minH={"9rem"}
          flexDir={"row"}
          pr={"2.2rem"}
          pl={"2.2rem"}
          justify={"center"}
          borderBottom="1px solid rgba(255, 255, 255, 0.2)"
        >
          <Flex
            as={"section"}
            w={"100%"}
            flexDir={"row"}
            justify={"space-between"}
            align={"center"}
          >
            {/*logo*/}
            <HeaderLogo />
            {/*search bar*/}
            <HeaderSearchBar />
            {/*nav*/}
            <HeaderNav />
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
