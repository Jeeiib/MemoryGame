import { Card } from '../types.js';
/**
 * Initialise le plateau de jeu
 */
export declare function initBoard(container: HTMLElement): void;
/**
 * Met à jour l'affichage du plateau
 */
export declare function renderBoard(cards: Card[]): void;
/**
 * Vide le plateau pour une nouvelle partie
 */
export declare function clearBoard(): void;
