import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Button, 
  VStack,
  SimpleGrid,
  Image,
  HStack,
  Flex
} from '@chakra-ui/react';
import { ProductCard } from '../components/ProductCard';
import { mockCoffeeProducts } from '../data/mock-coffee-products';

export const HomePage = () => {
  
  const handleAddToCart = (productId: number) => {
    console.log(`Produit ${productId} ajouté au panier`);
    //todo : implémenter la logique du panier
  };

  return (
    <Box>
      
      {/* Navigation Bar */}
      <Flex 
        as="nav"
        bg="background.cream" 
        py={4} 
        px={{ base: 6, lg: 12 }}
        justify="space-between"
        align="center"
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        <Heading 
          size="lg" 
          fontFamily="heading"
          color="primary.900"
        >
          Elegant Heritage
        </Heading>
        
        <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
          <Text 
            fontSize="body" 
            cursor="pointer"
            _hover={{ color: 'secondary.400' }}
          >
            Cafés
          </Text>
          <Text 
            fontSize="body" 
            cursor="pointer"
            _hover={{ color: 'secondary.400' }}
          >
            Accessoires
          </Text>
          <Button variant="outline" size="sm">
            Se connecter
          </Button>
        </HStack>
      </Flex>

      {/* Hero Section */}
      <Box 
        position="relative"
        h={{ base: '400px', md: '600px' }}
        bg="primary.900"
        color="white"
        overflow="hidden"
      >
        {/* Background Image avec overlay */}
        <Image 
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600"
          alt="Grains de café torréfiés"
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          objectFit="cover"
          opacity={0.4}
        />
        
        {/* Hero Content */}
        <Container 
          maxW="container.xl" 
          h="100%" 
          position="relative"
          zIndex={1}
        >
          <VStack 
            justify="center" 
            align="start" 
            h="100%" 
            spacing={6}
            maxW="600px"
          >
            <Heading 
              size="display"
              fontFamily="heading"
              fontSize={{ base: '36px', md: '60px' }}
              lineHeight="1.1"
            >
              Café d'exception,<br />
              torréfié avec passion.
            </Heading>
            
            <Text fontSize={{ base: 'body', md: 'large' }} maxW="500px">
              Chaque grain peut être tracé jusqu'à sa parcelle d'origine. 
              Du terroir à votre tasse, simplement exceptionnel.
            </Text>
            
            <HStack spacing={4} pt={4}>
              <Button variant="primary" size="lg">
                DÉCOUVRIR LA SÉLECTION
              </Button>
              <Button variant="outline" size="lg" color="white" borderColor="white">
                NOTRE HISTOIRE
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Section "Découvrir notre sélection" */}
      <Container maxW="container.xl" py={{ base: 12, md: 16 }}>
        
        <VStack spacing={2} mb={10} textAlign="center">
          <Text 
            fontSize="label" 
            textTransform="uppercase" 
            letterSpacing="wider"
            color="secondary.400"
            fontWeight="500"
          >
            Traçabilité du terroir
          </Text>
          <Heading 
            size="xl" 
            fontFamily="heading"
            color="primary.900"
          >
            Découvrir notre sélection
          </Heading>
          <Text fontSize="large" color="gray.600" maxW="600px">
            Chaque café raconte l'histoire d'un terroir unique et du savoir-faire 
            passionné des producteurs qui le cultivent.
          </Text>
        </VStack>

        {/* Grille de produits */}
        <SimpleGrid 
          columns={{ base: 1, md: 2, lg: 3 }} 
          spacing={{ base: 6, md: 8 }}
        >
          {mockCoffeeProducts.slice(0, 6).map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </SimpleGrid>

        {/* Call to Action - Voir tous les cafés */}
        <Box textAlign="center" mt={12}>
          <Button variant="secondary" size="lg">
            VOIR TOUS LES CAFÉS
          </Button>
        </Box>

      </Container>

      {/* Section "Du terroir à votre tasse" */}
      <Box bg="background.sand" py={{ base: 12, md: 20 }}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12} alignItems="center">
            
            <Image 
              src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800"
              alt="Plantation de café en montagne"
              borderRadius="12px"
              boxShadow="lg"
            />
            
            <VStack align="start" spacing={6}>
              <Text 
                fontSize="label" 
                textTransform="uppercase"
                color="secondary.400"
              >
                Notre engagement
              </Text>
              
              <Heading 
                size="xl" 
                fontFamily="heading"
                color="primary.900"
              >
                Du terroir à votre tasse.<br />
                Simplement exceptionnel.
              </Heading>
              
              <Text fontSize="large" color="gray.700">
                Nous travaillons directement avec des producteurs passionnés 
                pour vous offrir des cafés d'exception, cultivés de manière 
                éthique et durable. Chaque grain peut être tracé jusqu'à sa 
                ferme d'origine.
              </Text>
              
              <HStack spacing={4} pt={4}>
                <Box>
                  <Heading size="lg" color="primary.900">100%</Heading>
                  <Text fontSize="body">Traçable</Text>
                </Box>
                <Box>
                  <Heading size="lg" color="primary.900">Bio</Heading>
                  <Text fontSize="body">Certifié</Text>
                </Box>
                <Box>
                  <Heading size="lg" color="primary.900">Fair Trade</Heading>
                  <Text fontSize="body">Commerce équitable</Text>
                </Box>
              </HStack>
              
              <Button variant="primary" size="md" mt={4}>
                EN SAVOIR PLUS
              </Button>
            </VStack>
            
          </SimpleGrid>
        </Container>
      </Box>

      {/* Footer Simple */}
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

    </Box>
  );
};

export default HomePage;