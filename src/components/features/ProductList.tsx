import { useState, useEffect } from "react";
import {
  Box,
  SimpleGrid,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { productService } from "../../services/product.service";
import type { Product } from "../../types/product.types";

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);  //recup depuis api
  const [isLoading, setIsLoading] = useState<boolean>(true);  //indicateur chargement
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products...");
        setIsLoading(true);
        const data = await productService.getAll();
        console.log("Products fetched:", data);
        setProducts(data); //stocker les produit
        setError(null); //réinitialiser l'erreur
      } catch (err) {
        console.error("Error fetching products:", err);
        const errorMessage =
          err instanceof Error ? err.message : "Une erreur est survenue";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []); //[] : s'exécute qu'une fois

  if (isLoading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" color="blue.500" thickness="4px" />
        <Text mt={4} fontSize="lg">
          Chargement des produits...
        </Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        py={10}
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Erreur de chargement
        </AlertTitle>
        <AlertDescription maxWidth="sm" textAlign="center">
          {error}
        </AlertDescription>
        <Button
          mt={4}
          colorScheme="red"
          onClick={() => window.location.reload()}
        >
          Réessayer
        </Button>
      </Alert>
    );
  }

  if (products.length === 0) {  //aucun produit trouvé
    return (
      <Box textAlign="center" py={10}>
        <Text fontSize="xl" color="gray.500">
          Aucun produit disponible pour le moment.
        </Text>
      </Box>
    );
  }

  //affichage noraml
  return (
    <Box p={5}>
      <Heading mb={6} textAlign="center">
        Catalogue Produits
      </Heading>

      {
        
      }
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
        {products.map((product) => (  //.map() : transforme chaque élément d'un tableau en JSX. L'attribut "key" est obligatoire.Il permet à React d'identifier chaque élément de manière unique
          <Card
            key={product.id}
            boxShadow="md"
            _hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
            transition="all 0.2s"
          >
            <CardBody>
              {/* Image du produit */}
              <Image
                src={
                  product.images?.[0]?.link || "https://via.placeholder.com/300"
                }
                alt={product.name}
                borderRadius="lg"
                objectFit="cover"
                height="200px"
                width="100%"
              />

              <Stack mt={4} spacing={3}>
                {/* Nom du produit */}
                <Heading size="md" noOfLines={1}>
                  {product.name}
                </Heading>

                {/* Description (limitée à 2 lignes) */}
                <Text noOfLines={2} color="gray.600">
                  {product.description}
                </Text>

                {/* Prix */}
                <Text color="blue.600" fontSize="2xl" fontWeight="bold">
                  {product.price.toFixed(2)} €
                </Text>

                {/* Stock */}
                <Text
                  fontSize="sm"
                  color={product.stock > 0 ? "green.500" : "red.500"}
                >
                  {product.stock > 0
                    ? `En stock (${product.stock})`
                    : "Rupture de stock"}
                </Text>

                {/* Bouton "Voir le détail" */}
                <Button colorScheme="blue" size="md" width="full">
                  Voir le détail
                </Button>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default ProductList;