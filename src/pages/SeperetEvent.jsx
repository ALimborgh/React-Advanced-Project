import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EventDeleteButton } from '../components/EventDeleteButton';
import { EventDetails } from '../components/EventDetails';
import { UserDetails } from '../components/UserDetails';
import { EditEventButton } from '../components/EditEventButton';

export const SeperetEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventAndUser = async () => {
      const eventResponse = await fetch(`http://localhost:3000/events/${id}`);
      
      if (!eventResponse.ok) {
        console.error(`Error fetching event: ${eventResponse.statusText}`);
        return;
      }
  
      const eventData = await eventResponse.json();
      setEvent(eventData);
  
      const userResponse = await fetch(`http://localhost:3000/users/${eventData.createdBy}`);
      
      if (!userResponse.ok) {
        console.error(`Error fetching user: ${userResponse.statusText}`);
        return;
      }

      const userData = await userResponse.json();
      setUser(userData);

      setIsLoading(false);
    };

    fetchEventAndUser();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!event || !user) {
    return <div>Error loading event or user</div>;
  }

  return (
    <div>
      <EventDetails event={event} user={user}/>
      <UserDetails user={user} />
      <EventDeleteButton eventId={event.id} navigate={navigate} />
      <EditEventButton eventId={event.id} navigate={navigate} />
    </div>
  );
};