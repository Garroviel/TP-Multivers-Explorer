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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [info, setInfo] = useState<CharactersApiResponse['info'] | null>(null);

  useEffect(() => {
    async function loadCharacters() {
      try {
        setLoading(true);
        setError('');

        const data = await fetchCharacters(currentPage);
        setCharacters(data.results);
        setInfo(data.info);
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
  }, [currentPage]);

  function handlePreviousPage() {
    if (info?.prev) {
      setCurrentPage((prevPage) => prevPage - 1);
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

      {!loading && !error && (
        <>
          <CharacterGrid characters={characters} />

          <Pagination
            onPrevious={handlePreviousPage}
            onNext={handleNextPage}
            hasPrevious={info?.prev !== null}
            hasNext={info?.next !== null}
            isLoading={loading}
          />
        </>
      )}
    </section>
  );
}

export default HomePage;