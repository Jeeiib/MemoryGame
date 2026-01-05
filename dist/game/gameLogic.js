import { GameStatus } from '../types.js';
import { getState, setState, resetState } from './gameState.js';
import { PAIRS_COUNT, FLIP_DELAY } from './gameConfig.js';
/**
 * Callback appelé quand l'UI doit se mettre à jour
 */
let onUpdate = null;
/**
 * Permet à l'UI de s'abonner aux changements d'état
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
        status: GameStatus.PLAYING,
        startTime: Date.now()
    });
    notifyUpdate();
}
/**
 * Gère le clic sur une carte
 */
export function flipCard(cardId) {
    const state = getState();
    // Vérifications
    if (state.status !== GameStatus.PLAYING)
        return;
    if (state.flippedCards.length >= 2)
        return;
    // Trouve la carte cliquée
    const card = state.cards.find(c => c.id === cardId);
    if (!card)
        return;
    if (card.isFlipped)
        return;
    if (card.isMatched)
        return;
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
    // Sécurité TypeScript : on vérifie que les cartes existent
    if (!firstCard || !secondCard)
        return;
    // Incrémente le compteur de coups
    const newMoves = state.moves + 1;
    setState({ moves: newMoves });
    if (firstCard.value === secondCard.value) {
        handleMatch(firstCard, secondCard);
    }
    else {
        handleNoMatch(firstCard, secondCard);
    }
}
/**
 * Gère le cas où les deux cartes matchent
 */
function handleMatch(firstCard, secondCard) {
    const state = getState();
    firstCard.isMatched = true;
    secondCard.isMatched = true;
    const newMatchedPairs = state.matchedPairs + 1;
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
function handleNoMatch(firstCard, secondCard) {
    setTimeout(() => {
        firstCard.isFlipped = false;
        secondCard.isFlipped = false;
        setState({ flippedCards: [] });
        notifyUpdate();
    }, FLIP_DELAY);
}
/**
 * Calcule le temps écoulé depuis le début de la partie
 */
export function getElapsedTime() {
    const state = getState();
    if (!state.startTime)
        return 0;
    return Math.floor((Date.now() - state.startTime) / 1000);
}
//# sourceMappingURL=gameLogic.js.map