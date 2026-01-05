import { flipCard } from '../game/gameLogic.js';

/**
 * Référence vers le conteneur de la grille
 */
let boardElement = null;

/**
 * Initialise le plateau de jeu
 * @param {HTMLElement} container - L'élément qui contiendra la grille
 */
export function initBoard(container) {
  boardElement = container;
}

/**
 * Crée l'élément HTML pour une carte
 * @param {Object} card - Les données de la carte
 * @returns {HTMLElement} - L'élément carte
 */
function createCardElement(card) {
  // Conteneur de la carte (gère la perspective 3D)
  const cardEl = document.createElement('div');
  cardEl.className = 'card';
  cardEl.dataset.id = card.id;

  // Face arrière (visible quand carte cachée)
  const backFace = document.createElement('div');
  backFace.className = 'card-face card-back';
  backFace.textContent = '?';

  // Face avant (le symbole)
  const frontFace = document.createElement('div');
  frontFace.className = 'card-face card-front';
  frontFace.textContent = card.value;

  cardEl.appendChild(backFace);
  cardEl.appendChild(frontFace);

  // Gestionnaire de clic
  cardEl.addEventListener('click', () => {
    flipCard(card.id);
  });

  return cardEl;
}

/**
 * Met à jour l'affichage du plateau
 * @param {Array} cards - Les cartes à afficher
 */
export function renderBoard(cards) {
  if (!boardElement) return;

  // Première fois : on crée toutes les cartes
  if (boardElement.children.length === 0) {
    cards.forEach(card => {
      boardElement.appendChild(createCardElement(card));
    });
  }

  // Mise à jour des classes CSS selon l'état de chaque carte
  cards.forEach(card => {
    const cardEl = boardElement.querySelector(`[data-id="${card.id}"]`);
    if (!cardEl) return;

    // Toggle des classes selon l'état
    cardEl.classList.toggle('flipped', card.isFlipped || card.isMatched);
    cardEl.classList.toggle('matched', card.isMatched);
  });
}

/**
 * Vide le plateau pour une nouvelle partie
 * Utilise removeChild au lieu de innerHTML pour éviter les risques XSS
 */
export function clearBoard() {
  if (boardElement) {
    while (boardElement.firstChild) {
      boardElement.removeChild(boardElement.firstChild);
    }
  }
}
