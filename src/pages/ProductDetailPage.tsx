import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Image,
  Badge,
  Divider,
  Spinner,
  Flex,
  useToast,
} from '@chakra-ui/react';
import { productService } from '../services/product.service';
import type { Product } from '../types/product.types';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { PageLayout } from '../components/shared/layout/PageLayout';
import { RelatedProducts } from '../components/features/products/RelatedProducts';
import { ROAST_LABELS } from '../constants/product.constants';

export const ProductDetailPage = () => {
  // Routing
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const toast = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [addingToCart, setAddingToCart] = useState<boolean>(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  // Chargement du produit
  useEffect(() => {
    // Garde : si pas d'id dans l'URL, on arrête
    if (!id) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const loadProduct = async () => {
      try {
        setLoading(true);
        setNotFound(false);

        // parseInt() : convertit la string "42" en number 42 pour l'appel API
        // GET /api/products/42
        const result = await productService.getById(parseInt(id, 10));
        setProduct(result);
      } catch (err) {
        console.error('Erreur chargement produit:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]); // Se relance si l'id change (navigation entre produits)

  // Chargement de tous les produits (suggestions)
  useEffect(() => {
    productService.search()
      .then(setAllProducts)
      .catch(() => setAllProducts([]));
  }, []);

  const handleAddToCart = async () => {
    if (!product) return;

    // Si non connecté → rediriger vers la page de connexion
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setAddingToCart(true);
      await addToCart(product.id); 

      // Feedback visuel succès via toast Chakra UI
      toast({
        title: 'Produit ajouté au panier ✓',
        description: `${product.name} a été ajouté à votre panier.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      });
    } catch (error) {
      // Feedback visuel erreur
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Impossible d\'ajouter au panier.',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'bottom-right',
      });
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <PageLayout>
        <Flex minH="60vh" justify="center" align="center" direction="column" gap={4}>
          <Spinner size="xl" color="secondary.400" thickness="3px" />
          <Text color="gray.500">Chargement du produit...</Text>
        </Flex>
      </PageLayout>
    );
  }

  //404
  if (notFound || !product) {
    return (
      <PageLayout>
        <Container maxW="container.md" py={20} textAlign="center">
          <Text fontSize="64px">☕</Text>
          <Heading fontFamily="heading" color="primary.900" mb={4}>
            Produit introuvable
          </Heading>
          <Text color="gray.500" mb={8}>
            Le produit avec l'identifiant #{id} n'existe pas ou a été retiré de la vente.
          </Text>
          <Button variant="primary" onClick={() => navigate('/')}>
            Retour au catalogue
          </Button>
        </Container>
      </PageLayout>
    );
  }

  // Rendu principal
  return (
    <PageLayout>

      <Container maxW="container.xl" py={{ base: 10, md: 16 }}>


        {/* Bloc principal : Image + Infos */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 8, md: 14 }}>

          {/* Colonne gauche : Image */}
          <Box>
            <Image
              src={product.images?.[0]?.link || 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800'}
              alt={product.images?.[0]?.alt || product.name}
              borderRadius="16px"
              objectFit="cover"
              w="100%"
              maxH="500px"
              boxShadow="lg"
            />

            {/* Miniatures si plusieurs images */}
            {product.images && product.images.length > 1 && (
              <HStack spacing={3} mt={4}>
                {product.images.map((img) => (
                  <Image
                    key={img.id}
                    src={img.link}
                    alt={img.alt}
                    w="80px"
                    h="80px"
                    objectFit="cover"
                    borderRadius="8px"
                    cursor="pointer"
                    opacity={0.7}
                    _hover={{ opacity: 1 }}
                  />
                ))}
              </HStack>
            )}
          </Box>

          {/* Colonne droite : Détails */}
          <VStack align="start" spacing={5}>

            {/* Badges certifications */}
            <HStack spacing={2} flexWrap="wrap">
              {product.origin?.country && (
                <Badge bg="secondary.500" color="primary.900" fontSize="xs" textTransform="uppercase">
                  {product.origin.country}
                </Badge>
              )}
              {product.certifications?.map((cert) => (
                <Badge key={cert} colorScheme={cert === 'Bio' ? 'green' : 'orange'} fontSize="xs">
                  {cert}
                </Badge>
              ))}
            </HStack>

            {/* Nom du produit */}
            <Heading size="2xl" fontFamily="heading" color="primary.900" lineHeight="1.2">
              {product.name}
            </Heading>

            {/* Notes de dégustation */}
            {product.tastingNotes && product.tastingNotes.length > 0 && (
              <Text fontSize="large" color="secondary.600" fontStyle="italic">
                {product.tastingNotes.join(' · ')}
              </Text>
            )}

            {/* Prix */}
            <Text fontSize="3xl" fontWeight="700" color="primary.900">
              {product.price.toFixed(2)}€
              <Text as="span" fontSize="sm" fontWeight="normal" color="gray.500" ml={2}>
                / 250g
              </Text>
            </Text>

            {/* Stock */}
            <Text fontSize="sm" color={product.stock > 20 ? 'green.600' : product.stock > 0 ? 'orange.500' : 'red.500'}>
              {product.stock === 0
                ? '✗ Rupture de stock'
                : product.stock < 20
                ? `⚠ Plus que ${product.stock} en stock`
                : `✓ En stock (${product.stock} disponibles)`}
            </Text>

            {/* Bouton Ajouter au panier */}
            <Button
              variant="primary"
              size="lg"
              w="100%"
              isDisabled={product.stock === 0 || addingToCart}
              isLoading={addingToCart}
              loadingText="Ajout en cours..."
              onClick={handleAddToCart}
            >
              {product.stock === 0 ? 'Produit épuisé' : 'Ajouter au panier'}
            </Button>

            <Divider />

            {/* Tableau caractéristiques */}
            <VStack align="start" spacing={3} w="100%">
              <Heading size="sm" color="primary.900" textTransform="uppercase" letterSpacing="wider">
                Caractéristiques
              </Heading>

              {product.roastLevel && (
                <HStack justify="space-between" w="100%">
                  <Text fontSize="sm" color="gray.500">Torréfaction</Text>
                  <Text fontSize="sm" fontWeight="500">{ROAST_LABELS[product.roastLevel] ?? product.roastLevel}</Text>
                </HStack>
              )}

              {product.intensity !== undefined && (
                <HStack justify="space-between" w="100%">
                  <Text fontSize="sm" color="gray.500">Intensité</Text>
                  <Text fontSize="sm" fontWeight="500">{product.intensity} / 10</Text>
                </HStack>
              )}

              {product.processingMethod && (
                <HStack justify="space-between" w="100%">
                  <Text fontSize="sm" color="gray.500">Traitement</Text>
                  <Text fontSize="sm" fontWeight="500">{product.processingMethod}</Text>
                </HStack>
              )}

              {product.altitude && (
                <HStack justify="space-between" w="100%">
                  <Text fontSize="sm" color="gray.500">Altitude</Text>
                  <Text fontSize="sm" fontWeight="500">{product.altitude} m</Text>
                </HStack>
              )}

              {product.origin?.region && (
                <HStack justify="space-between" w="100%">
                  <Text fontSize="sm" color="gray.500">Région</Text>
                  <Text fontSize="sm" fontWeight="500">{product.origin.region}</Text>
                </HStack>
              )}

              {product.origin?.farm && (
                <HStack justify="space-between" w="100%">
                  <Text fontSize="sm" color="gray.500">Ferme</Text>
                  <Text fontSize="sm" fontWeight="500">{product.origin.farm}</Text>
                </HStack>
              )}

              {product.harvestDate && (
                <HStack justify="space-between" w="100%">
                  <Text fontSize="sm" color="gray.500">Récolte</Text>
                  <Text fontSize="sm" fontWeight="500">
                    {new Date(product.harvestDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}
                  </Text>
                </HStack>
              )}
            </VStack>
          </VStack>
        </SimpleGrid>

        {/* Description complète*/}
        {product.description && (
          <Box mt={14}>
            <Divider mb={8} />
            <Heading size="md" fontFamily="heading" color="primary.900" mb={4}>
              À propos de ce café
            </Heading>
            <Text fontSize="large" color="gray.700" lineHeight="1.8" maxW="700px">
              {product.description}
            </Text>
          </Box>
        )}

      </Container>

      {/* Vous pourriez aimer */}
      <RelatedProducts
        currentProductId={product.id}
        products={allProducts}
      />

    </PageLayout>
  );
};

export default ProductDetailPage;
