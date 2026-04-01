import type { Character, CharactersApiResponse } from '../types/character';

const BASE_URL = 'https://rickandmortyapi.com/api/character';

export async function fetchCharacters(page: number): Promise<CharactersApiResponse> { // cette fonction retourne une promesse qui, une fois résolue, donnera un CharactersApiResponse 
  const response = await fetch(`${BASE_URL}?page=${page}`);
	// Promise, c’est une valeur asynchrone.
  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Trop de requêtes envoyées. Attendez un instant avant de réessayer.');
    }

    throw new Error('Une erreur est survenue lors du chargement des personnages.');
  }

  const data: CharactersApiResponse = await response.json();
  return data;
}

export async function fetchCharacterById(id: string): Promise<Character> {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error('Impossible de charger les détails du personnage.');
  }

  const data: Character = await response.json();
  return data;
}