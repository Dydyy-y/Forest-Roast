import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface PageLayoutProps {
  children: ReactNode;
  /** Couleur de fond de la zone de contenu (défaut : background.cream) */
  bg?: string;
}

export const PageLayout = ({ children, bg = 'background.cream' }: PageLayoutProps) => {
  return (
    <Box minH="100vh" bg={bg} display="flex" flexDirection="column">
      <Navbar />

      {/* Zone de contenu — s'étend pour remplir l'espace disponible */}
      <Box flex={1}>
        {children}
      </Box>

      <Footer />
    </Box>
  );
};
