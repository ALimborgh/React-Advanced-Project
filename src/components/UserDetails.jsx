import { Box, Heading, Image } from '@chakra-ui/react';

export function UserDetails({ user }) {
    return (
        <Box>
            <Heading>{user.name}</Heading>
            <Image src={user.image}/>
        </Box>
    );
}