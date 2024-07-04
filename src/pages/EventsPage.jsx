import React, { useEffect, useState } from "react";
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
  Input,
  InputGroup,
  InputRightElement,
  Flex,
  Select,
  Spinner,
  Center,
 
} from "@chakra-ui/react";
import { SearchIcon ,AddIcon} from "@chakra-ui/icons";
import CreateEventModul from "./CreateEventModul";

const EventsPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [eventModal, setEventModal] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false); 
  const [selectedCategory, setSelectedCategory] = useState('');

  const tableHead = ["Title", "Description", "Image", "Start Time", "End Time", "Categories"];

  const fetchEvents = async () => {
    setPageLoading(true);
    try {
      const response = await fetch("http://localhost:3000/events");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setPageLoading(false);
    }
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
    },3000);
  };

  const filterEvents = () => {
    let filtered = events;
    if (search) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter((event) =>
        event.categoryIds.includes(selectedCategory)
      );
    }

    setFilteredEvents(filtered);
  };

  useEffect(() => {
    filterEvents();
  }, [search, selectedCategory, events]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setLoading(true); 
    setTimeout(() => {
      setLoading(false); 
    }, 1000);
  };

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
            <Flex mb={4} justify="space-between">
              <Flex direction="column">
              <Button
                 onClick={() => setEventModal(true)}
                bg="green.500"
                color="white"
                mb="1"
                _hover={{ bg: "green.400" }}
               width={"200px"}
              >
                Add Event
                <AddIcon ml={2} /> 
              </Button>
              <InputGroup width="200px">
                <Input
                  placeholder="Search..."
                  value={search}
                  onChange={handleSearchChange}
                />
                <InputRightElement pointerEvents="none">
                  <SearchIcon color="gray.300" />
                </InputRightElement>
              </InputGroup>
              </Flex>
               <div  style={{ paddingTop: "40px" }}>
                  <Select 
                    variant='filled'
                    onChange={handleCategoryChange}
                    value={selectedCategory}
                   
                    width={"-moz-max-content"}
                  >
                    <option value="">All Categories</option>
                    <option value="1">Sports</option>
                    <option value="2">Games</option>
                    <option value="3">Relaxation</option>
                  </Select>
               </div>
            </Flex>
            
            {loading ? ( 
              <Center>
                <Spinner color='red.500' size="xl" />
              </Center>
            ):
            (<TableContainer style={{ border: "1px solid black" }}>
              <Table variant="striped" colorScheme="teal">
                <Thead>
                  <Tr>
                    {tableHead.map((item, index) => (
                      <Th key={index}>{item}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredEvents.length === 0 ? (
                    <Tr>
                      <Td colSpan={tableHead.length}>
                        <Center>No events found.</Center>
                      </Td>
                    </Tr>
                  ) : (
                    filteredEvents.map((item) => (
                      <Tr key={item.id} onClick={() => handleRowClick(item.id)} _hover={{ cursor: "pointer" }}>
                        <Td>{item.title}</Td>
                        <Td>{item.description}</Td>
                        <Td>
                          <Image boxSize="60px" objectFit="cover" src={item.image} alt="Event Image" />
                        </Td>
                        <Td>{item.startTime}</Td>
                        <Td>{item.endTime}</Td>
                        <Td>
                          {item.categoryIds.map((categoryId, index) => (
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
            </TableContainer>)
          }
          {eventModal && <CreateEventModul eventModal={eventModal} setEventModal={setEventModal} fetchEvents={fetchEvents} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
