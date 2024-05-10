import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const SeperetEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (!id) {
      console.error('ID is undefined');
      return;
    }
  
    const fetchEvent = async () => {
      const response = await fetch(`http://localhost:3000/events/${id}`);
      
      if (!response.ok) {
        console.error(`Error: ${response.statusText}`);
        return;
      }
  
      const event = await response.json();
      setEvent(event);
    };
  
    fetchEvent();
  }, [id]);
  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
    </div>
  );
};