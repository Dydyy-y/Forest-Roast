import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Divider,
  Alert,
  AlertIcon,
  AlertDescription,
  Avatar,
  Container,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/user.service';
import { PageLayout } from '../components/shared/layout/PageLayout';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();

  const [firstName, setFirstName] = useState(user?.firstName ?? '');
  const [lastName, setLastName] = useState(user?.lastName ?? '');
  const [email, setEmail] = useState(user?.emailAddress ?? '');
  const [password, setPassword] = useState(''); // vide par défaut — n'envoyer que si rempli

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    if (!user) return;

    try {
      /**
       * Envoi conditionnel
       * On ne construit l'objet qu'avec les champs non vides.
       * Spread + condition : { ...base, ...(condition && { key: value }) }
       *
       * Ne jamais envoyer password: "" → l'API écraserait le mot de passe
       */
      const data = {
        firstName,
        lastName,
        emailAddress: email,
        ...(password.trim() !== '' && { password }),
      };

      const updatedUser = await userService.update(user.id, data);

      /**
       * Mise à jour du contexte global → tous les composants qui lisent
       * useAuth().user verront les nouvelles infos sans re-login
       */
      updateUser(updatedUser);
      setSuccess(true);
      setPassword(''); // vider le champ mot de passe après succès
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de la mise à jour';

      /**
       * 401 Unauthorized : le token a expiré
       * → on déconnecte l'utilisateur et on le renvoie vers /login
       */
      if (
        message.toLowerCase().includes('unauthorized') ||
        message.includes('401')
      ) {
        logout();
        navigate('/login');
        return;
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      {/* Contenu principal */}
      <Container maxW="container.sm" py={10}>
        {/* Avatar + titre */}
        <VStack spacing={4} mb={8} textAlign="center">
          {/**
           * 🎓 Avatar Chakra UI
           * name : Chakra extrait les initiales automatiquement (ex: "Jean Dupont" → "JD")
           * bg   : couleur de fond issue du design system
           */}
          <Avatar
            size="xl"
            name={`${user?.firstName} ${user?.lastName}`}
            bg="primary.900"
            color="white"
          />
          <Box>
            <Heading size="md" color="primary.900">
              {user?.firstName} {user?.lastName}
            </Heading>
            <Text color="gray.500" fontSize="sm">
              {user?.emailAddress}
            </Text>
          </Box>
        </VStack>

        <Divider mb={8} />

        {/* Feedback succès */}
        {success && (
          <Alert status="success" borderRadius="md" mb={6}>
            <AlertIcon />
            <AlertDescription>Profil mis à jour avec succès ✅</AlertDescription>
          </Alert>
        )}

        {/* Feedback erreur */}
        {error && (
          <Alert status="error" borderRadius="md" mb={6}>
            <AlertIcon />
            <AlertDescription fontSize="sm">{error}</AlertDescription>
          </Alert>
        )}

        {/* Formulaire de modification */}
        <Box bg="white" borderRadius="2xl" boxShadow="sm" p={{ base: 6, md: 8 }}>
          <Heading size="sm" color="primary.900" mb={6}>
            Modifier mes informations
          </Heading>

          <form onSubmit={handleSubmit}>
            <VStack spacing={5}>
              <FormControl>
                <FormLabel color="primary.900" fontWeight="medium">
                  Prénom
                </FormLabel>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  borderColor="gray.300"
                  _focus={{ borderColor: 'primary.900', boxShadow: '0 0 0 1px #3E2723' }}
                  autoComplete="given-name"
                />
              </FormControl>

              <FormControl>
                <FormLabel color="primary.900" fontWeight="medium">
                  Nom
                </FormLabel>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  borderColor="gray.300"
                  _focus={{ borderColor: 'primary.900', boxShadow: '0 0 0 1px #3E2723' }}
                  autoComplete="family-name"
                />
              </FormControl>

              <FormControl>
                <FormLabel color="primary.900" fontWeight="medium">
                  Adresse email
                </FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  borderColor="gray.300"
                  _focus={{ borderColor: 'primary.900', boxShadow: '0 0 0 1px #3E2723' }}
                  autoComplete="email"
                />
              </FormControl>

              <FormControl>
                <FormLabel color="primary.900" fontWeight="medium">
                  Nouveau mot de passe
                </FormLabel>
                <Input
                  type="password"
                  placeholder="Laisser vide pour ne pas modifier"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  borderColor="gray.300"
                  _focus={{ borderColor: 'primary.900', boxShadow: '0 0 0 1px #3E2723' }}
                  autoComplete="new-password"
                />
              </FormControl>

              <Button
                type="submit"
                isLoading={loading}
                loadingText="Enregistrement..."
                bg="primary.900"
                color="white"
                w="100%"
                _hover={{ bg: 'primary.700' }}
                borderRadius="md"
                mt={2}
              >
                Enregistrer les modifications
              </Button>
            </VStack>
          </form>
        </Box>
      </Container>
    </PageLayout>
  );
};
