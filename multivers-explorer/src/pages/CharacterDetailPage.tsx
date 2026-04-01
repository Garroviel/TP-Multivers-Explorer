import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import { fetchCharacterById } from '../services/characterService';
import type { Character } from '../types/character';
import ReviewForm from "../components/form"

function CharacterDetailPage() {
	const { id } = useParams<{ id:string }>()

	const [character, setCharacter] = useState<Character | null>(null)
	const [error, setError] = useState<string>('');
	const [ loading, setLoading] = useState(true)

	useEffect(() => {
		async function loadCharacter() {
			if (!id) {
				setError("Aucun personnage trouvé");
				setLoading(false)
				return;
			}

			try {
				setError('');
				setLoading(true);

				const data = await fetchCharacterById(id);
				setCharacter(data);

			} catch (error) {
				if (error instanceof Error) {
					setError("Une erreur est survenue lors du chargement.");
				}
			} finally {
				setLoading(false);
			}
		}

		loadCharacter();

		
	}, [id])

  return (
     <section style={{ padding: '1rem' }}>
      {loading && <Loader />}

      {!loading && error && <ErrorMessage message={error} />}

      {!loading && !error && character && (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <article
            style={{
              border: '1px solid #ddd',
              borderRadius: '12px',
              padding: '1.5rem',
              textAlign: 'center',
            }}
          >
            <h1>{character.name}</h1>

            <img
              src={character.image}
              alt={character.name}
              style={{ width: '100%', maxWidth: '300px', borderRadius: '12px' }}
            />

            <p>
              <strong>Statut :</strong> {character.status}
            </p>

            <p>
              <strong>Espèce :</strong> {character.species}
            </p>

            <p>
              <strong>Origine :</strong> {character.origin.name}
            </p>
          </article>

          <ReviewForm />
        </div>
      )}
    </section>
  );
}

export default CharacterDetailPage;