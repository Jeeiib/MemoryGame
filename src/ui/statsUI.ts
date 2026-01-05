import { GameState, GameStatus } from '../types.js';
import { getElapsedTime } from '../game/gameLogic.js';
import { PAIRS_COUNT } from '../game/gameConfig.js';

/**
 * Références vers les éléments DOM des stats
 */
let movesElement: HTMLElement | null = null;
let timerElement: HTMLElement | null = null;
let messageElement: HTMLElement | null = null;

/**
 * ID de l'intervalle du chronomètre
 */
let timerInterval: number | null = null;

/**
 * Initialise les références aux éléments d'affichage
 */
export function initStats(
  movesEl: HTMLElement,
  timerEl: HTMLElement,
  messageEl: HTMLElement
): void {
  movesElement = movesEl;
  timerElement = timerEl;
  messageElement = messageEl;
}

/**
 * Formate le temps en MM:SS
 */
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Démarre le chronomètre
 */
export function startTimer(): void {
  stopTimer();

  timerInterval = window.setInterval((): void => {
    if (timerElement) {
      timerElement.textContent = formatTime(getElapsedTime());
    }
  }, 1000);
}

/**
 * Arrête le chronomètre
 */
export function stopTimer(): void {
  if (timerInterval !== null) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

/**
 * Met à jour l'affichage des statistiques
 */
export function renderStats(state: GameState): void {
  if (movesElement) {
    movesElement.textContent = state.moves.toString();
  }

  if (timerElement) {
    timerElement.textContent = formatTime(getElapsedTime());
  }

  if (messageElement) {
    if (state.status === GameStatus.WON) {
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
export function resetStats(): void {
  if (movesElement) movesElement.textContent = '0';
  if (timerElement) timerElement.textContent = '00:00';
  if (messageElement) {
    messageElement.textContent = '';
    messageElement.classList.remove('visible');
  }
}
