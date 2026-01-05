import { flipCard } from '../game/gameLogic.js';
/**
 * Référence vers le conteneur de la grille
 */
let boardElement = null;
/**
 * Initialise le plateau de jeu
 */
export function initBoard(container) {
    boardElement = container;
}
/**
 * Crée l'élément HTML pour une carte
 */
function createCardElement(card) {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';
    cardEl.dataset.id = card.id.toString();
    const backFace = document.createElement('div');
    backFace.className = 'card-face card-back';
    backFace.textContent = '?';
    const frontFace = document.createElement('div');
    frontFace.className = 'card-face card-front';
    frontFace.textContent = card.value;
    cardEl.appendChild(backFace);
    cardEl.appendChild(frontFace);
    cardEl.addEventListener('click', () => {
        flipCard(card.id);
    });
    return cardEl;
}
/**
 * Met à jour l'affichage du plateau
 */
export function renderBoard(cards) {
    if (!boardElement)
        return;
    // Première fois : on crée toutes les cartes
    if (boardElement.children.length === 0) {
        cards.forEach(card => {
            boardElement.appendChild(createCardElement(card));
        });
    }
    // Mise à jour des classes CSS selon l'état de chaque carte
    cards.forEach(card => {
        const cardEl = boardElement.querySelector(`[data-id="${card.id}"]`);
        if (!cardEl)
            return;
        cardEl.classList.toggle('flipped', card.isFlipped || card.isMatched);
        cardEl.classList.toggle('matched', card.isMatched);
    });
}
/**
 * Vide le plateau pour une nouvelle partie
 */
export function clearBoard() {
    if (boardElement) {
        boardElement.replaceChildren();
    }
}
//# sourceMappingURL=boardUI.js.map