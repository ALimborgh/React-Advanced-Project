import { Box, Heading, Text, Image } from '@chakra-ui/react';

export function EventDetails({ event, user }) {
    if (!event || !user) {
        return <Box>Loading...</Box>;
    }

    return (
        <Box>
            {event && user && (
                <>
                    <Heading>{event.title}</Heading>
                    <Image src={event.image} alt={event.title} />
                    <Text>Location: {event.location}</Text>
                    <Text>Start time: {event.startTime}</Text>
                    <Text>End time: {event.endTime}</Text>
                    <Text>Created by: {user.name}</Text>
                </>
            )}
        </Box>
    );
}