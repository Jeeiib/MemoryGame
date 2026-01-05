import { CARD_SYMBOLS, GAME_STATUS } from './gameConfig.js';
import { shuffle } from '../utils/shuffle.js';

/**
 * Crée une carte avec ses propriétés
 * @param {number} id - Identifiant unique de la carte
 * @param {string} value - Symbole de la carte
 * @returns {Object} - Objet carte
 */
function createCard(id, value) {
  return {
    id,           // Identifiant unique (pour le DOM et la logique)
    value,        // Le symbole (ce qui est comparé pour matcher)
    isFlipped: false,   // Est-ce que la carte est retournée ?
    isMatched: false    // Est-ce que la carte a trouvé sa paire ?
  };
}

/**
 * Génère le jeu de cartes initial
 * Chaque symbole apparaît 2 fois, puis tout est mélangé
 * @returns {Array} - Tableau de cartes mélangées
 */
function generateCards() {
  const cards = [];
  let id = 0;

  // Pour chaque symbole, on crée 2 cartes (la paire)
  CARD_SYMBOLS.forEach(symbol => {
    cards.push(createCard(id++, symbol));
    cards.push(createCard(id++, symbol));
  });

  return shuffle(cards);
}

/**
 * Crée un nouvel état de jeu initial
 * @returns {Object} - État complet du jeu
 */
export function createInitialState() {
  return {
    cards: generateCards(),      // Les 16 cartes mélangées
    flippedCards: [],            // IDs des cartes actuellement retournées (max 2)
    matchedPairs: 0,             // Nombre de paires trouvées
    moves: 0,                    // Nombre de coups joués
    startTime: null,             // Timestamp du début de partie
    status: GAME_STATUS.IDLE     // État actuel du jeu
  };
}

/**
 * Variable privée contenant l'état actuel
 * Non exportée = encapsulation (impossible d'y accéder directement)
 */
let gameState = createInitialState();

/**
 * Récupère l'état actuel (lecture seule conceptuellement)
 * @returns {Object} - L'état du jeu
 */
export function getState() {
  return gameState;
}

/**
 * Met à jour l'état avec de nouvelles valeurs
 * @param {Object} newState - Les propriétés à modifier
 */
export function setState(newState) {
  gameState = { ...gameState, ...newState };
}

/**
 * Réinitialise complètement le jeu
 */
export function resetState() {
  gameState = createInitialState();
}
