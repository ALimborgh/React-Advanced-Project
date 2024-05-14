import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EditEventForm } from '../components/EditEventForm';
import { EventDeleteButton } from '../components/EventDeleteButton';
import { EventDetails } from '../components/EventDetails';
import { UserDetails } from '../components/UserDetails';
import { Button } from '@chakra-ui/react';

export const SeperetEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchEventAndUser = async () => {
      try {
        const eventResponse = await fetch(`http://localhost:3000/events/${id}`);
        
        if (!eventResponse.ok) {
          throw new Error('Failed to fetch event');
        }
        
        const eventData = await eventResponse.json();
        setEvent(eventData);
        
        setIsLoading(false);
        
        if (eventData.createdBy) {
          try {
            const userResponse = await fetch(`http://localhost:3000/users/${eventData.createdBy}`);
            
            if (!userResponse.ok) {
              throw new Error('Failed to fetch user');
            }
            
            const userData = await userResponse.json();
            setUser(userData);
          } catch (error) {
            console.error(error);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchEventAndUser();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!event) {
    return <div>Error loading event</div>;
  }
  
  return (
    <div>
      <Button onClick={() => navigate("/")}> Home </Button>
      <EventDetails event={event} user={user} />
      {user && <UserDetails user={user} />}
      <EditEventForm eventId={event.id} />
      <EventDeleteButton eventId={event.id} navigate={navigate} />
    </div>
  );
};