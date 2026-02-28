import { Flex, Heading, HStack, Button, Badge } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';

export const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { cart } = useCart();

  const handleLogout = () => {
    logout();
    // après déconnexion, revenir à l'accueil plutôt qu'à la page de login
    navigate('/');
  };

  return (
    <Flex
      as="nav"
      bg="background.cream"
      py={4}
      px={{ base: 6, lg: 12 }}
      justify="space-between"
      align="center"
      /* pas de ligne grise sous le navbar */
      position="sticky"
      top={0}
      zIndex={100}
    >
      {/* Logo — cliquable pour revenir à l'accueil */}
      <Heading
        size="lg"
        fontFamily="heading"
        color="primary.900"
        cursor="pointer"
        onClick={() => navigate('/')}
      >
        Elegant Heritage
      </Heading>

      {/* Navigation principale */}
      <HStack spacing={1} display={{ base: 'none', md: 'flex' }}>
        <Button
          variant="ghost"
          size="sm"
          color="primary.900"
          fontWeight="medium"
          onClick={() => navigate('/cafes')}
          _hover={{ bg: 'secondary.50', color: 'primary.900' }}
        >
          Café
        </Button>
        <Button
          variant="ghost"
          size="sm"
          color="primary.900"
          fontWeight="medium"
          onClick={() => navigate('/abonnement')}
          _hover={{ bg: 'secondary.50', color: 'primary.900' }}
        >
          Abonnement
        </Button>
      </HStack>

      {/* Menu d'authentification — identique sur toutes les pages */}
      <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
        {isAuthenticated ? (
          <>
            <Button
              variant="ghost"
              size="sm"
              color="primary.900"
              onClick={() => navigate('/profile')}
            >
              Mon profil
            </Button>

            {/* Bouton panier avec badge */}
            <Button
              variant="ghost"
              size="sm"
              color="primary.900"
              position="relative"
              onClick={() => navigate('/cart')}
            >
              Panier
              {cart && (cart.Products?.length ?? 0) > 0 && (
                <Badge
                  position="absolute"
                  top="-1"
                  right="-1"
                  bg="secondary.500"
                  color="primary.900"
                  borderRadius="full"
                  fontSize="xs"
                  minW="18px"
                  h="18px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {cart.Products.length}
                </Badge>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              colorScheme="red"
              onClick={handleLogout}
            >
              Se déconnecter
            </Button>
          </>
        ) : (
          <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
            Se connecter
          </Button>
        )}
      </HStack>
    </Flex>
  );
};
