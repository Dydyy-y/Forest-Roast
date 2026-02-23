/**
 * ProductDetailPage — STORY-004
 * URL : /product/:id
 *
 * Concepts React utilisés ici :
 * ─────────────────────────────
 * useParams    : extrait l'id dynamique de l'URL (/product/:id)
 * useEffect    : appel API au montage du composant (quand id change)
 * useState     : états locaux → product, loading, error
 * useNavigate  : navigation programmatique (bouton Retour)
 *
 * L'id de l'URL est une string → on le convertit en number pour l'API avec parseInt()
 * Si l'API est indisponible → fallback sur les données mock locales
 */

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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
} from '@chakra-ui/react';
import { productService } from '../services/product.service';
import { mockCoffeeProducts } from '../data/mock-coffee-products';
import type { Product } from '../types/product.types';

// Libellés lisibles pour les niveaux de torréfaction
const ROAST_LABELS: Record<string, string> = {
  light: 'Claire',
  medium: 'Médium',
  'medium-dark': 'Médium-foncé',
  dark: 'Foncée',
};

export const ProductDetailPage = () => {
  // ─── Routing ─────────────────────────────────────────────────────────────
  // useParams() retourne les paramètres dynamiques de la route (/product/:id)
  // id est TOUJOURS une string depuis l'URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // ─── État local ───────────────────────────────────────────────────────────
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // notFound : true si l'API renvoie 404 ou si l'id ne correspond à aucun produit mock
  const [notFound, setNotFound] = useState<boolean>(false);
  const [apiWarning, setApiWarning] = useState<string | null>(null);

  // ─── Chargement du produit ────────────────────────────────────────────────
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
        setApiWarning(null);

        // parseInt() : convertit la string "42" en number 42 pour l'appel API
        // GET /api/products/42
        const result = await productService.getById(parseInt(id, 10));
        setProduct(result);
      } catch (err) {
        // Si erreur API → chercher dans les mocks
        console.warn('API indisponible, recherche dans les données mock:', err);

        // parseInt(id, 10) : base 10 explicite (bonne pratique)
        const mockProduct = mockCoffeeProducts.find(
          (p) => p.id === parseInt(id, 10)
        );

        if (mockProduct) {
          setProduct(mockProduct);
          setApiWarning('API non disponible — données de démonstration affichées');
        } else {
          // Aucun produit avec cet id → 404
          setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]); // Se relance si l'id change (navigation entre produits)

  // ─── Handler Ajouter au panier ────────────────────────────────────────────
  const handleAddToCart = () => {
    if (!product) return;
    console.log(`Produit ${product.id} ajouté au panier`);
    // TODO STORY-007 : dispatch action CartContext → POST /api/carts/user/{userId}
  };

  // ─── Rendu conditionnel : Loading ─────────────────────────────────────────
  if (loading) {
    return (
      <Flex minH="60vh" justify="center" align="center" direction="column" gap={4}>
        <Spinner size="xl" color="secondary.400" thickness="3px" />
        <Text color="gray.500">Chargement du produit...</Text>
      </Flex>
    );
  }

  // ─── Rendu conditionnel : 404 ─────────────────────────────────────────────
  if (notFound || !product) {
    return (
      <Box minH="60vh" pt={20}>
        <Container maxW="container.md" textAlign="center">
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
      </Box>
    );
  }

  // ─── Rendu principal ──────────────────────────────────────────────────────
  return (
    <Box minH="100vh" bg="background.cream">

      {/* Barre de navigation */}
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
        <Heading size="lg" fontFamily="heading" color="primary.900">
          Elegant Heritage
        </Heading>
        {/* Bouton retour : navigate(-1) remonte dans l'historique du navigateur */}
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          ← Retour au catalogue
        </Button>
      </Flex>

      <Container maxW="container.xl" py={{ base: 10, md: 16 }}>

        {/* Alerte mode démo */}
        {apiWarning && (
          <Alert status="warning" mb={8} borderRadius="md">
            <AlertIcon />
            <AlertTitle>Mode démo</AlertTitle>
            <AlertDescription>{apiWarning}</AlertDescription>
          </Alert>
        )}

        {/* ── Bloc principal : Image + Infos ─────────────────────────────── */}
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
              isDisabled={product.stock === 0}
              onClick={handleAddToCart}
            >
              {product.stock === 0 ? 'Produit épuisé' : 'Ajouter au panier'}
            </Button>

            <Divider />

            {/* ── Tableau caractéristiques ───────────────────────────────── */}
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

        {/* ── Description complète ────────────────────────────────────────── */}
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
    </Box>
  );
};

export default ProductDetailPage;
