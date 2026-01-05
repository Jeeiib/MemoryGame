/**
 * Types et interfaces pour le Memory Game
 * Centralise toutes les définitions de types
 */
/**
 * États possibles du jeu
 * Enum = ensemble de valeurs nommées constantes
 */
export var GameStatus;
(function (GameStatus) {
    GameStatus["IDLE"] = "idle";
    GameStatus["PLAYING"] = "playing";
    GameStatus["WON"] = "won";
})(GameStatus || (GameStatus = {}));
//# sourceMappingURL=types.js.map