import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import TireSearchForm from "@/components/Domain/tire/Search/TireSearchForm/TireSearchForm";

export type TiresSearchModalProps = {
  isOpen: boolean;
  onClose: (...args: any) => void;
};
export const TireSearchModal = ({ isOpen, onClose }: TiresSearchModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>제품 검색하기</ModalHeader>
        <ModalBody>
          <TireSearchForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TireSearchModal;
