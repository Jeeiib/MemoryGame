import { getElapsedTime } from '../game/gameLogic.js';
import { GAME_STATUS, PAIRS_COUNT } from '../game/gameConfig.js';

/**
 * Références vers les éléments DOM des stats
 */
let movesElement = null;
let timerElement = null;
let messageElement = null;

/**
 * ID de l'intervalle du chronomètre
 */
let timerInterval = null;

/**
 * Initialise les références aux éléments d'affichage
 */
export function initStats(movesEl, timerEl, messageEl) {
  movesElement = movesEl;
  timerElement = timerEl;
  messageElement = messageEl;
}

/**
 * Formate le temps en MM:SS
 * @param {number} seconds - Temps en secondes
 * @returns {string} - Temps formaté
 */
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  // padStart ajoute des zéros devant si nécessaire : 5 → "05"
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Démarre le chronomètre
 */
export function startTimer() {
  // Nettoie un éventuel timer précédent
  stopTimer();

  // Met à jour toutes les secondes
  timerInterval = setInterval(() => {
    if (timerElement) {
      timerElement.textContent = formatTime(getElapsedTime());
    }
  }, 1000);
}

/**
 * Arrête le chronomètre
 */
export function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

/**
 * Met à jour l'affichage des statistiques
 * @param {Object} state - L'état actuel du jeu
 */
export function renderStats(state) {
  // Mise à jour du compteur de coups
  if (movesElement) {
    movesElement.textContent = state.moves;
  }

  // Mise à jour du timer
  if (timerElement) {
    timerElement.textContent = formatTime(getElapsedTime());
  }

  // Affichage du message de victoire
  if (messageElement) {
    if (state.status === GAME_STATUS.WON) {
      stopTimer();
      const time = formatTime(getElapsedTime());
      messageElement.textContent = `Bravo ! ${PAIRS_COUNT} paires trouvées en ${state.moves} coups (${time})`;
      messageElement.classList.add('visible');
    } else {
      messageElement.textContent = '';
      messageElement.classList.remove('visible');
    }
  }
}

/**
 * Réinitialise l'affichage des stats
 */
export function resetStats() {
  if (movesElement) movesElement.textContent = '0';
  if (timerElement) timerElement.textContent = '00:00';
  if (messageElement) {
    messageElement.textContent = '';
    messageElement.classList.remove('visible');
  }
}
