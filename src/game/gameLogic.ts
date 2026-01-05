import { Card, GameStatus, UpdateCallback } from '../types.js';
import { getState, setState, resetState } from './gameState.js';
import { PAIRS_COUNT, FLIP_DELAY } from './gameConfig.js';

/**
 * Callback appelé quand l'UI doit se mettre à jour
 */
let onUpdate: UpdateCallback | null = null;

/**
 * Permet à l'UI de s'abonner aux changements d'état
 */
export function setUpdateCallback(callback: UpdateCallback): void {
  onUpdate = callback;
}

/**
 * Notifie l'UI qu'une mise à jour est nécessaire
 */
function notifyUpdate(): void {
  if (onUpdate) {
    onUpdate(getState());
  }
}

/**
 * Démarre une nouvelle partie
 */
export function startGame(): void {
  resetState();
  setState({
    status: GameStatus.PLAYING,
    startTime: Date.now()
  });
  notifyUpdate();
}

/**
 * Gère le clic sur une carte
 */
export function flipCard(cardId: number): void {
  const state = getState();

  // Vérifications
  if (state.status !== GameStatus.PLAYING) return;
  if (state.flippedCards.length >= 2) return;

  // Trouve la carte cliquée
  const card: Card | undefined = state.cards.find(c => c.id === cardId);

  if (!card) return;
  if (card.isFlipped) return;
  if (card.isMatched) return;

  // Retourne la carte
  card.isFlipped = true;
  const newFlippedCards: number[] = [...state.flippedCards, cardId];

  setState({ flippedCards: newFlippedCards });
  notifyUpdate();

  // Si c'est la 2ème carte retournée, on vérifie le match
  if (newFlippedCards.length === 2) {
    checkForMatch();
  }
}

/**
 * Vérifie si les deux cartes retournées forment une paire
 */
function checkForMatch(): void {
  const state = getState();
  const [firstId, secondId] = state.flippedCards;

  const firstCard = state.cards.find(c => c.id === firstId);
  const secondCard = state.cards.find(c => c.id === secondId);

  // Sécurité TypeScript : on vérifie que les cartes existent
  if (!firstCard || !secondCard) return;

  // Incrémente le compteur de coups
  const newMoves: number = state.moves + 1;
  setState({ moves: newMoves });

  if (firstCard.value === secondCard.value) {
    handleMatch(firstCard, secondCard);
  } else {
    handleNoMatch(firstCard, secondCard);
  }
}

/**
 * Gère le cas où les deux cartes matchent
 */
function handleMatch(firstCard: Card, secondCard: Card): void {
  const state = getState();

  firstCard.isMatched = true;
  secondCard.isMatched = true;

  const newMatchedPairs: number = state.matchedPairs + 1;

  setState({
    flippedCards: [],
    matchedPairs: newMatchedPairs
  });

  // Vérifie si la partie est gagnée
  if (newMatchedPairs === PAIRS_COUNT) {
    setState({ status: GameStatus.WON });
  }

  notifyUpdate();
}

/**
 * Gère le cas où les cartes ne matchent pas
 */
function handleNoMatch(firstCard: Card, secondCard: Card): void {
  setTimeout((): void => {
    firstCard.isFlipped = false;
    secondCard.isFlipped = false;

    setState({ flippedCards: [] });
    notifyUpdate();
  }, FLIP_DELAY);
}

/**
 * Calcule le temps écoulé depuis le début de la partie
 */
export function getElapsedTime(): number {
  const state = getState();

  if (!state.startTime) return 0;

  return Math.floor((Date.now() - state.startTime) / 1000);
}
