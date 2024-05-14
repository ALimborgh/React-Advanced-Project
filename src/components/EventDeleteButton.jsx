import { Button } from '@chakra-ui/button';
import { useToast } from '@chakra-ui/react';

export function EventDeleteButton({ eventId, navigate }) {
    const toast = useToast();

    async function deleteEvent() {
    if (window.confirm('Are you sure you want to delete this event?')) {
        const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: 'DELETE',
        });

        if (!response.ok) {
        console.error('Failed to delete event');
        toast({
            title: 'Failed to delete event',
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
        } else {
        toast({
            title: 'Event deleted successfully',
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
        navigate('/');
        }
    }
    }

    return (
        <Button onClick={deleteEvent}>
            Delete Event
        </Button>
    );
}