import { UpdateCallback } from '../types.js';
/**
 * Permet à l'UI de s'abonner aux changements d'état
 */
export declare function setUpdateCallback(callback: UpdateCallback): void;
/**
 * Démarre une nouvelle partie
 */
export declare function startGame(): void;
/**
 * Gère le clic sur une carte
 */
export declare function flipCard(cardId: number): void;
/**
 * Calcule le temps écoulé depuis le début de la partie
 */
export declare function getElapsedTime(): number;
