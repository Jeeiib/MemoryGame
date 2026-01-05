/**
 * Configuration du jeu Memory
 * Centralise toutes les constantes pour faciliter les modifications
 */

// Symboles des cartes (emojis pour un rendu visuel simple)
export const CARD_SYMBOLS: readonly string[] = [
  '🍎', '🍊', '🍋', '🍇',
  '🍓', '🍒', '🥝', '🍑'
] as const;

// Nombre de paires = nombre de symboles
export const PAIRS_COUNT: number = CARD_SYMBOLS.length;

// Délai avant de retourner les cartes non-matchées (en ms)
export const FLIP_DELAY: number = 1000;

// Ré-export de l'enum depuis types.ts pour compatibilité
export { GameStatus } from '../types.js';
