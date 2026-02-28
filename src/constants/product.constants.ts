import type { RoastLevel } from '../types/product.types';

/**
 * Libellés lisibles en français pour les niveaux de torréfaction.
 * Centralisé ici pour éviter la duplication entre pages.
 */
export const ROAST_LABELS: Record<RoastLevel, string> = {
  light: 'Claire',
  medium: 'Médium',
  'medium-dark': 'Médium-foncé',
  dark: 'Foncée',
};
