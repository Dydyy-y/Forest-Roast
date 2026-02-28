import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Heading,
  Text,
  VStack,
  Circle,
} from '@chakra-ui/react';
import { PageLayout } from '../components/shared/layout/PageLayout';

export const OrderConfirmationPage = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>

      {/* Contenu confirmation */}
      <Container maxW="container.md" py={20} textAlign="center">
        <VStack spacing={6}>

          {/* Icône succès */}
          <Circle
            size="100px"
            bg="green.100"
            border="3px solid"
            borderColor="green.400"
          >
            <Text fontSize="48px">✓</Text>
          </Circle>

          {/* Titre */}
          <Heading
            fontFamily="heading"
            color="primary.900"
            size="2xl"
          >
            Commande confirmée !
          </Heading>

          {/* Message */}
          <Text color="gray.600" fontSize="lg" maxW="480px">
            Merci pour votre commande. Votre café d'exception sera préparé avec soin
            et expédié dans les prochains jours ouvrés.
          </Text>

          <Text color="gray.500" fontSize="sm">
            Un email de confirmation vous sera envoyé prochainement.
          </Text>

          {/* Actions */}
          <VStack spacing={3} pt={4} w="100%" maxW="320px">
            <Button
              variant="primary"
              size="lg"
              w="100%"
              onClick={() => navigate('/')}
            >
              Retour à l'accueil
            </Button>
          </VStack>

        </VStack>
      </Container>
    </PageLayout>
  );
};

export default OrderConfirmationPage;
