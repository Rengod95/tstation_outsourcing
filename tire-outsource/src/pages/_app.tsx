import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import Layout from "@/components/App/Layout";

export const theme = extendTheme({
  styles: {
    global: {
      // 전역 스타일 설정
      ":root": {
        fontSize: "10px", // 1rem = 10px로 설정
        boxSizing: "border-box",
      },
    },
  },
});

export const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
