import { GameState } from '../types.js';
/**
 * Crée un nouvel état de jeu initial
 */
export declare function createInitialState(): GameState;
/**
 * Récupère l'état actuel
 */
export declare function getState(): GameState;
/**
 * Met à jour l'état avec de nouvelles valeurs
 * Partial<GameState> = toutes les propriétés sont optionnelles
 */
export declare function setState(newState: Partial<GameState>): void;
/**
 * Réinitialise complètement le jeu
 */
export declare function resetState(): void;
