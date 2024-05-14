import { Box, Heading, Image, VStack} from '@chakra-ui/react';

export function UserDetails({ user }) {
  return (
    <VStack spacing={4} align="start" borderWidth={1} borderRadius="lg" p={4}>
      {user && (
        <>
          <Heading as="h3" size="md">{user.name}</Heading>
          <Box boxSize="100px">
            <Image borderRadius="full" boxSize="100px" src={user.image} alt={user.name} />
          </Box>
        </>
      )}
    </VStack>
  );
}