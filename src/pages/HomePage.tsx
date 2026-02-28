import { useState, useEffect, useRef } from 'react';
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
import { PageLayout } from '../components/shared/layout/PageLayout';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);  //tableau de produit affiché dans la grille
  const [loading, setLoading] = useState<boolean>(true);  // loading : true pendant l'appel API, affiche un spinner
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');  // debouncedSearch : valeur retardée de searchQuery pour limiter les appels API

  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const catalogRef = useRef<HTMLDivElement>(null);
  const engagementRef = useRef<HTMLDivElement>(null);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToEngagement = () => {
    engagementRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    addToCart(productId);
  };

  // Naviguer vers la page détail du produit
  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <PageLayout bg="white">

      {/* Hero Section */}
      <Box 
        position="relative"
        h={{ base: '520px', md: '680px' }}
        bg="primary.900"
        color="white"
        overflow="hidden"
      >
        {/* Background Image */}
        <Image 
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600"
          alt="Grains de café torréfiés"
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          objectFit="cover"
          opacity={0.55}
        />
        {/* Gradient overlay : sombre en bas pour lisibilité */}
        <Box
          position="absolute"
          inset={0}
          bgGradient="linear(to-b, blackAlpha.400 0%, blackAlpha.700 100%)"
        />

        {/* Trait décoratif subtil en haut */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          h="3px"
          bgGradient="linear(to-r, transparent, secondary.500, transparent)"
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
            maxW="640px"
            pb={{ base: 8, md: 16 }}
          >
            {/* Label au-dessus du titre */}
            <HStack spacing={3} align="center">
              <Box w="32px" h="1px" bg="secondary.500" />
              <Text
                fontSize="small"
                textTransform="uppercase"
                letterSpacing="widest"
                color="secondary.500"
                fontWeight="500"
                userSelect="none"
              >
                Torréfaction artisanale
              </Text>
            </HStack>

            <Heading 
              fontFamily="heading"
              fontSize={{ base: '40px', md: '68px' }}
              lineHeight="1.05"
              color="white"
              userSelect="none"
            >
              Café d'exception,<br />
              <Box as="span" color="secondary.500">torréfié</Box> avec passion.
            </Heading>
            
            <Text
              fontSize={{ base: 'body', md: 'large' }}
              maxW="480px"
              color="whiteAlpha.800"
              lineHeight="1.7"
              userSelect="none"
            >
              Chaque grain tracé jusqu'à sa parcelle d'origine — 
              du terroir à votre tasse, simplement exceptionnel.
            </Text>

            {/* Ligne de stats */}
            <HStack
              spacing={8}
              pt={2}
              divider={
                <Box w="1px" h="32px" bg="whiteAlpha.300" />
              }
            >
              {[['100%', 'Traçable'], ['Bio', 'Certifié'], ['Fair Trade', 'Direct']].map(([value, label]) => (
                <VStack key={label} spacing={0} align="start">
                  <Text fontFamily="heading" fontSize="xl" color="white" fontWeight="600" userSelect="none">{value}</Text>
                  <Text fontSize="small" color="whiteAlpha.600" userSelect="none">{label}</Text>
                </VStack>
              ))}
            </HStack>
            
            <HStack spacing={4} pt={2}>
              <Button variant="primary" size="lg" onClick={scrollToCatalog}>
                DÉCOUVRIR LA SÉLECTION
              </Button>
              <Button
                variant="outline"
                size="lg"
                color="white"
                borderColor="whiteAlpha.600"
                _hover={{ bg: 'whiteAlpha.100', borderColor: 'white' }}
                onClick={scrollToEngagement}
              >
                NOTRE HISTOIRE
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Section "Découvrir notre sélection" */}
      <Container ref={catalogRef} maxW="container.xl" py={{ base: 12, md: 16 }}>
        
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
      <Box ref={engagementRef} bg="background.sand" py={{ base: 12, md: 20 }}>
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
              
              <Button variant="primary" size="md" mt={4} onClick={scrollToCatalog}>
                EN SAVOIR PLUS
              </Button>
            </VStack>
            
          </SimpleGrid>
        </Container>
      </Box>

    </PageLayout>
  );
};

export default HomePage;