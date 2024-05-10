import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const SeperetEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const form = event.target;
    const title = form.elements.title ? form.elements.title.value : '';
    const categoryIds = form.elements.categoryIds ? form.elements.categoryIds.value : '';
    const image = form.elements.image ? form.elements.image.value : '';
    const startTime = form.elements.startTime ? form.elements.startTime.value : '';
    const endTime = form.elements.endTime ? form.elements.endTime.value : '';
    const createdBy = form.elements.createdBy ? form.elements.createdBy.value : '';
    const location = form.elements.location ? form.elements.location.value : '';
    const discription = form.elements.discription ? form.elements.discription.value : '';
  
    const updatedEvent = {
      title,
      categoryIds,
      image,
      startTime,
      endTime,
      createdBy,
      location,
      discription,
    };
  
    const response = await fetch(`http://localhost:3000/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEvent),
    });
  
    if (!response.ok) {
      console.error(`Error: ${response.statusText}`);
      return;
    }
  
    const eventData = await response.json();
    setEvent(eventData);
    setIsModalOpen(false);
  };

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <img src={event.image} alt={event.title} />
      <p>Start Time: {new Date(event.startTime).toLocaleString()}</p>
      <p>End Time: {new Date(event.endTime).toLocaleString()}</p>
      <p>Categories:</p>
      {user && (
        <div>
          <p>Created by: {user.name}</p>
          <img src={user.image} alt={user.name} />
        </div>
      )}
      <button onClick={() => setIsModalOpen(true)}>Edit</button>
      {isModalOpen && (
        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <label>
                Title:
                <input type="text" name="title" defaultValue={event.title} />
              </label>
              <label>
                Categories:
                <input type="text" name="categories" defaultValue={event && Array.isArray(event.categoryIds) ? event.categoryIds.join(', ') : ''} />
              </label>
              <label>
                Image URL:
                <input type="text" name="image" defaultValue={event.image} />
              </label>
              <label>
                Start Time:
                <input type="datetime-local" name="startTime" defaultValue={new Date(event.startTime).toISOString().substring(0, 16)} />
              </label>
              <label>
                End Time:
                <input type="datetime-local" name="endTime" defaultValue={new Date(event.endTime).toISOString().substring(0, 16)} />
              </label>
              <label>
                Location:
                <input type="text" name="location" defaultValue={event.location} />
              </label>
              <label>
                Description:
                <textarea name="description" defaultValue={event.description} />
              </label>
              <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button type="submit">Save</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}