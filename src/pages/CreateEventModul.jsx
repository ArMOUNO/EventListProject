import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton
} from "@chakra-ui/react";
import ReusableForm from '../components/ReusableForm';

const CreateEventModul = ({ PopUpname, eventModal, setEventModal,fetchEvents }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const onSubmit = async (data) => {
    try {
      data.categoryIds = data.categoryIds.split(',').map(Number);
      const response = await fetch('http://localhost:3000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    
      if (response.ok) {
        console.log('Event saved successfully!');
        reset();
        setEventModal(false);
        fetchEvents();
      } else {
        console.error('Failed to save event:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  return (
    <>
      <Modal isOpen={eventModal} onClose={() => setEventModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{PopUpname}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ReusableForm
              label1="Title"
              label2="Description"
              label3="Start Time"
              label4="End Time"
              label5="Category"
              label6="Image"
              name1='title'
              name2='description'
              name3='startTime'
              name4='endTime'
              name5='categoryIds'
              name6='image'
              type1="text"
              type2="text"
              type3="datetime-local"
              type4="datetime-local"
              type6="text"
              type5="text"
              register={register}
              required={true}
              error={errors}
              categories={categories}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => setEventModal(false)}>
              Close
            </Button>
            <Button onClick={handleSubmit(onSubmit)} colorScheme="green">Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateEventModul;
