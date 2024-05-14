import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Button, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  FormControl, 
  FormLabel, 
  Input, 
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

export function EditEventForm({ eventId }) {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    fetch(`http://localhost:3000/events/${id}`)
      .then(response => response.json())
      .then(data => setEvent(data));
  }, [id]);

  function handleInputChange(e) {
    setEvent({
      ...event,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

      try {
        fetch(`http://localhost:3000/events/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(event)
        })
          .then(() => {
            navigate(`/events/${id}`);
            toast({
              title: "Event updated.",
              description: "Your event has been updated successfully.",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            onClose();
          });
      } catch (error) {
        console.error('Error updating event:', error);
        toast({
          title: "An error occurred.",
          description: "Failed to update event.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
  }
  
  function handleEditButtonClick() {
    setIsEditing(true);
    onOpen();
  }

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Button onClick={handleEditButtonClick}>
        Edit Event
      </Button>

      {isEditing && (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Edit Event</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input name="title" value={event.title} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input name="location" value={event.location} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Start Time</FormLabel>
            <Input name="startTime" value={event.startTime} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel>End Time</FormLabel>
            <Input name="endTime" value={event.endTime} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Image</FormLabel>
            <Input name="image" value={event.image} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input name="description" value={event.description} onChange={handleInputChange} />
          </FormControl>
          <Button type="submit">Save</Button>
        </form>
      </ModalBody>
    </ModalContent>
  </Modal>
)}
    </>
  );
}