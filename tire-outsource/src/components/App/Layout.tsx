import React, { PropsWithChildren } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { AppHeader } from "@/components/App/Header/AppHeader";

export type LayoutProps = PropsWithChildren<NonNullable<unknown>>;
const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <AppHeader />
      {/* Main Content */}
      <Box as="main" flex="1" w={"100%"} h={"100%"}>
        {children}
      </Box>
      {/* Footer */}
      <Box as="footer" bg="gray.200" p={4} textAlign="center">
        <p>© 2023 My Website. All rights reserved.</p>
      </Box>
    </>
  );
};

export default Layout;
