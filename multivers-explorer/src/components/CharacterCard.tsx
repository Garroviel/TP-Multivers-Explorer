import { Link } from 'react-router-dom';
import type { Character } from '../types/character';

type CharacterCardProps = {
  character: Character;
};

function CharacterCard({ character }: CharacterCardProps) {
  return (
    <article
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '1rem',
        textAlign: 'center',
      }}
    >
      <img
        src={character.image}
        alt={character.name}
        style={{ width: '100%', maxWidth: '200px', borderRadius: '8px' }}
      />
      <h2>{character.name}</h2>
      <p>Espèce : {character.species}</p>

      <Link to={`/character/${character.id}`}>Voir les détails</Link>
    </article>
  );
}

export default CharacterCard;