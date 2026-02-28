import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Button,
  Badge,
  Divider,
  List,
  ListItem,
  Select,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockCoffeeProducts } from '../data/mock-coffee-products';

interface Formula {
  id: string;
  label: string;
  months: number;
  pricePerMonth: number;
  totalPrice: number;
  savings: number;
  popular?: boolean;
  color: string;
  accentColor: string;
}

const FORMULAS: Formula[] = [
  {
    id: '3months',
    label: '3 mois',
    months: 3,
    pricePerMonth: 28.90,
    totalPrice: 86.70,
    savings: 0,
    color: 'gray.50',
    accentColor: 'gray.600',
  },
  {
    id: '6months',
    label: '6 mois',
    months: 6,
    pricePerMonth: 24.90,
    totalPrice: 149.40,
    savings: 14,
    popular: true,
    color: 'secondary.50',
    accentColor: 'secondary.600',
  },
  {
    id: '12months',
    label: '12 mois',
    months: 12,
    pricePerMonth: 21.90,
    totalPrice: 262.80,
    savings: 24,
    color: 'orange.50',
    accentColor: 'orange.600',
  },
];

const BENEFITS = [
  '250g de café fraîchement torréfié chaque mois',
  'Livraison gratuite à domicile',
  'Accès aux lots exclusifs et origines rares',
  'Notes de dégustation incluses dans chaque envoi',
  'Possibilité de changer d\'origine chaque mois',
  'Résiliation libre à tout moment',
];

export const SubscriptionPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selectedFormula, setSelectedFormula] = useState<string>('6months');
  const [selectedCoffee, setSelectedCoffee] = useState<string>('');
  const [showAuthAlert, setShowAuthAlert] = useState(false);

  const handleSubscribe = () => {
    if (!isAuthenticated) {
      setShowAuthAlert(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    // Future: submit subscription order
    navigate('/order-confirmation');
  };

  return (
    <Box>
      {/* Hero */}
      <Box
        bg="primary.900"
        color="white"
        py={{ base: 16, md: 24 }}
        px={{ base: 6, lg: 12 }}
        textAlign="center"
      >
        <Badge
          bg="secondary.500"
          color="primary.900"
          px={4}
          py={1}
          borderRadius="full"
          fontSize="xs"
          fontWeight="bold"
          letterSpacing="widest"
          textTransform="uppercase"
          mb={6}
        >
          Abonnement café
        </Badge>
        <Heading
          as="h1"
          size="2xl"
          fontFamily="heading"
          mb={4}
          lineHeight="1.1"
        >
          Votre café de spécialité,{' '}
          <Text as="span" color="secondary.300">
            chaque mois
          </Text>
        </Heading>
        <Text fontSize="xl" opacity={0.85} maxW="600px" mx="auto" mt={4}>
          Recevez une sélection de nos meilleurs crus, torréfiés à la commande
          et livrés directement chez vous. Choisissez votre formule.
        </Text>
      </Box>

      <Container maxW="1100px" py={{ base: 12, md: 20 }} px={{ base: 4, md: 8 }}>
        {/* Auth alert */}
        {showAuthAlert && (
          <Alert status="warning" mb={8} borderRadius="lg">
            <AlertIcon />
            <AlertDescription>
              Vous devez être connecté pour souscrire à un abonnement.{' '}
              <Button
                variant="link"
                color="secondary.600"
                fontWeight="bold"
                onClick={() => navigate('/login')}
              >
                Se connecter →
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Formulas */}
        <Heading
          as="h2"
          size="xl"
          fontFamily="heading"
          color="primary.900"
          textAlign="center"
          mb={2}
        >
          Choisissez votre formule
        </Heading>
        <Text textAlign="center" color="gray.500" mb={10}>
          Plus vous vous engagez, plus vous économisez.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={16}>
          {FORMULAS.map((formula) => {
            const isSelected = selectedFormula === formula.id;
            return (
              <Box
                key={formula.id}
                position="relative"
                bg={isSelected ? formula.color : 'white'}
                border="2px solid"
                borderColor={isSelected ? formula.accentColor : 'gray.200'}
                borderRadius="2xl"
                p={8}
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
                shadow={isSelected ? 'lg' : 'sm'}
                onClick={() => setSelectedFormula(formula.id)}
              >
                {formula.popular && (
                  <Badge
                    position="absolute"
                    top="-12px"
                    left="50%"
                    transform="translateX(-50%)"
                    bg="secondary.500"
                    color="primary.900"
                    px={4}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="bold"
                    whiteSpace="nowrap"
                  >
                    ⭐ Le plus populaire
                  </Badge>
                )}

                <VStack spacing={3} align="start">
                  <Heading size="lg" fontFamily="heading" color="primary.900">
                    {formula.label}
                  </Heading>

                  <HStack align="baseline" spacing={1}>
                    <Heading size="2xl" color={formula.accentColor}>
                      {formula.pricePerMonth.toFixed(2)} €
                    </Heading>
                    <Text color="gray.500" fontSize="sm">
                      / mois
                    </Text>
                  </HStack>

                  <Text color="gray.500" fontSize="sm">
                    Soit {formula.totalPrice.toFixed(2)} € au total
                  </Text>

                  {formula.savings > 0 ? (
                    <Badge colorScheme="green" fontSize="sm" px={3} py={1} borderRadius="full">
                      −{formula.savings}% d'économie
                    </Badge>
                  ) : (
                    <Badge colorScheme="gray" fontSize="sm" px={3} py={1} borderRadius="full">
                      Tarif découverte
                    </Badge>
                  )}
                </VStack>
              </Box>
            );
          })}
        </SimpleGrid>

        {/* Coffee selection */}
        <Box
          bg="background.cream"
          borderRadius="2xl"
          p={{ base: 6, md: 10 }}
          mb={16}
        >
          <Heading
            as="h2"
            size="lg"
            fontFamily="heading"
            color="primary.900"
            mb={2}
          >
            Votre sélection de café
          </Heading>
          <Text color="gray.500" mb={6}>
            Choisissez votre origine pour le premier envoi (vous pourrez changer chaque mois).
          </Text>

          <Select
            placeholder="Sélectionnez une origine..."
            size="lg"
            maxW="400px"
            value={selectedCoffee}
            onChange={(e) => setSelectedCoffee(e.target.value)}
            bg="white"
            borderColor="gray.300"
            _hover={{ borderColor: 'primary.500' }}
            focusBorderColor="secondary.500"
          >
            {mockCoffeeProducts.map((product) => (
              <option key={product.id} value={String(product.id)}>
                {product.name} — {product.tastingNotes?.join(', ')}
              </option>
            ))}
          </Select>

          {selectedCoffee && (() => {
            const p = mockCoffeeProducts.find((x) => String(x.id) === selectedCoffee);
            if (!p) return null;
            return (
              <Box mt={6} p={5} bg="white" borderRadius="xl" borderLeft="4px solid" borderColor="secondary.400">
                <HStack spacing={3} mb={2}>
                  <Heading size="sm" fontFamily="heading" color="primary.900">
                    {p.name}
                  </Heading>
                  <Badge colorScheme="orange">{p.roastLevel}</Badge>
                  <Badge colorScheme="green">Intensité {p.intensity}/10</Badge>
                </HStack>
                <Text fontSize="sm" color="gray.600" mb={2}>
                  {p.processingMethod && `Traitement : ${p.processingMethod} • `}
                  {p.altitude && `Altitude : ${p.altitude}m`}
                </Text>
                <HStack spacing={2} flexWrap="wrap">
                  {p.tastingNotes?.map((note) => (
                    <Badge key={note} variant="subtle" colorScheme="yellow" fontSize="xs">
                      {note}
                    </Badge>
                  ))}
                </HStack>
              </Box>
            );
          })()}
        </Box>

        {/* Benefits */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12} mb={16} alignItems="start">
          <Box>
            <Heading
              as="h2"
              size="lg"
              fontFamily="heading"
              color="primary.900"
              mb={6}
            >
              Ce qui est inclus
            </Heading>
            <List spacing={4}>
              {BENEFITS.map((benefit) => (
                <ListItem key={benefit} display="flex" alignItems="start" gap={3}>
                  <Box as="span" color="secondary.500" flexShrink={0} fontSize="lg" mt="1px">✓</Box>
                  <Text color="gray.700">{benefit}</Text>
                </ListItem>
              ))}
            </List>
          </Box>

          <Box
            bg="primary.900"
            color="white"
            borderRadius="2xl"
            p={8}
          >
            <Heading size="lg" fontFamily="heading" mb={6}>
              Récapitulatif
            </Heading>

            {(() => {
              const formula = FORMULAS.find((f) => f.id === selectedFormula)!;
              const coffee = mockCoffeeProducts.find((x) => String(x.id) === selectedCoffee);
              return (
                <VStack spacing={5} align="stretch">
                  <HStack justify="space-between">
                    <Text opacity={0.8}>Formule</Text>
                    <Text fontWeight="bold">{formula.label}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text opacity={0.8}>Café sélectionné</Text>
                    <Text fontWeight="bold" textAlign="right" maxW="180px">
                      {coffee ? coffee.name : '—'}
                    </Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text opacity={0.8}>Prix / mois</Text>
                    <Text fontWeight="bold">{formula.pricePerMonth.toFixed(2)} €</Text>
                  </HStack>
                  {formula.savings > 0 && (
                    <HStack justify="space-between">
                      <Text opacity={0.8}>Économie</Text>
                      <Badge colorScheme="green">−{formula.savings}%</Badge>
                    </HStack>
                  )}
                  <Divider borderColor="whiteAlpha.300" />
                  <HStack justify="space-between">
                    <Text opacity={0.8}>Total engagement</Text>
                    <Heading size="md">{formula.totalPrice.toFixed(2)} €</Heading>
                  </HStack>

                  <Button
                    size="lg"
                    bg="secondary.500"
                    color="primary.900"
                    fontWeight="bold"
                    _hover={{ bg: 'secondary.400', transform: 'translateY(-1px)' }}
                    _active={{ bg: 'secondary.600' }}
                    transition="all 0.2s"
                    mt={2}
                    onClick={handleSubscribe}
                  >
                    {isAuthenticated ? 'Valider mon abonnement' : 'Se connecter pour souscrire'}
                  </Button>

                  {!isAuthenticated && (
                    <Text fontSize="xs" opacity={0.6} textAlign="center">
                      Un compte est requis pour gérer votre abonnement.
                    </Text>
                  )}
                </VStack>
              );
            })()}
          </Box>
        </SimpleGrid>

        {/* Fine print */}
        <Box textAlign="center" py={8} borderTop="1px solid" borderColor="gray.200">
          <Text fontSize="sm" color="gray.400">
            Sans engagement. Annulation possible à tout moment depuis votre profil.
            Premier envoi expédié sous 5 jours ouvrés.
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default SubscriptionPage;
