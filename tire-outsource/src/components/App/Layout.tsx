import React, { PropsWithChildren, useEffect } from "react";
import { Flex, Box, IconButton } from "@chakra-ui/react";
import { AppHeader } from "@/components/App/Header/AppHeader";
import { useRouter } from "next/router";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { useScroll } from "@/utils/hooks/useScroll";

export type LayoutProps = PropsWithChildren<NonNullable<unknown>>;

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  const { targetRef, scrollToTarget } = useScroll();

  useEffect(() => {
    scrollToTarget();
  }, [router.pathname]);

  const ScrollToTopButton = () => {
    return (
      <IconButton
        onClick={scrollToTarget}
        zIndex={9999}
        boxShadow={"2xl"}
        icon={<ArrowUpIcon w={"2.5rem"} h={"2.5rem"} />}
        position="fixed"
        bottom="4rem"
        right="4rem"
        isRound
        w={"5rem"}
        h={"5rem"}
        bgColor={"green.400"}
        aria-label="Scroll to top"
      />
    );
  };

  return (
    <>
      <div ref={targetRef}></div>
      <AppHeader />

      {/* Main Content */}
      <Box as="main" flex="1" w={"100%"} h={"100%"}>
        {children}
      </Box>
      {/* Footer */}
      <Box as="footer" bg="gray.200" p={4} textAlign="center">
        <p>© 2023 TireN. All rights reserved.</p>
      </Box>
      <ScrollToTopButton />
    </>
  );
};

export default Layout;
