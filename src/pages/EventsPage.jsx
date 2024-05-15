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

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('http://localhost:3000/events');
      const events = await response.json();
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
  }, []);


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

  let filteredEvents = [...events];

  if (searchTerm) {
    filteredEvents = filteredEvents.filter(event =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  if (selectedCategory === 'startTime') {
    filteredEvents.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
  } else if (selectedCategory === 'location') {
    filteredEvents = filteredEvents.filter(event => event.location.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
          <ModalContent bg="gray.700" color="white">
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
                <Input placeholder="Start Time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>End Time</FormLabel>
                <Input placeholder="End Time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Categories</FormLabel>
                <Select 
                  placeholder="Select categories" 
                  multiple value={selectedCategories} 
                  onChange={(e) => setSelectedCategories(Array.from(e.target.selectedOptions, option => option.value))}
                  bg="gray.700"
                  color="black"
                  >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </Select>
              </FormControl>
            </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAddEvent}>Add event</Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
        <VStack spacing={5} align="start">
          {filteredEvents.map((event, index) => (
            <Stack
              key={index}
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              bg="gray.700"
              color="white"
              direction={{ base: "column", md: "row" }}
              spacing={5}
            >
              <Box flexShrink={0} width={{ base: "100%", md: "150px" }}>
                <Image boxSize={{ base: "100%", md: "150px" }} src={event.image} alt={event.title} />
              </Box>
              <Box ml={{ base: 0, md: 5 }} mt={{ base: 5, md: 0 }} width={{ base: "100%", md: "auto" }}>
                <Link to={`/events/${event.id}`}>
                  <Heading fontSize="xl">{event.title}</Heading>
                  <Text mt={4}>{event.description}</Text>
                  <Text mt={4}>Start Time: {event.startTime}</Text>
                  <Text mt={4}>End Time: {event.endTime}</Text>
                  <Text mt={4}>
                    Categories:{" "}
                    {event.categoryIds ? event.categoryIds.map(id => {
                      const matchingCategory = categories.find(category => category.id === id.toString());
                      return matchingCategory?.name;
                    }).join(', ') : 'None'}
                  </Text>
                </Link>
              </Box>
            </Stack>
          ))}
        </VStack>
      </Box>
    </>
  );
}
