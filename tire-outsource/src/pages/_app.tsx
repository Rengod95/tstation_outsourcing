import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import Layout from "@/components/App/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ChannelService from "../utils/ChannelTalk";

export const theme = extendTheme({
  styles: {
    global: {
      // 전역 스타일 설정
      ":root": {
        fontSize: "10px", // 1rem = 10px로 설정
        boxSizing: "border-box",
        fontFamily: "NanumSquareR",
      },
    },
  },
  fonts: {
    body: "NanumSquareR, sans-serif",
    heading: "NanumSquareR, sans-serif",
  },
  fontWeights: {
    normal: "NanumSquareR, NanumSquare_acR",
    bold: "NanumSquareB, NanumSquare_acB",
    extraBold: "NanumSquareEB, NanumSquare_acEB",

    // 나머지 폰트 가중치에 대해 여기에 정의하세요
  },
  fontSize: {
    md: {
      fontFamily: "NanumSquareR, NanumSquare_acR",
    },
    lg: {
      fontFamily: "NanumSquareB, NanumSquare_acB",
    },
    xl: {
      fontFamily: "NanumSquareEB, NanumSquare_acEB",
    },
    "2xl": {
      fontFamily: "NanumSquareEB, NanumSquare_acEB",
    },
    "3xl": {
      fontFamily: "NanumSquareEB, NanumSquare_acEB",
    },
    "4xl": {
      fontFamily: "NanumSquareEB, NanumSquare_acEB",
    },
    "5xl": {
      fontFamily: "NanumSquareEB, NanumSquare_acEB",
    },
    "6xl": {
      fontFamily: "NanumSquareEB, NanumSquare_acEB",
    },
  },
});

export const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const channelService = new ChannelService();
    channelService.boot({
      pluginKey: "556ac74e-ca9e-4c98-8cd4-3f2b6df2ed2f", // fill your plugin key
    });
    return () => {
      channelService.shutdown();
    };
  }, []);

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
