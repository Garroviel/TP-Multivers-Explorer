export type Character = {
  id: number;
  name: string;
  species: string;
  image: string;
  status: string;
  origin: {
	name: string;
  };
};

export type CharactersApiResponse = {
  info: {
	count: number;
	pages: number;
	next: string | null;
	prev: string | null;
  };
  results: Character[];
};