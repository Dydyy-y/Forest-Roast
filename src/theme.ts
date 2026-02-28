import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// Configuration du thème (color mode, etc.)
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// Palette de couleurs personnalisée
const colors = {
  // Couleurs Primaires - Profondeur & Sophistication
  primary: {
    900: '#3E2723', // Deep Roasted Coffee - Boutons principaux, titres
    800: '#2C2C2C', // Matte Charcoal - Texte principal, contrastes forts
    700: '#4E342E', // Variante plus claire pour hover states
  },
  
  // Couleurs Secondaires - Naturel & Chaleur
  secondary: {
    500: '#A4AC96', // Muted Sage Green - Boutons secondaires, accents doux
    400: '#C1766F', // Terracotta - Call-to-actions, badges, éléments chaleureux
    300: '#D4A5A5', // Variante plus claire terracotta pour hover
  },
  
  // Backgrounds - Élégance & Douceur
  background: {
    cream: '#F7F4F0', // Cream - Fond principal de l'application
    sand: '#EDE8E2',  // Sand - Sections alternées, cards
    white: '#FFFFFF', // Blanc pur pour contraste maximum
  },
  
  // Couleurs sémantiques (succès, erreur, etc.)
  success: '#6B8E23', // Vert olive naturel
  error: '#C1766F',   // Terracotta (réutilisé pour cohérence)
  warning: '#D4A574', // Ton chaud
  info: '#A4AC96',    // Sage (réutilisé)
};

// Typographie - Elegant Heritage
const fonts = {
  heading: "'Playfair Display', Georgia, serif", // Élégance, tradition, luxe
  body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", // Modernité, lisibilité
};

// Tailles de police (design system)
const fontSizes = {
  display: '60px',  // Titres hero (Elegant Heritage)
  h1: '40px',       // Premium Quality
  h2: '24px',       // Artisanal Craft
  large: '18px',    // Texte large (descriptions)
  body: '16px',     // Texte body standard
  label: '14px',    // Labels, metadata
  small: '12px',    // Notes de bas de page
};

// Espacements (design system)
const space = {
  xs: '0.25rem',  // 4px
  sm: '0.5rem',   // 8px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '3rem',  // 48px
  '3xl': '4rem',  // 64px
};

// Composants personnalisés
const components = {
  // Boutons - Rounded, Uppercase, Élégants
  Button: {
    baseStyle: {
      fontWeight: 'normal',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      transition: 'all 0.3s ease',
    },
    sizes: {
      lg: {
        h: '56px',
        fontSize: 'label',
        px: '40px',
        borderRadius: '50px',
      },
      md: {
        h: '44px',
        fontSize: 'label',
        px: '32px',
        borderRadius: '50px',
      },
      sm: {
        h: '36px',
        fontSize: 'small',
        px: '24px',
        borderRadius: '50px',
      },
    },
    variants: {
      // Bouton Primary - Deep Roasted Coffee (noir)
      primary: {
        bg: 'primary.900',
        color: 'white',
        _hover: {
          bg: 'primary.700',
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        },
        _active: {
          bg: 'primary.800',
          transform: 'translateY(0)',
        },
      },
      // Bouton Secondary - Muted Sage Green
      secondary: {
        bg: 'secondary.500',
        color: 'primary.900',
        _hover: {
          bg: 'secondary.400',
          transform: 'translateY(-2px)',
          boxShadow: 'md',
        },
      },
      // Bouton Outline - Contour noir
      outline: {
        border: '2px solid',
        borderColor: 'primary.900',
        color: 'primary.900',
        bg: 'transparent',
        _hover: {
          bg: 'primary.900',
          color: 'white',
        },
      },
      // Bouton Terracotta (CTA chaleureux)
      terracotta: {
        bg: 'secondary.400',
        color: 'white',
        _hover: {
          bg: 'secondary.300',
          transform: 'translateY(-2px)',
        },
      },
    },
    defaultProps: {
      size: 'md',
      variant: 'primary',
    },
  },

  // Cards
  Card: {
    baseStyle: {
      container: {
        bg: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        _hover: {
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          transform: 'translateY(-4px)',
        },
      },
    },
  },

  // Headings - Playfair Display
  Heading: {
    baseStyle: {
      fontFamily: 'heading',
      fontWeight: 'normal',
      color: 'primary.900',
      lineHeight: '1.2',
    },
    sizes: {
      display: {
        fontSize: 'display',
        lineHeight: '1.1',
      },
      xl: {
        fontSize: 'h1',
      },
      lg: {
        fontSize: 'h2',
      },
    },
  },

  // Text - Inter
  Text: {
    baseStyle: {
      fontFamily: 'body',
      color: 'primary.800',
      lineHeight: '1.6',
    },
    sizes: {
      large: {
        fontSize: 'large',
      },
      body: {
        fontSize: 'body',
      },
      label: {
        fontSize: 'label',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      },
    },
  },

  // Links
  Link: {
    baseStyle: {
      color: 'primary.900',
      textDecoration: 'underline',
      textUnderlineOffset: '4px',
      textDecorationThickness: '1px',
      transition: 'all 0.2s',
      _hover: {
        textDecorationThickness: '2px',
        color: 'secondary.400',
      },
    },
    variants: {
      arrow: {
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        _after: {
          content: '"→"',
          transition: 'transform 0.2s',
        },
        _hover: {
          _after: {
            transform: 'translateX(4px)',
          },
        },
      },
    },
  },

  // Alert — remplace les couleurs Chakra par défaut
  Alert: {
    variants: {
      subtle: {
        container: {
          bg: 'background.sand',
          borderRadius: '8px',
          borderLeft: '4px solid',
          borderColor: 'secondary.400',
        },
        title: { color: 'primary.900', fontWeight: '600' },
        description: { color: 'primary.800' },
        icon: { color: 'secondary.400' },
      },
    },
    defaultProps: { variant: 'subtle' },
  },

  // Badge — cohérent avec la palette
  Badge: {
    baseStyle: {
      borderRadius: '4px',
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      fontSize: 'small',
      fontWeight: '500',
      px: 2,
      py: 0.5,
    },
    variants: {
      subtle: {
        bg: 'background.sand',
        color: 'primary.900',
      },
      solid: {
        bg: 'primary.900',
        color: 'white',
      },
    },
    defaultProps: { variant: 'subtle' },
  },

  // Spinner — couleur marque
  Spinner: {
    baseStyle: {
      color: 'secondary.400',
    },
  },

  // Input & Form
  Input: {
    variants: {
      outline: {
        field: {
          borderColor: 'gray.300',
          borderRadius: '8px',
          _hover: {
            borderColor: 'primary.900',
          },
          _focus: {
            borderColor: 'primary.900',
            boxShadow: '0 0 0 1px #3E2723',
          },
        },
      },
    },
    defaultProps: {
      variant: 'outline',
    },
  },
};

// Styles globaux
const styles = {
  global: {
    body: {
      bg: 'background.cream',
      color: 'primary.800',
      fontFamily: 'body',
    },
    '*::placeholder': {
      color: 'gray.400',
    },
  },
};

// Export du thème complet
const theme = extendTheme({
  config,
  colors,
  fonts,
  fontSizes,
  space,
  components,
  styles,
});

export default theme;
