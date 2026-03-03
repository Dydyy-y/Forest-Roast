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
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Alert,
  AlertIcon,
  AlertDescription,
  Divider,
} from '@chakra-ui/react';
import { authService } from '../services/auth.service';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // récupère la fonction login depuis le contexte global

  // Formulaire "Se connecter"
  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');
  const [signinLoading, setSigninLoading] = useState(false);
  const [signinError, setSigninError] = useState<string | null>(null);

  // Formulaire "S'inscrire"
  const [signupFirstName, setSignupFirstName] = useState('');
  const [signupLastName, setSignupLastName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSigninError(null);
    setSigninLoading(true);

    try {
      // Appel API POST /api/users/signin
      const response = await authService.signin({
        emailAddress: signinEmail,
        password: signinPassword,
      });

      /**
       * Connexion réussie :
       * 1. Appeler login() du contexte → sauvegarde token + user dans localStorage
       * 2. Rediriger vers la Home
       */
      login(response.token, response.user);
      navigate('/');
    } catch (err) {
      // Afficher le message d'erreur (ex: "Authentication failed" si 401)
      const message = err instanceof Error ? err.message : 'Erreur de connexion';
      setSigninError(message);
    } finally {
      setSigninLoading(false);
    }
  };

  // Inscription
  /**
   * Soumission du formulaire d'inscription
   *
   * Après un signup réussi, on fait automatiquement un signin pour obtenir le JWT
   * (l'API signup renvoie juste le User sans token)
   */
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError(null);
    setSignupLoading(true);

    try {
      // Étape 1 : créer le compte via POST /api/users/signup
      await authService.signup({
        firstName: signupFirstName,
        lastName: signupLastName,
        emailAddress: signupEmail,
        password: signupPassword,
      });

      /**
       * Étape 2 : connexion automatique après inscription
       * L'API signup renvoie l'User sans token → on fait un signin pour obtenir le JWT
       */
      const signinResponse = await authService.signin({
        emailAddress: signupEmail,
        password: signupPassword,
      });

      // Étape 3 : sauvegarder la session + redirection
      login(signinResponse.token, signinResponse.user);
      navigate('/');
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors de l'inscription";
      setSignupError(message);
    } finally {
      setSignupLoading(false);
    }
  };

  // Rendu
  return (
    <Box
      minHeight="100vh"
      bg="background.cream"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Box
        bg="white"
        borderRadius="2xl"
        boxShadow="lg"
        p={{ base: 6, md: 10 }}
        w="100%"
        maxW="440px"
      >
        {/* Logo / Titre */}
        <VStack spacing={1} mb={6} textAlign="center">
          <Heading
            size="lg"
            color="primary.900"
            fontFamily="Georgia, serif"
            letterSpacing="wide"
          >
            ☕ Coopérative du Café
          </Heading>
          <Text color="gray.500" fontSize="sm">
            Connectez-vous pour accéder à votre compte
          </Text>
        </VStack>

        <Divider mb={6} />

        <Tabs isFitted variant="enclosed" colorScheme="orange">
          <TabList mb={4}>
            <Tab
              fontWeight="semibold"
              _selected={{ color: 'primary.900', borderColor: 'primary.900', bg: 'background.cream' }}
            >
              Se connecter
            </Tab>
            <Tab
              fontWeight="semibold"
              _selected={{ color: 'primary.900', borderColor: 'primary.900', bg: 'background.cream' }}
            >
              S'inscrire
            </Tab>
          </TabList>

          <TabPanels>
            {/* ONGLET 1 — Connexion */}
            <TabPanel px={0}>
              {/* Affichage de l'erreur API — visible seulement si signinError est non-null */}
              {signinError && (
                <Alert status="error" borderRadius="md" mb={4}>
                  <AlertIcon />
                  <AlertDescription fontSize="sm">{signinError}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSignin}>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel color="primary.900" fontWeight="medium">
                      Adresse email
                    </FormLabel>
                    <Input
                      type="email"
                      placeholder="votre@email.com"
                      value={signinEmail}
                      onChange={(e) => setSigninEmail(e.target.value)}
                      borderColor="gray.300"
                      _focus={{ borderColor: 'primary.900', boxShadow: '0 0 0 1px #3E2723' }}
                      autoComplete="email"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color="primary.900" fontWeight="medium">
                      Mot de passe
                    </FormLabel>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={signinPassword}
                      onChange={(e) => setSigninPassword(e.target.value)}
                      borderColor="gray.300"
                      _focus={{ borderColor: 'primary.900', boxShadow: '0 0 0 1px #3E2723' }}
                      autoComplete="current-password"
                    />
                  </FormControl>

                  {/**
                   * isLoading : Chakra affiche un spinner + désactive le bouton automatiquement
                   * type="submit" → déclenche onSubmit du formulaire
                   */}
                  <Button
                    type="submit"
                    isLoading={signinLoading}
                    loadingText="Connexion..."
                    bg="primary.900"
                    color="white"
                    w="100%"
                    size="md"
                    mt={2}
                    _hover={{ bg: 'primary.700' }}
                    borderRadius="md"
                  >
                    Se connecter
                  </Button>
                </VStack>
              </form>
            </TabPanel>

            {/* ONGLET 2 — Inscription */}
            <TabPanel px={0}>
              {signupError && (
                <Alert status="error" borderRadius="md" mb={4}>
                  <AlertIcon />
                  <AlertDescription fontSize="sm">{signupError}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSignup}>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel color="primary.900" fontWeight="medium">
                      Prénom
                    </FormLabel>
                    <Input
                      type="text"
                      placeholder="Jean"
                      value={signupFirstName}
                      onChange={(e) => setSignupFirstName(e.target.value)}
                      borderColor="gray.300"
                      _focus={{ borderColor: 'primary.900', boxShadow: '0 0 0 1px #3E2723' }}
                      autoComplete="given-name"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color="primary.900" fontWeight="medium">
                      Nom
                    </FormLabel>
                    <Input
                      type="text"
                      placeholder="Dupont"
                      value={signupLastName}
                      onChange={(e) => setSignupLastName(e.target.value)}
                      borderColor="gray.300"
                      _focus={{ borderColor: 'primary.900', boxShadow: '0 0 0 1px #3E2723' }}
                      autoComplete="family-name"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color="primary.900" fontWeight="medium">
                      Adresse email
                    </FormLabel>
                    <Input
                      type="email"
                      placeholder="votre@email.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      borderColor="gray.300"
                      _focus={{ borderColor: 'primary.900', boxShadow: '0 0 0 1px #3E2723' }}
                      autoComplete="email"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color="primary.900" fontWeight="medium">
                      Mot de passe
                    </FormLabel>
                    <Input
                      type="password"
                      placeholder="Minimum 6 caractères"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      borderColor="gray.300"
                      _focus={{ borderColor: 'primary.900', boxShadow: '0 0 0 1px #3E2723' }}
                      autoComplete="new-password"
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    isLoading={signupLoading}
                    loadingText="Inscription..."
                    bg="secondary.400"
                    color="white"
                    w="100%"
                    size="md"
                    mt={2}
                    _hover={{ bg: 'secondary.300' }}
                    borderRadius="md"
                  >
                    Créer mon compte
                  </Button>
                </VStack>
              </form>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};
