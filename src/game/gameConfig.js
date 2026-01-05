/**
 * Configuration du jeu Memory
 * Centralise toutes les constantes pour faciliter les modifications
 */

// Symboles des cartes (emojis pour un rendu visuel simple)
// Chaque symbole apparaîtra 2 fois dans le jeu
export const CARD_SYMBOLS = [
  '🍎', '🍊', '🍋', '🍇',
  '🍓', '🍒', '🥝', '🍑'
];

// Nombre de paires = nombre de symboles
export const PAIRS_COUNT = CARD_SYMBOLS.length;

// Délai avant de retourner les cartes non-matchées (en ms)
export const FLIP_DELAY = 1000;

// États possibles du jeu
export const GAME_STATUS = {
  IDLE: 'idle',         // Jeu non démarré
  PLAYING: 'playing',   // Partie en cours
  WON: 'won'           // Partie gagnée
};
