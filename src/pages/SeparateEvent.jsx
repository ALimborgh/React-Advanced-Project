import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {EventDetails} from '../components/EventDetails'
import {UserDetails} from '../components/UserDetails';
import {EditEventForm} from '../components/EditEventForm';
import {EventDeleteButton} from '../components/EventDeleteButton';
import { Box, Button, CircularProgress, Heading, VStack, Text } from '@chakra-ui/react';

export const SeparateEvent = () => {
  const [event, setEvent] = useState(null);
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchEventAndUser = async () => {
      if (!id) {
        console.error('Event id is undefined');
        return;
      }

      try {
        const eventResponse = await fetch(`http://localhost:3000/events/${id}`);
        const eventText = await eventResponse.text();
        if (!eventResponse.ok) {
          console.error('Error response from server:', eventText);
          return;
        }
        const eventData = JSON.parse(eventText);
        setEvent(eventData);
        const userId = eventData.createdBy;
  
        const userResponse = await fetch(`http://localhost:3000/users/${userId}`);
        const userText = await userResponse.text();
        if (!userResponse.ok) {
          console.error('Error response from server:', userText);
          return;
        }
        const userData = JSON.parse(userText);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setIsLoading(false);
      }
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
  
    fetchEventAndUser();
  }, [id]);

  if (isLoading) {
    return <CircularProgress isIndeterminate color="green.300" />;
  }

  if (!event) {
    return <Text fontSize="xl">Error loading event</Text>;
  }

  return (
    <VStack spacing={4} align="start">
      <Button colorScheme="teal" mt={4} onClick={() => navigate('/')}>Go Home</Button>
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress isIndeterminate color="green.300" />
        </Box>
      ) : (
        <>
          <Heading as="h1" size="xl" mb={4}>
            Event Details
          </Heading>
          <EventDetails event={event} user={user} categories={categories}/>
          <Heading as="h2" size="lg" mt={8} mb={4}>
            User Details
          </Heading>
          <UserDetails user={user} />
          <Box mt={8}>
            <EditEventForm event={event} />
          </Box>
          <Box mt={4}>
            <EventDeleteButton eventId={id} colorScheme="red" />
          </Box>
        </>
      )}
    </VStack>
  );
};