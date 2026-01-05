# Memory Game

Jeu de Memory classique développé en JavaScript ES6+ puis migré vers TypeScript.

## Lancer le jeu

Le projet utilise des modules ES6, il nécessite un serveur HTTP local :

```bash
# Installer les dépendances (pour TypeScript)
npm install

# Compiler TypeScript
npm run build

# Lancer un serveur local
npx serve .
```

Puis ouvrir :
- http://localhost:3000 → Version JavaScript (`index.html`)
- http://localhost:3000/index-ts.html → Version TypeScript

## Architecture

```
src/
├── main.js              # Point d'entrée, orchestration
├── game/
│   ├── gameConfig.js    # Configuration (symboles, délais, états)
│   ├── gameState.js     # Gestion de l'état du jeu
│   └── gameLogic.js     # Logique métier (règles du jeu)
├── ui/
│   ├── boardUI.js       # Affichage du plateau
│   └── statsUI.js       # Affichage des statistiques
└── utils/
    └── shuffle.js       # Algorithme de mélange Fisher-Yates
```

## Concepts clés

- **Séparation des responsabilités** : La logique métier (`game/`) ne connaît pas l'interface (`ui/`)
- **Pattern Observer** : L'UI s'abonne aux changements d'état via callback
- **Modules ES6** : Import/export pour l'encapsulation
- **État centralisé** : Toute l'application reflète un état unique

## Fonctionnalités

- Grille de 16 cartes (8 paires)
- Animation de retournement 3D
- Compteur de coups
- Chronomètre
- Message de victoire
- Bouton "Nouvelle Partie"

---

## Comparatif JavaScript vs TypeScript

### Structure des fichiers

| JavaScript | TypeScript |
|------------|------------|
| `src/*.js` | `src/*.ts` → compile vers `dist/*.js` |
| Pas de config | `tsconfig.json` + `package.json` |
| Exécution directe | Compilation nécessaire |

### Différences de code

#### 1. Typage des fonctions

```javascript
// JavaScript - aucune indication sur les types
function shuffle(array) {
  // ...
}
```

```typescript
// TypeScript - types explicites + generics
function shuffle<T>(array: T[]): T[] {
  // ...
}
```

#### 2. Interfaces pour les structures de données

```javascript
// JavaScript - structure implicite
const card = { id: 1, value: '🍎', isFlipped: false };
```

```typescript
// TypeScript - contrat explicite
interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}
const card: Card = { id: 1, value: '🍎', isFlipped: false, isMatched: false };
```

#### 3. Enums vs objets constants

```javascript
// JavaScript - objet simple
const GAME_STATUS = { IDLE: 'idle', PLAYING: 'playing', WON: 'won' };
```

```typescript
// TypeScript - enum typé
enum GameStatus {
  IDLE = 'idle',
  PLAYING = 'playing',
  WON = 'won'
}
```

#### 4. Gestion du null

```javascript
// JavaScript - pas de vérification
const card = cards.find(c => c.id === id);
card.isFlipped = true; // Peut crasher si card est undefined
```

```typescript
// TypeScript - oblige à gérer le cas null
const card: Card | undefined = cards.find(c => c.id === id);
if (!card) return; // Obligatoire avec strictNullChecks
card.isFlipped = true;
```

### Avantages constatés avec TypeScript

| Aspect | Bénéfice |
|--------|----------|
| Autocomplétion | L'IDE suggère les propriétés de Card, GameState... |
| Erreurs précoces | Typo sur `isFlipped` → erreur à la compilation |
| Refactoring | Renommer `moves` → toutes les utilisations sont mises à jour |
| Documentation | Les types servent de documentation vivante |
| Maintenance | Code plus lisible pour les nouveaux développeurs |

### Inconvénients

- Configuration initiale (tsconfig, build)
- Étape de compilation avant exécution
- Courbe d'apprentissage pour les types avancés
