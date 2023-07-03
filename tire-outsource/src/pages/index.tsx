import Head from "next/head";
import { Inter } from "next/font/google";
import Layout from "@/components/App/Layout";
import { CaptionCarousel } from "@/components/UI/Carousel/Carousel";
import { Box, Divider } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CaptionCarousel></CaptionCarousel>
      <Divider />
      <Box h={"50rem"} w={"100%"}></Box>
    </>
  );
}
