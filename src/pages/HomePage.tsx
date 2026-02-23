import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { ProductCard } from '../components/ProductCard';
import { productService } from '../services/product.service';
import { mockCoffeeProducts } from '../data/mock-coffee-products';
import type { Product } from '../types/product.types';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);  //tableau de produit affiché dans la grille
  const [loading, setLoading] = useState<boolean>(true);  // loading : true pendant l'appel API, affiche un spinner
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');  // debouncedSearch : valeur retardée de searchQuery pour limiter les appels API

  const navigate = useNavigate();

  //debounce : attendre 400ms après la dernière frappe avant de chercher, évite un appel API à chaque caractère tapé
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 400);

    // Cleanup : annuler le timer si l'utilisateur retape avant 400ms
    return () => clearTimeout(timer);
  }, [searchQuery]); // re-déclenche quand searchQuery change

  //Charger les produits depuis l'API, se déclenche au premier rendu et quand debouncedSearch change
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Appel API via productService.search()
        const result = await productService.search(
          debouncedSearch ? { search: debouncedSearch } : undefined
        );

        setProducts(result);
      } catch (err) {
        // Si l'API est inaccessible, on utilise les données mock comme fallback
        console.warn('API indisponible, utilisation des données mock:', err);
        
        // Filtrage local sur les mocks si une recherche est active
        if (debouncedSearch) {
          const filtered = mockCoffeeProducts.filter(p =>
            p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            p.description?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            p.origin?.country?.toLowerCase().includes(debouncedSearch.toLowerCase())
          );
          setProducts(filtered);
        } else {
          setProducts(mockCoffeeProducts);
        }
        
        setError('API non disponible — données de démonstration affichées');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [debouncedSearch]); // dépendance : relance quand la recherche change

  const handleAddToCart = (productId: number) => {
    console.log(`Produit ${productId} ajouté au panier`);
  };

  // Naviguer vers la page détail du produit
  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
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
        
        <VStack spacing={2} mb={8} textAlign="center">
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

        {/* ── Barre de recherche ───────────────────────────────────────────
            Input contrôlé : onChange met à jour searchQuery → déclenche debounce
            → après 400ms → debouncedSearch change → useEffect relance l'API
        */}
        <Box maxW="480px" mx="auto" mb={10}>
          <InputGroup size="lg">
            <InputLeftElement pointerEvents="none" color="gray.400" fontSize="1.2em">
              🔍
            </InputLeftElement>
            <Input
              placeholder="Rechercher un café, une origine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              bg="white"
              borderColor="gray.200"
              _focus={{ borderColor: 'secondary.400', boxShadow: '0 0 0 1px #c8962e' }}
              fontFamily="body"
            />
          </InputGroup>
          {/* Indication du nombre de résultats */}
          {!loading && (
            <Text fontSize="sm" color="gray.500" mt={2} textAlign="center">
              {products.length} café{products.length !== 1 ? 's' : ''} 
              {debouncedSearch ? ` pour "${debouncedSearch}"` : ' disponibles'}
            </Text>
          )}
        </Box>

        {/* ── Alerte API indisponible ──────────────────────────────────────── */}
        {error && (
          <Alert status="warning" mb={6} borderRadius="md">
            <AlertIcon />
            <AlertTitle>Mode démo</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* ── Loader pendant l'appel API ──────────────────────────────────── */}
        {loading ? (
          <VStack py={16} spacing={4}>
            <Spinner size="xl" color="secondary.400" thickness="3px" />
            <Text color="gray.500">Chargement des produits...</Text>
          </VStack>
        ) : products.length === 0 ? (
          /* ── Aucun résultat ───────────────────────────────────────────── */
          <VStack py={16} spacing={4}>
            <Text fontSize="2xl">☕</Text>
            <Text color="gray.500" textAlign="center">
              Aucun café trouvé pour "{debouncedSearch}"
            </Text>
            <Button variant="outline" onClick={() => setSearchQuery('')} size="sm">
              Effacer la recherche
            </Button>
          </VStack>
        ) : (
          /* ── Grille de produits ───────────────────────────────────────── */
          <>
            <SimpleGrid 
              columns={{ base: 1, md: 2, lg: 3 }} 
              spacing={{ base: 6, md: 8 }}
            >
              {products.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onAddToCart={handleAddToCart}
                  onCardClick={handleProductClick}
                />
              ))}
            </SimpleGrid>

            {/* Call to Action - visible seulement s'il n'y a pas de recherche active */}
            {!debouncedSearch && (
              <Box textAlign="center" mt={12}>
                <Button variant="secondary" size="lg">
                  VOIR TOUS LES CAFÉS
                </Button>
              </Box>
            )}
          </>
        )}

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