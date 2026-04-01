import { useEffect, useState } from 'react';
import CharacterGrid from '../components/CharacterGrid';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import { fetchCharacters } from '../services/characterService';
import type { Character, CharactersApiResponse } from '../types/character';

function HomePage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1); // current page pour initialiser à page 1
  const [info, setInfo] = useState<CharactersApiResponse['info'] | null>(null); // pour récupérer next et prev de CharacterAPIresponse

  useEffect(() => {
    async function loadCharacters() {
      try {
        setLoading(true);
        setError('');

        const data = await fetchCharacters(currentPage); // fetch fonction service avec currentPage 
        setCharacters(data.results);
        setInfo(data.info);	// pour obtenir info prev et next 
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Une erreur est survenue, réessayez.');
        }
      } finally {
        setLoading(false);
      }
    }

    loadCharacters();
  }, [currentPage]); // useEffect dépend de current page - fetch nouvelle page

  function handlePreviousPage() {
    if (info?.prev) { // vérifie page précédente existe avant décrémenter
		// ?. si info vaut null, ça évite une erreur et si existe on lit prev
      setCurrentPage((prevPage) => prevPage - 1); // on calcule le nouvel état à partir de l’ancien.
    }
  }

  function handleNextPage() {
    if (info?.next) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }

  return (
    <section style={{ padding: '1rem' }}>
      <h1>Multivers Explorer</h1>
      <p>Page actuelle : {currentPage}</p>

      {loading && <Loader />}

      {!loading && error && <ErrorMessage message={error} />}

      {!loading && !error && ( // pagination seulement si chargement terminé et pas erreurs
        <>
          <CharacterGrid characters={characters} />

          <Pagination
            onPrevious={handlePreviousPage}
            onNext={handleNextPage}
            hasPrevious={info?.prev !== null} // prev est null, il n’y a pas de page précédente
            hasNext={info?.next !== null} // next est null, il n’y a pas de page suivante
            isLoading={loading}
          />
        </>
      )}
    </section>
  );
}

export default HomePage;