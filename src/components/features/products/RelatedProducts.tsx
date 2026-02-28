import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Divider,
} from '@chakra-ui/react';
import type { Product } from '../../../types/product.types';
import { ProductCard } from '../../ProductCard';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';

interface RelatedProductsProps {
  currentProductId: number; //pour l'exclure des suggestions
  products: Product[];
}

const MAX_SUGGESTIONS = 4;

export const RelatedProducts = ({ currentProductId, products }: RelatedProductsProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  // Exclure le produit courant, limiter à MAX_SUGGESTIONS
  const suggestions = products
    .filter((p) => p.id !== currentProductId)
    .slice(0, MAX_SUGGESTIONS);

  if (suggestions.length === 0) return null;

  const handleAddToCart = (productId: number) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    addToCart(productId).catch((err) => console.error('Erreur ajout panier:', err));
  };

  return (
    <Box bg="background.cream" py={{ base: 10, md: 16 }}>
      <Container maxW="container.xl">
        <Divider mb={10} />

        <Heading
          fontFamily="heading"
          color="primary.900"
          size="xl"
          mb={8}
        >
          Vous pourriez aimer
        </Heading>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6}>
          {suggestions.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onCardClick={(id) => navigate(`/product/${id}`)}
              onAddToCart={handleAddToCart}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};
