import React, { RefObject, useEffect, useRef, useState } from "react";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  useEditable,
  PopoverTrigger,
  Popover,
  PopoverContent,
  PopoverBody,
  useDisclosure,
  Divider,
  Stack,
  Image,
} from "@chakra-ui/react";

import { Control, Controller, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useGetTireList } from "@/components/Domain/tire/tire.hooks";
import { Review, Tire } from "@/utils/api";
import { useCreateNewReview } from "@/components/Domain/review/ReviewCreate/ReviewCreator.hooks";

export type BasicInfoFormProps = {
  submitCallback?: (...args: any) => void;
};

export const ReviewCreator = () => {
  const [show, setShow] = React.useState(false);
  const handleShowClick = () => setShow(!show);
  const { control, handleSubmit, watch, setValue, setFocus, formState } =
    useForm<Omit<Review, "id" | "tire">>();
  const modelInputRef = useRef<HTMLInputElement>();
  const { data, status } = useGetTireList();
  const [filteredTireList, setFilteredTireList] = useState<Tire[]>([]);
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageForUpload, setImageForUpload] = useState<Blob>();
  const [tireId, setTireId] = useState<number>();
  const createReview = useCreateNewReview();
  const inputTotalState = watch();

  console.log(data);
  console.log(filteredTireList);

  useEffect(() => {
    if (modelInputRef.current) {
      const result = filterTireList(modelInputRef.current.value);
      setFilteredTireList(result);
    }
  }, [data, modelInputRef, modelInputRef?.current?.value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setPreviewImage(URL.createObjectURL(file));
      setImageForUpload(file);
    } else {
      setPreviewImage(null);
    }
  };

  const filterTireList = (keyword: string) => {
    if (data) {
      const filtered = data.filter((item) => {
        return (
          item.modelName.includes(keyword) ||
          item.modelName.includes(keyword?.toUpperCase())
        );
      });
      return filtered;
    }

    return [];
  };

  const handleTireInputChange = () => {
    if (modelInputRef.current) {
      const result = filterTireList(modelInputRef.current?.value);
      setFilteredTireList(result);
    }
  };

  const handleItemClick = (item: Tire) => {
    if (modelInputRef.current) {
      modelInputRef.current.value = item.modelName;
    }
    onToggle();

    setTireId(item.id);
  };

  console.log(isOpen);

  const [step, setStep] = useState<{ step: 1 | 2 }>({ step: 1 });
  const [progress, setProgress] = useState<number>(50);
  return (
    <>
      <Flex
        rounded="lg"
        zIndex={10}
        maxWidth={600}
        w={"100%"}
        h={"80%"}
        p={6}
        flexFlow={"column"}
        align={"center"}
        justify={"space-between"}
        boxShadow={"xl"}
        position={"relative"}
      >
        <Progress
          value={progress}
          mb="5%"
          isAnimated
          w={"100%"}
          position={"absolute"}
          top={"5%"}
          colorScheme={"green"}
          zIndex={10}
        />
        <Box w={"100%"} maxH={"80%"} mt={20} overflowY={"auto"} zIndex={5}>
          {step.step === 1 && (
            <>
              <Heading
                w="100%"
                textAlign={"center"}
                fontWeight={700}
                mb="3%"
                fontSize={"5xl"}
              >
                유저 정보 입력
              </Heading>
              <Flex>
                <FormControl mb={"5%"}>
                  <FormLabel
                    htmlFor="nickname"
                    fontWeight={600}
                    fontSize={"2xl"}
                    h={"auto"}
                  >
                    닉네임
                  </FormLabel>
                  <Controller
                    name={"nickname"}
                    control={control}
                    defaultValue={""}
                    render={({ field }) => {
                      return (
                        <Input
                          id="nickname"
                          type={"text"}
                          placeholder="닉네임을 입력해주세요."
                          fontSize={"2xl"}
                          minLength={2}
                          minH={"4rem"}
                          {...field}
                        />
                      );
                    }}
                  />
                </FormControl>
              </Flex>
              <FormControl mb={"5%"}>
                <FormLabel htmlFor="email" fontWeight={600} fontSize={"2xl"}>
                  휴대폰 번호
                </FormLabel>
                <Controller
                  name={"phone_number"}
                  control={control}
                  defaultValue={""}
                  render={({ field }) => {
                    return (
                      <Input
                        id="phone_number"
                        minH={"4rem"}
                        fontSize={"2xl"}
                        minLength={11}
                        maxLength={11}
                        type="number"
                        {...field}
                        placeholder={"휴대폰 번호를 입력해주세요."}
                      />
                    );
                  }}
                />
                <FormHelperText>
                  - 을 제외한 11자리 숫자를 입력해주세요.
                </FormHelperText>
              </FormControl>

              <FormControl mb="5%">
                <FormLabel htmlFor="password" fontWeight={600} fontSize={"2xl"}>
                  비밀번호
                </FormLabel>
                <InputGroup size="md">
                  <Controller
                    name={"password"}
                    control={control}
                    defaultValue={""}
                    render={({ field }) => {
                      return (
                        <Input
                          id="password"
                          minH={"4rem"}
                          type={show ? "text" : "password"}
                          {...field}
                          placeholder={"비밀번호를 입력해주세요."}
                        />
                      );
                    }}
                  />

                  <InputRightElement width="15%" h={"4rem"}>
                    <Button
                      h="80%"
                      w={"100%"}
                      mr={"5%"}
                      onClick={handleShowClick}
                      bgColor={"green.200"}
                    >
                      {show ? "가리기" : "보기"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText>
                  리뷰를 수정하거나 삭제할 때 사용 될 비밀번호 입니다.
                </FormHelperText>
              </FormControl>
            </>
          )}
          {step.step === 2 && (
            <>
              <Heading
                w="100%"
                textAlign={"center"}
                fontWeight={700}
                fontSize={"5xl"}
              >
                후기 작성
              </Heading>
              <FormControl>
                <FormLabel color="gray.700" fontWeight={600} fontSize={"2xl"}>
                  평점
                </FormLabel>
                <Controller
                  name={"rating"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        fontSize={"2xl"}
                        h={"3rem"}
                        id="rating"
                        placeholder="평점을 선택해주세요."
                        required={true}
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                        {...field}
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </Select>
                    );
                  }}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel
                  fontWeight={600}
                  fontSize={"2xl"}
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                  mt="2%"
                >
                  모델명
                </FormLabel>
                <Popover
                  isOpen={isOpen}
                  onClose={onClose}
                  closeOnBlur
                  closeOnEsc
                  placement={"bottom-start"}
                  returnFocusOnClose
                >
                  <PopoverTrigger>
                    <Button
                      h={"3rem"}
                      fontSize={"2xl"}
                      shadow="base"
                      size="sm"
                      w="full"
                      rounded="md"
                      onClick={onToggle}
                    >
                      {modelInputRef.current?.value &&
                      modelInputRef.current?.value !== ""
                        ? modelInputRef.current?.value
                        : "모델명을 입력해 주세요."}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent w="100%">
                    <PopoverBody p={0}>
                      <Flex p={8} flexFlow={"column"}>
                        <Heading mb={"3%"}>모델명</Heading>
                        <Divider />
                        <Input
                          h={"3rem"}
                          fontSize={"2xl"}
                          id="rating"
                          ref={modelInputRef as RefObject<HTMLInputElement>}
                          placeholder={"모델명을 입력해 주세요."}
                          required={true}
                          focusBorderColor="brand.400"
                          shadow="sm"
                          size="sm"
                          w="full"
                          onChange={handleTireInputChange}
                          type={"text"}
                          rounded="md"
                        />
                        <FormLabel fontSize={"2xl"} mt={8}>
                          검색결과
                        </FormLabel>
                        <Flex
                          flexFlow={"column"}
                          width={"100%"}
                          mb={8}
                          overflowY={"auto"}
                        >
                          {filteredTireList.map((item, index) => (
                            <Button
                              key={index}
                              p={2}
                              bg="gray.100"
                              w={"md"}
                              fontSize={"2xl"}
                              _hover={{ bg: "gray.100" }}
                              onClick={() => handleItemClick(item)}
                              boxShadow={"base"}
                              mb={4}
                            >
                              {item.modelName}
                            </Button>
                          ))}
                        </Flex>
                      </Flex>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel
                  fontWeight={600}
                  fontSize={"2xl"}
                  htmlFor="title"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  제목
                </FormLabel>
                <Controller
                  name={"title"}
                  control={control}
                  defaultValue={""}
                  render={({ field }) => {
                    return (
                      <Input
                        fontSize={"2xl"}
                        h={"3rem"}
                        type="text"
                        {...field}
                        id="title"
                        autoComplete="제목"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                        required
                        minLength={2}
                      />
                    );
                  }}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel
                  fontWeight={600}
                  fontSize={"2xl"}
                  htmlFor="title"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  대표 이미지
                </FormLabel>
                <Controller
                  name={"image"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        fontSize={"2xl"}
                        h={"3rem"}
                        type="file"
                        accept="image/*"
                        {...field}
                        id="image"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                        required
                        onChange={handleFileChange}
                        minLength={2}
                      />
                    );
                  }}
                />
              </FormControl>
              <Stack spacing={4} alignItems="center" mt={4} w={"100%"} p={2}>
                {previewImage && (
                  <Box
                    boxSize="150px"
                    borderWidth="2px"
                    borderRadius="lg"
                    overflow="hidden"
                  >
                    <Image
                      src={previewImage}
                      alt="preview"
                      objectFit="cover"
                      w={"100%"}
                      h={"100%"}
                    />
                  </Box>
                )}
              </Stack>
              <FormControl mt={1}>
                <FormLabel
                  fontWeight={600}
                  fontSize={"3xl"}
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  내용
                </FormLabel>
                <Controller
                  name={"content"}
                  control={control}
                  defaultValue={""}
                  render={({ field }) => {
                    return (
                      <Textarea
                        required
                        h={"20rem"}
                        minLength={10}
                        fontWeight={600}
                        {...field}
                        placeholder="내용을 입력해주세요."
                        rows={3}
                        shadow="sm"
                        focusBorderColor="brand.400"
                        fontSize={"xl"}
                      />
                    );
                  }}
                />

                <FormHelperText>
                  장착 후기의 주요 내용을 작성해주세요.
                </FormHelperText>
              </FormControl>
            </>
          )}
        </Box>
        <DevTool control={control} />
        <ButtonGroup w="100%" mt={5}>
          <Flex w="100%" justifyContent="space-between">
            <Button
              onClick={() => {
                setStep((prev) => {
                  return { step: prev.step - 1 } as { step: 1 | 2 };
                });
                setProgress(progress - 50);
              }}
              isDisabled={step.step === 1}
              bgColor="green.400"
              variant="outline"
              w="7rem"
              h="4rem"
              fontSize={{ sm: "md", md: "2xl", base: "2xl" }}
            >
              이전
            </Button>
            <Button
              fontSize={{ sm: "md", md: "2xl", base: "2xl" }}
              w="7rem"
              h="4rem"
              size="md"
              onClick={() => {
                if (step.step === 1) {
                  setStep((prev) => {
                    return {
                      step: prev.step + 1,
                    } as { step: 1 | 2 };
                  });
                  setProgress(progress + 50);
                }
                if (step.step === 2) {
                  console.log({
                    ...inputTotalState,
                    tire_id: Number(tireId),
                    rating: Number(inputTotalState.rating),
                    image: imageForUpload,
                  });
                  createReview({
                    ...inputTotalState,
                    tire_id: Number(tireId),
                    rating: Number(inputTotalState.rating),
                    image: imageForUpload,
                  });
                }
              }}
              bgColor="green.400"
            >
              {step.step === 1 ? "다음" : "제출"}
            </Button>
          </Flex>
        </ButtonGroup>
      </Flex>
    </>
  );
};
