type PaginationProps = {
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  isLoading: boolean;
};

function Pagination({
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  isLoading,
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