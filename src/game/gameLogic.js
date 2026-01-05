import { getState, setState, resetState } from './gameState.js';
import { GAME_STATUS, PAIRS_COUNT, FLIP_DELAY } from './gameConfig.js';

/**
 * Callback appelé quand l'UI doit se mettre à jour
 * Sera défini par l'UI via setUpdateCallback
 */
let onUpdate = null;

/**
 * Permet à l'UI de s'abonner aux changements d'état
 * @param {Function} callback - Fonction appelée à chaque mise à jour
 */
export function setUpdateCallback(callback) {
  onUpdate = callback;
}

/**
 * Notifie l'UI qu'une mise à jour est nécessaire
 */
function notifyUpdate() {
  if (onUpdate) {
    onUpdate(getState());
  }
}

/**
 * Démarre une nouvelle partie
 */
export function startGame() {
  resetState();
  setState({
    status: GAME_STATUS.PLAYING,
    startTime: Date.now()
  });
  notifyUpdate();
}

/**
 * Gère le clic sur une carte
 * C'est LA fonction centrale de la logique de jeu
 * @param {number} cardId - ID de la carte cliquée
 */
export function flipCard(cardId) {
  const state = getState();

  // Vérifications : on ignore le clic si...
  if (state.status !== GAME_STATUS.PLAYING) return;  // Partie non en cours
  if (state.flippedCards.length >= 2) return;        // Déjà 2 cartes retournées

  // Trouve la carte cliquée
  const card = state.cards.find(c => c.id === cardId);

  if (!card) return;                    // Carte inexistante
  if (card.isFlipped) return;           // Déjà retournée
  if (card.isMatched) return;           // Déjà matchée

  // Retourne la carte
  card.isFlipped = true;
  const newFlippedCards = [...state.flippedCards, cardId];

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
function checkForMatch() {
  const state = getState();
  const [firstId, secondId] = state.flippedCards;

  const firstCard = state.cards.find(c => c.id === firstId);
  const secondCard = state.cards.find(c => c.id === secondId);

  // Incrémente le compteur de coups
  const newMoves = state.moves + 1;
  setState({ moves: newMoves });

  if (firstCard.value === secondCard.value) {
    // MATCH ! Les cartes restent visibles
    handleMatch(firstCard, secondCard);
  } else {
    // Pas de match : on retourne les cartes après un délai
    handleNoMatch(firstCard, secondCard);
  }
}

/**
 * Gère le cas où les deux cartes matchent
 */
function handleMatch(firstCard, secondCard) {
  const state = getState();

  // Marque les cartes comme matchées
  firstCard.isMatched = true;
  secondCard.isMatched = true;

  const newMatchedPairs = state.matchedPairs + 1;

  setState({
    flippedCards: [],
    matchedPairs: newMatchedPairs
  });

  // Vérifie si la partie est gagnée
  if (newMatchedPairs === PAIRS_COUNT) {
    setState({ status: GAME_STATUS.WON });
  }

  notifyUpdate();
}

/**
 * Gère le cas où les cartes ne matchent pas
 */
function handleNoMatch(firstCard, secondCard) {
  // Délai pour laisser le joueur voir les cartes
  setTimeout(() => {
    firstCard.isFlipped = false;
    secondCard.isFlipped = false;

    setState({ flippedCards: [] });
    notifyUpdate();
  }, FLIP_DELAY);
}

/**
 * Calcule le temps écoulé depuis le début de la partie
 * @returns {number} - Temps en secondes
 */
export function getElapsedTime() {
  const state = getState();

  if (!state.startTime) return 0;
  if (state.status === GAME_STATUS.WON) {
    // Si gagné, on fige le temps au moment de la victoire
    return Math.floor((Date.now() - state.startTime) / 1000);
  }

  return Math.floor((Date.now() - state.startTime) / 1000);
}
