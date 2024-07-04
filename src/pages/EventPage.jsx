import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteButtonReuse from "./../components/DeleteButtonReuse";
import EditButtonReuse from "./../components/EditButtonReuse";
import ConfirmationModal from "./../components/ConfirmationModal";
import { useForm } from 'react-hook-form';
import {
  Box,
  Heading,
  Text,
  Image,
  Center,
  VStack,
  Divider,
  Flex,
  useToast,
  Button, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalFooter,
  ModalBody, 
  ModalCloseButton,
  Spinner
} from "@chakra-ui/react";
import ReusableForm from "../components/ReusableForm";

const EventPage = () => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const { eventId } = useParams();
  const [categories, setCategories] = useState([]);
  const [event, setEvent] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const fetchEvent = async () => {
    setPageLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`);
      const data = await response.json();
      setEvent(data);
      reset(data);
    } catch (error) {
      console.error("Error fetching event details:", error);
    }finally {
      setPageLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchEvent();
    
  }, [eventId]);

  const handleEdit = async () => {
    await fetchCategories();
    setIsEditOpen(true);
    setValue('categoryIds', event.categoryIds.join(', '));
    
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Event deleted",
          description: "The event has been successfully deleted.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/");
      } else {
        throw new Error("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        title: "Error",
        description: "Failed to delete the event.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onSubmit = async (data) => {
    try {
      const updatedCategoryIds = typeof data.categoryIds === 'string' ? data.categoryIds.split(',').map(id => id.trim()) : data.categoryIds;
      data.categoryIds = updatedCategoryIds;
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updatedEvent = await response.json();
        toast({
          title: "Event updated",
          description: "The event has been successfully updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
       navigate(`/event/${eventId}`)
        setEvent(updatedEvent);
        setIsEditOpen(false);
        reset(); 
      } else {
        throw new Error("Failed to update event");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      toast({
        title: "Error",
        description: "Failed to update the event.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleModalClose = () => {
    setIsEditOpen(false);
  };

  return (
    <div>
    {pageLoading ? (
      <Center position="fixed" top="0" left="0" width="100%" height="100%" bg="rgba(255, 255, 255, 0.8)" zIndex="1000">
        <Spinner color='blue.500' size="xl" />
      </Center>
    ) : (
    <div>
    <Center height="80vh">
      <Box
        maxW="lg"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="xl"
        p="6"
        textAlign="left"
      >
        <VStack spacing="2">
          <Heading as="h3" size="lg">
            {event.title}
          </Heading>
          <Divider />
          <Image src={event.image} alt="event" maxW="70%" />
          <Text fontSize="md">
            <span style={{ fontWeight: "bold" }}>Description:</span> {event.description}
          </Text>
          <Text>
            <strong>Start Time:</strong> {event.startTime}
          </Text>
          <Text>
            <strong>End Time:</strong> {event.endTime}
          </Text>
          <Text>
            <strong>Categories:</strong>{" "}
            {event?.categoryIds?.map((categoryId, index) => (
              <span key={index}>
                {categoryId}
                {index < event.categoryIds.length - 1 ? ", " : ""}
              </span>
            ))}
          </Text>
        </VStack>

        <Flex justify="center" align="center">
          <EditButtonReuse onEdit={handleEdit} />
          <Box mx={"1"} my={"6"} />
          <DeleteButtonReuse onClick={() => setIsModalOpen(true)} />
          {isModalOpen && (
            <ConfirmationModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onYes={handleDelete}
              onNo={() => setIsModalOpen(false)}
            />
          )}
        </Flex>
      </Box>
      <Modal isOpen={isEditOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ReusableForm
              onSubmit={handleSubmit(onSubmit)}
              register={register}
              error={errors}
              categories={categories}
              label1="Title"
              label2="Description"
              label3="Start Time"
              label4="End Time"
              label5="Category"
              label6="Image"
              name1="title"
              name2="description"
              name3="startTime"
              name4="endTime"
              name5="categoryIds"
              name6="image"
              type1="text"
              type2="text"
              type3="datetime-local"
              type4="datetime-local"
              type5="text"
              type6="text"
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleModalClose}>
              Close
            </Button>
            <Button onClick={handleSubmit(onSubmit)} colorScheme="green">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
    </div>)}
    </div>
  );
};

export default EventPage;
