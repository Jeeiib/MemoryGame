/**
 * Point d'entrée de l'application Memory Game
 * Orchestre l'initialisation et connecte la logique à l'UI
 */

import { GameState } from './types.js';
import { startGame, setUpdateCallback } from './game/gameLogic.js';
import { initBoard, renderBoard, clearBoard } from './ui/boardUI.js';
import { initStats, renderStats, resetStats, startTimer } from './ui/statsUI.js';

/**
 * Callback appelé à chaque mise à jour de l'état
 */
function onGameUpdate(state: GameState): void {
  renderBoard(state.cards);
  renderStats(state);
}

/**
 * Lance une nouvelle partie
 */
function handleNewGame(): void {
  clearBoard();
  resetStats();
  startGame();
  startTimer();
}

/**
 * Initialisation au chargement de la page
 */
function init(): void {
  // Récupère les éléments du DOM avec vérification de type
  const boardEl = document.getElementById('game-board');
  const movesEl = document.getElementById('moves-count');
  const timerEl = document.getElementById('timer');
  const messageEl = document.getElementById('message');
  const newGameBtn = document.getElementById('new-game-btn');

  // Vérifie que tous les éléments existent
  if (!boardEl || !movesEl || !timerEl || !messageEl || !newGameBtn) {
    console.error('Éléments du DOM manquants');
    return;
  }

  // Initialise les modules UI
  initBoard(boardEl);
  initStats(movesEl, timerEl, messageEl);

  // Connecte la logique à l'UI
  setUpdateCallback(onGameUpdate);

  // Gestionnaire du bouton
  newGameBtn.addEventListener('click', handleNewGame);

  // Lance la première partie
  handleNewGame();
}

// Attend que le DOM soit prêt
document.addEventListener('DOMContentLoaded', init);
