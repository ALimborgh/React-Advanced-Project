import React, { useState, useEffect } from 'react';
import { Heading, Box, Text, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

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