import { Box, Button, Heading, Image, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Select } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Form, Link } from 'react-router-dom';

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
  const categories = [...new Set(events.flatMap(event => event.categoryIds))];

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('http://localhost:3000/events');
      const events = await response.json();
      setEvents(events);
    };
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

if (selectedCategory === 'startTime') {
  filteredEvents.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
} else if (selectedCategory === 'location') {
  filteredEvents = filteredEvents.filter(event => event.location.toLowerCase().includes(searchTerm.toLowerCase()));
}

  return (
    <Box>
      <Heading>List of events</Heading>
      <Input placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <Select placeholder="Filter by category" value={selectedCategory} onChange={handleCategoryChange}>
        <option value="startTime">Time</option>
        <option value="location">Location</option>
      </Select>
      <Button onClick={onOpen}>Add event</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
          <ModalContent>
        <ModalHeader>Add a new event</ModalHeader>
        <ModalCloseButton />
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
            <Select placeholder="Select categories" multiple value={selectedCategories} onChange={(e) => setSelectedCategories(Array.from(e.target.selectedOptions, option => option.value))}>
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
      {filteredEvents.map((event, index) => (
        <Link key={index} to={`/events/${event.id}`}>
          <Box p={5} shadow="md" borderWidth="1px">
            <Heading fontSize="xl">{event.title}</Heading>
            <Image boxSize="100px" src={event.image} alt={event.title} />
            <Text mt={4}>{event.description}</Text>
            <Text mt={4}>Start Time: {event.startTime}</Text>
            <Text mt={4}>End Time: {event.endTime}</Text>
            <Text mt={4}>Categories: {event.categories ? event.categories.join(', ') : 'None'}</Text>
          </Box>
        </Link>
      ))}
    </Box>
  );
};