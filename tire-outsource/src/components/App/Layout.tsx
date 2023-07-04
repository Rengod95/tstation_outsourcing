import React, { PropsWithChildren, useEffect } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { AppHeader } from "@/components/App/Header/AppHeader";
import { useRouter } from "next/router";

export type LayoutProps = PropsWithChildren<NonNullable<unknown>>;
const Layout = ({ children }: LayoutProps) => {
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
    <>
      <AppHeader />
      {/* Main Content */}
      <Box as="main" flex="1" w={"100%"} h={"100%"}>
        {children}
      </Box>
      {/* Footer */}
      <Box as="footer" bg="gray.200" p={4} textAlign="center">
        <p>© 2023 TireN. All rights reserved.</p>
      </Box>
    </>
  );
};

export default Layout;
