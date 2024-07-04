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
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Flex,
  Select,
  Stack,
  Spinner,
  Center
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import CreateEventModul from "./CreateEventModul";

const EventsPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [eventModal, setEventModal] = useState(false);
  const [search, setSearch] = useState('');
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const tableHead = ["Title", "Description", "Image", "Start Time", "End Time", "Categories"];

  const fetchEvents = () => {
    setPageLoading(true);
    fetch("http://localhost:3000/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        setPageLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setPageLoading(false);
      });
  };

  useEffect(() => {

    fetchEvents();
  }, []);

  const handleRowClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {pageLoading ? (
        <Center position="fixed" top="0" left="0" width="100%" height="100%" bg="rgba(255, 255, 255, 0.8)" zIndex="1000">
          <Spinner color='blue.500' size="xl" />
        </Center>
      ) : (
        <div>
          <Heading>List of events</Heading>
          <div style={{ padding: "20vh" }}>
            <Flex mb={4}>
              <Button
                onClick={() => setEventModal(true)}
                bg="green.500"
                color="white"
                mb="1"
                _hover={{ bg: "green.400" }}
              >
                Add Event
              </Button>
              <InputGroup ml={4} width="300px">
                <Input
                  placeholder="Search..."
                  value={search}
                  onChange={handleSearchChange}
                />
                <InputRightElement pointerEvents="none">
                  <SearchIcon color="gray.300" />
                </InputRightElement>
              </InputGroup>
              <div>
             <Flex ml={"3"}>
                 
              <Stack spacing={3}>
              <Select variant='filled' placeholder='Category'>

                  <option value='option1' disabled>----------------</option>
                  <option value='option2'>Sports</option>
                  <option value='option3'>Games</option>
                  <option value='option4'>Relaxation</option>
             </Select>
              </Stack>
             </Flex>
            </div>
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
                  {loading ? (
                    <Tr>
                      <Td colSpan={tableHead.length}>
                        <Center>
                          <Spinner size="lg" />
                          <Box ml={2}>Loading...</Box>
                        </Center>
                      </Td>
                    </Tr>
                  ) : (
                    filteredEvents.map((item) => (
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
                    ))
                  )}
                </Tbody>
              </Table>
            </TableContainer>
            {eventModal && <CreateEventModul eventModal={eventModal} setEventModal={setEventModal} fetchEvents={fetchEvents} />}
          </div>
        </div>)}
    </div>
  );
};

export default EventsPage;
