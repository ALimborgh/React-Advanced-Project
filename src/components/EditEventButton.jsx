import { Button } from '@chakra-ui/react';

export function EditEventButton({ eventId, navigate }) {
    function editEvent() {
        navigate(`/events/${eventId}/edit`);
    }

    return (
        <Button onClick={editEvent}>
            Edit Event
        </Button>
    );
}