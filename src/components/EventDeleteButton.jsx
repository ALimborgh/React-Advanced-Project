import { Button } from '@chakra-ui/button';

export function EventDeleteButton({ eventId, navigate }) {
    async function deleteEvent() {
        if (window.confirm('Are you sure you want to delete this event?')) {
            const response = await fetch(`http://localhost:3000/events/${eventId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                console.error('Failed to delete event');
                toast.error('Failed to delete event');
            } else {
                toast.success('Event deleted successfully');
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