import type { Character } from '../types/character';
import CharacterCard from './CharacterCard';

type CharacterGridProps = {
  characters: Character[];
};

function CharacterGrid({ characters }: CharacterGridProps) {
  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
      }}
    >
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </section>
  );
}

export default CharacterGrid;