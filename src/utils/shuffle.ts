/**
 * Mélange un tableau en place avec l'algorithme Fisher-Yates
 * @param array - Le tableau à mélanger
 * @returns Le même tableau, mélangé
 */
export function shuffle<T>(array: T[]): T[] {
  // On parcourt le tableau de la fin vers le début
  for (let i = array.length - 1; i > 0; i--) {
    // On choisit un index aléatoire entre 0 et i (inclus)
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // On échange les éléments aux positions i et randomIndex
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }

  return array;
}
