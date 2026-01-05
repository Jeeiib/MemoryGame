import { GameState } from '../types.js';
/**
 * Initialise les références aux éléments d'affichage
 */
export declare function initStats(movesEl: HTMLElement, timerEl: HTMLElement, messageEl: HTMLElement): void;
/**
 * Démarre le chronomètre
 */
export declare function startTimer(): void;
/**
 * Arrête le chronomètre
 */
export declare function stopTimer(): void;
/**
 * Met à jour l'affichage des statistiques
 */
export declare function renderStats(state: GameState): void;
/**
 * Réinitialise l'affichage des stats
 */
export declare function resetStats(): void;
