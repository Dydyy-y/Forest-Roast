import { Routes, Route, Link } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { ProductDetailPage } from "../pages/ProductDetailPage";
import { LoginPage } from "../pages/LoginPage";
import { ProfilePage } from "../pages/ProfilePage";
import { CartPage } from "../pages/CartPage";
import { OrderConfirmationPage } from "../pages/OrderConfirmationPage";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { SubscriptionPage } from "../pages/SubscriptionPage";
import { CoffeePage } from "../pages/CoffeePage";

//404
const NotFoundPage = () => (
  <div style={{ textAlign: "center", padding: "80px 20px" }}>
    <h1 style={{ fontSize: "48px", color: "#1a0a00" }}>404</h1>
    <p style={{ fontSize: "18px", color: "#6b7280" }}>
      Page introuvable. Cette page n'existe pas.
    </p>
    <Link to="/" style={{ color: "#c8962e", textDecoration: "underline" }}>
      Retour à l'accueil
    </Link>
  </div>
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
