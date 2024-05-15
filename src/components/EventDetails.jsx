import { Box, Heading, Text, Image, VStack} from '@chakra-ui/react';

export function EventDetails({ event, user, categories }) {

  if (!event) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Text>Loading...</Text>
      </Box>
    );
  }

  return (
    <VStack 
      spacing={4} 
      align="start" 
      borderWidth={1} 
      borderRadius="lg" 
      p={4} 
      bg="gray.700" 
      borderColor="white"
      >
      <Heading as="h2" size="lg">{event.title}</Heading>
      <Box boxSize="300px">
        <Image src={event.image} alt={event.title} boxSize="300px" objectFit="cover" />
      </Box>
      <Text>Location: {event.location}</Text>
      <Text>Start time: {event.startTime}</Text>
      <Text>End time: {event.endTime}</Text>
      <Text>Description: {event.description}</Text>
      <Text mt={4}>
            Categories:{" "} 
            {event.categoryIds && categories && Array.isArray(categories) ? event.categoryIds.map(id => {
            const matchingCategory = categories.find(category => category.id === id.toString());
            return matchingCategory?.name;
            }).join(', ') : 'None'}
      </Text> 
      {user && <Text>Created by: {user.name}</Text>}
    </VStack>
  );
}