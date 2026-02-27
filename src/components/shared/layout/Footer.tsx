import { Box, Container, Heading, HStack, Text, VStack } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Box bg="primary.900" color="white" py={8}>
      <Container maxW="container.xl">
        <VStack spacing={4}>
          <Heading size="lg" fontFamily="heading">
            Elegant Heritage
          </Heading>
          <HStack spacing={8} fontSize="small">
            <Text cursor="pointer" _hover={{ color: 'secondary.500' }}>
              À propos
            </Text>
            <Text cursor="pointer" _hover={{ color: 'secondary.500' }}>
              Contact
            </Text>
            <Text cursor="pointer" _hover={{ color: 'secondary.500' }}>
              CGV
            </Text>
          </HStack>
          <Text fontSize="small" color="gray.400">
            © 2026 Elegant Heritage Coffee. Tous droits réservés.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};
