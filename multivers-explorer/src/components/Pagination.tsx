type PaginationProps = {
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  isLoading: boolean;
};

function Pagination({
  onPrevious, // Une fonction à appeler quand on clique sur Précédent
  onNext, // Une fonction à appeler quand on clique sur Suivant
  hasPrevious, // Un booléen qui dit s’il existe une page précédente
  hasNext,
  isLoading, // desactive bouton pendant chargement
}: PaginationProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        marginTop: '2rem',
      }}
    >
      <button onClick={onPrevious} disabled={!hasPrevious || isLoading}>
        Précédent
      </button>

      <button onClick={onNext} disabled={!hasNext || isLoading}>
        Suivant
      </button>
    </div>
  );
}

export default Pagination;