//Chaque <Route> associe un chemin URL à un composant React

import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { ProductDetailPage } from "../pages/ProductDetailPage";

//404
const NotFoundPage = () => (
  <div style={{ textAlign: "center", padding: "80px 20px" }}>
    <h1 style={{ fontSize: "48px", color: "#1a0a00" }}>404</h1>
    <p style={{ fontSize: "18px", color: "#6b7280" }}>
      Page introuvable. Cette page n'existe pas.
    </p>
    <a href="/" style={{ color: "#c8962e", textDecoration: "underline" }}>
      Retour à l'accueil
    </a>
  </div>
);

//Rendu à l'intérieur de <BrowserRouter> dans App.tsx
export const AppRouter = () => {
  return (
    <Routes>
      {/* Route principale*/}
      <Route path="/" element={<HomePage />} />

      {/* Route dynamique : :id est extrait avec useParams() dans ProductDetailPage */}
      <Route path="/product/:id" element={<ProductDetailPage />} />

      {/* Catch-all : redirige toute route inconnue vers la 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
