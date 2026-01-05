/**
 * Types et interfaces pour le Memory Game
 * Centralise toutes les définitions de types
 */
/**
 * États possibles du jeu
 * Enum = ensemble de valeurs nommées constantes
 */
export declare enum GameStatus {
    IDLE = "idle",
    PLAYING = "playing",
    WON = "won"
}
/**
 * Représente une carte du jeu
 */
export interface Card {
    /** Identifiant unique de la carte */
    id: number;
    /** Symbole affiché (emoji) */
    value: string;
    /** Est-ce que la carte est retournée ? */
    isFlipped: boolean;
    /** Est-ce que la carte a trouvé sa paire ? */
    isMatched: boolean;
}
/**
 * État complet du jeu à un instant T
 */
export interface GameState {
    /** Toutes les cartes du jeu */
    cards: Card[];
    /** IDs des cartes actuellement retournées (max 2) */
    flippedCards: number[];
    /** Nombre de paires trouvées */
    matchedPairs: number;
    /** Nombre de coups joués */
    moves: number;
    /** Timestamp du début de partie (null si non démarrée) */
    startTime: number | null;
    /** État actuel du jeu */
    status: GameStatus;
}
/**
 * Type pour le callback de mise à jour de l'UI
 */
export type UpdateCallback = (state: GameState) => void;
