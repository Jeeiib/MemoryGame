/**
 * Point d'entrée de l'application Memory Game
 * Orchestre l'initialisation et connecte la logique à l'UI
 */

import { startGame, setUpdateCallback } from './game/gameLogic.js';
import { initBoard, renderBoard, clearBoard } from './ui/boardUI.js';
import { initStats, renderStats, resetStats, startTimer } from './ui/statsUI.js';

/**
 * Callback appelé à chaque mise à jour de l'état
 * C'est ici que la logique et l'UI se rencontrent
 * @param {Object} state - Le nouvel état du jeu
 */
function onGameUpdate(state) {
  renderBoard(state.cards);
  renderStats(state);
}

/**
 * Lance une nouvelle partie
 */
function handleNewGame() {
  clearBoard();
  resetStats();
  startGame();
  startTimer();
}

/**
 * Initialisation au chargement de la page
 */
function init() {
  // Récupère les éléments du DOM
  const boardEl = document.getElementById('game-board');
  const movesEl = document.getElementById('moves-count');
  const timerEl = document.getElementById('timer');
  const messageEl = document.getElementById('message');
  const newGameBtn = document.getElementById('new-game-btn');

  // Initialise les modules UI avec leurs éléments
  initBoard(boardEl);
  initStats(movesEl, timerEl, messageEl);

  // Connecte la logique à l'UI via le callback
  setUpdateCallback(onGameUpdate);

  // Gestionnaire du bouton "Nouvelle partie"
  newGameBtn.addEventListener('click', handleNewGame);

  // Lance la première partie automatiquement
  handleNewGame();
}

// Attend que le DOM soit prêt avant d'initialiser
document.addEventListener('DOMContentLoaded', init);
