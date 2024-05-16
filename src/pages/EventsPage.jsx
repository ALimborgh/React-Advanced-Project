import { 
  Box, 
  Button, 
  Heading, 
  Image, 
  Text, 
  useDisclosure, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  FormControl, 
  FormLabel, 
  Input, 
  ModalFooter, 
  Select,
  VStack,
  Stack,
  SimpleGrid,
  Container,
} from '@chakra-ui/react';
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('http://localhost:3000/events');
      const events = await response.json();
    
      console.log('Fetched events:', events);
    
      let filtered = [...events];
    
      if (searchTerm) {
        console.log('Search term:', searchTerm);
        console.log('Selected category:', selectedCategory);
        
        if (selectedCategory === 'startTime') {
          const searchTermDate = new Date(searchTerm);
          if (!isNaN(searchTermDate)) {
            filtered = filtered.filter(event => 
              new Date(event.startTime).getTime() === searchTermDate.getTime()
            );
          }
        } else if (selectedCategory === 'location') {
          filtered = filtered.filter(event => 
            event.location.toLowerCase().includes(searchTerm.toLowerCase())
          );
        } else {
          filtered = filtered.filter(event =>
            event.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
      }
  
      console.log('Filtered events:', filtered);
    
      setFilteredEvents(filtered);
      setEvents(events);
    };
  
    const fetchCategories = async () => {
      const response = await fetch('http://localhost:3000/categories');
      const categories = await response.json();
      return categories;
    };
  
    fetchCategories().then((data) => {
      setCategories(data);
      setIsLoading(false);
    });
  
    fetchEvents();
  }, [searchTerm, selectedCategory]);
  
  const handleAddEvent = async () => {
    const event = { title };
    const response = await fetch('http://localhost:3000/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
  
    const newEvent = await response.json();
    setEvents([...events, newEvent]);
    onClose();
  };
  
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    console.log('selectedCategory', selectedCategory);
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
    <Container maxW="container.l">
     <Heading>List of events</Heading>
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={3}
        align={{ md: "center" }}
        justify="space-between"
      >
        <Box flex={{ md: 1 }} bg="gray.700" color="white">
          <Input placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </Box>
        <Box flex={{ md: 1 }} bg="gray.700">
          <Select placeholder="Filter by category" value={selectedCategory} onChange={handleCategoryChange} color="black">
            <option value="startTime">Time</option>
            <option value="location">Location</option>
          </Select>
        </Box>
      </Stack>
      <Box>
        <Button 
            onClick={onOpen}
            shadow="md"
            borderWidth="1px"
            borderRadius="lg"
            bg="gray.700"
            color="white"
            p={5}
            mt={2}
            mb={2} 
            
            >Add event</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg="gray.800" color="white">
            <ModalHeader>Add a new event</ModalHeader>
            <ModalCloseButton color="white" />
            <ModalBody>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Image</FormLabel>
                <Input placeholder="Image" value={image} onChange={(e) => setImage(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Location</FormLabel>
                <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Start Time</FormLabel>
                <Input placeholder="Start Time" type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>End Time</FormLabel>
                <Input placeholder="End Time" type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Categories</FormLabel>
                <Select
                  placeholder="Select categories"
                  value={selectedCategories}
                  onChange={(e) => setSelectedCategories(e.target.value)}
                  multiple
                  color="black"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </ModalBody>
          <ModalFooter>
            <Button             
            shadow="md"
            borderWidth="1px"
            borderRadius="lg"
            bg="gray.700"
            color="white" 
            onClick={handleAddEvent}
            >Add event</Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
          <VStack spacing={5} align="start">
          <SimpleGrid columns={{ base:1 , md:3}} spacing={5} >
            {filteredEvents.map((event) => (
              <Stack
                key={event.id}
                shadow="md"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                bg="gray.700"
                color="white"
                p={5}
              >
                <Box flexShrink={0}>
                  <Image boxSize="100%" objectFit="cover" src={event.image} alt={event.title} />
                </Box>
                <Box mt={5}>
                  <Link to={`/events/${event.id}`}>
                    <Heading fontSize="xl">{event.title}</Heading>
                    <Text mt={4}>{event.description}</Text>
                    <Text mt={4}>Start Time: {event.startTime}</Text>
                    <Text mt={4}>End Time: {event.endTime}</Text>
                    <Text mt={4}>
                      Categories:{" "}
                      {event.categoryIds
                        ? event.categoryIds
                            .map((id) => {
                              const matchingCategory = categories.find(
                                (category) => category.id === id.toString()
                              );
                              return matchingCategory?.name;
                            })
                            .join(", ")
                        : "None"}
                    </Text>
                  </Link>
                </Box>
              </Stack>
            ))}
          </SimpleGrid>
          </VStack>
      </Box>
      </Container>
    </>
  );
}
