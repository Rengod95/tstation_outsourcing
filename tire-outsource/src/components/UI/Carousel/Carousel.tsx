import React, { useState } from "react";
import {
  Box,
  useBreakpointValue,
  Heading,
  Flex,
  useMediaQuery,
  Img,
  Divider,
} from "@chakra-ui/react";
import Slider, { Settings } from "react-slick";

const cards = [
  {
    title: "",
    text: "",
    image: "/1.png",
  },
  {
    title: "",
    text: "",
    image: "/2.png",
  },
];

export const CaptionCarousel = () => {
  const [slider, setSlider] = React.useState<Slider | null>(null);
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const bottom = useBreakpointValue({ base: "10%", md: "10%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });
  const [isPC] = useMediaQuery("(min-width: 768px)");

  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = cards.length;

  const settings: Settings = {
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    slidesPerRow: 1,
    touchMove: true,
    beforeChange: (current, next) => setCurrentSlide(next + 1),
  };

  return (
    <Box
      position={"relative"}
      width={"100%"}
      h={isPC ? "400px" : "200px"}
      maxW={"1024px"}
      overflow={"hidden"}
      m={"0 auto"}
      bgColor={"gray.100"}
      border={"base"}
    >
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Img
            key={index}
            position="relative"
            src={card.image}
            alt={"logo"}
            w={"100%"}
            h={isPC ? "400px" : "200px"}
            objectFit={"fill"}
          ></Img>
        ))}
      </Slider>
      <Divider />
      <Flex
        bottom={"7%"}
        w={"100%"}
        right={0}
        position={"absolute"}
        justify={"center"}
      >
        <Heading
          fontSize={{ md: "3xl", lg: "3xl", base: "xl" }}
          w={"auto"}
          textAlign={"center"}
          borderRadius={"12px"}
          color={"whiteAlpha.800"}
          px={4}
          bgColor={"blackAlpha.500"}
        >
          {currentSlide} / {totalSlides}
        </Heading>
      </Flex>
    </Box>
  );
};
