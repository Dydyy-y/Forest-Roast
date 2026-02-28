import { Routes, Route, Link } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";
import { HomePage } from "../pages/HomePage";
import { ProductDetailPage } from "../pages/ProductDetailPage";
import { LoginPage } from "../pages/LoginPage";
import { ProfilePage } from "../pages/ProfilePage";
import { CartPage } from "../pages/CartPage";
import { OrderConfirmationPage } from "../pages/OrderConfirmationPage";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { SubscriptionPage } from "../pages/SubscriptionPage";
import { CoffeePage } from "../pages/CoffeePage";
import { PageLayout } from "../components/shared/layout/PageLayout";

//404
const NotFoundPage = () => (
  <PageLayout>
    <Box textAlign="center" py={20} px={6}>
      <Heading size="4xl" color="primary.900" mb={4}>404</Heading>
      <Text fontSize="lg" color="gray.500" mb={6}>
        Page introuvable. Cette page n&apos;existe pas.
      </Text>
      <Link to="/" style={{ color: "#c8962e", textDecoration: "underline" }}>
        Retour à l&apos;accueil
      </Link>
    </Box>
  </PageLayout>
);

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order-confirmation"
        element={
          <ProtectedRoute>
            <OrderConfirmationPage />
          </ProtectedRoute>
        }
      />
      <Route path="/abonnement" element={<SubscriptionPage />} />
      <Route path="/cafes" element={<CoffeePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
