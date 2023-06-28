import React from "react";
import {
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import ReviewSearchForm from "@/components/Domain/review/ReviewSearchForm";

export type ReviewSearchModalProps = {
  isOpen: boolean;
  onClose: (...args: any) => void;
};
export const ReviewSearchModal = ({
  isOpen,
  onClose,
}: ReviewSearchModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading>장착 후기 검색</Heading>
        </ModalHeader>
        <ModalBody>
          <ReviewSearchForm submitCallback={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default ReviewSearchModal;
