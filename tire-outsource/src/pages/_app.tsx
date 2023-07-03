import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import Layout from "@/components/App/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
