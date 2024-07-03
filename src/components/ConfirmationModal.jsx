import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';

const ConfirmationModal = ({ isOpen, onClose, onYes, onNo }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to proceed?
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onNo}>
            No
          </Button>
          <Button colorScheme="green" ml={3} onClick={onYes}>
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
