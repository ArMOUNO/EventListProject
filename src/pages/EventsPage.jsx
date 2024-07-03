import { useNavigate } from "react-router-dom";
import {
  Button,
  Heading,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,Input,
  InputGroup,
  InputRightElement,
  Flex,
  
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import CreateEventModul from "./CreateEventModul";

const EventsPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [eventModal, setEventModal] = useState(false);

  const tableHead = ["Title", "Description", "Image", "Start Time", "End Time", "Categories"];

  const fetchEvents = () => {
    fetch("http://localhost:3000/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleRowClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div>
      <Heading>List of events</Heading>
      <div style={{ padding: "20vh" }}>
        <div>
          
        </div>
        
         <Flex >
         <Flex mr={"1"}>
         <Button
          onClick={() => setEventModal(true)}
          bg="green.500"
          color="white"
          mb="1"
          _hover={{ bg: "green.400" }}
        >
          Add Event
        </Button>
         </Flex>
        {/* Searchbar */}
         <InputGroup width="300px">
            <Input
              placeholder="Search..."
             
             />
            <InputRightElement marginLeft={"2"} pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputRightElement>
          </InputGroup>
         </Flex>
        <TableContainer style={{ border: "1px solid black" }}>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                {tableHead.map((item, index) => (
                  <Th key={index}>{item}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {events?.map((item) => (
                <Tr key={item.id} onClick={() => handleRowClick(item.id)} _hover={{ cursor: "pointer" }}>
                  <Td>{item?.title}</Td>
                  <Td>{item?.description}</Td>
                  <Td>
                    <Image boxSize="60px" objectFit="cover" src={item?.image} alt="example-image" />
                  </Td>
                  <Td>{item?.startTime}</Td>
                  <Td>{item?.endTime}</Td>
                  <Td>
                    {item?.categoryIds?.map((categoryId, index) => (
                      <span key={index}>
                        {categoryId}
                        {index < item.categoryIds.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        {eventModal && <CreateEventModul eventModal={eventModal} setEventModal={setEventModal} fetchEvents={fetchEvents} />}
      </div>
    </div>
  );
};

export default EventsPage;
