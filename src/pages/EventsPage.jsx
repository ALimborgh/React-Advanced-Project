import React, { useState, useEffect } from 'react';
import { Heading, Box, Text } from '@chakra-ui/react';

export const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('http://localhost:3000/events');
      const events = await response.json();
      setEvents(events);
    };
    fetchEvents();
  }, []);

  return (
    <Box>
      <Heading>List of events</Heading>
      {events.map((event, index) => (
        <Box key={index} p={5} shadow="md" borderWidth="1px">
          <Heading fontSize="xl">{event.name}</Heading>
          <Text mt={4}>{event.date}</Text>
          <Text mt={4}>{event.location}</Text>
          <Text mt={4}>{event.description}</Text>
        </Box>
      ))}
    </Box>
  );
};