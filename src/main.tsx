import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App.tsx';
import theme from './theme';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  /** React.StrictMode : est un wrapper qui active des vérifications supplémentaires en mode développement (désactivé en production)
   * vérif : - détecte les effets de bord inattendus
   * - avertit sur les APIs dépréciées
   * - double-invoque certains hooks pour détecter les bugs
   * En StrictMode, useEffect() s'exécute 2 fois en développement
   **/
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);