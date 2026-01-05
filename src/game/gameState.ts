import { Card, GameState, GameStatus } from '../types.js';
import { CARD_SYMBOLS } from './gameConfig.js';
import { shuffle } from '../utils/shuffle.js';

/**
 * Crée une carte avec ses propriétés
 */
function createCard(id: number, value: string): Card {
  return {
    id,
    value,
    isFlipped: false,
    isMatched: false
  };
}

/**
 * Génère le jeu de cartes initial
 * Chaque symbole apparaît 2 fois, puis tout est mélangé
 */
function generateCards(): Card[] {
  const cards: Card[] = [];
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
 */
export function createInitialState(): GameState {
  return {
    cards: generateCards(),
    flippedCards: [],
    matchedPairs: 0,
    moves: 0,
    startTime: null,
    status: GameStatus.IDLE
  };
}

/**
 * Variable privée contenant l'état actuel
 * Non exportée = encapsulation
 */
let gameState: GameState = createInitialState();

/**
 * Récupère l'état actuel
 */
export function getState(): GameState {
  return gameState;
}

/**
 * Met à jour l'état avec de nouvelles valeurs
 * Partial<GameState> = toutes les propriétés sont optionnelles
 */
export function setState(newState: Partial<GameState>): void {
  gameState = { ...gameState, ...newState };
}

/**
 * Réinitialise complètement le jeu
 */
export function resetState(): void {
  gameState = createInitialState();
}
