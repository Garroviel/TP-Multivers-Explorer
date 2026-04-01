import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <nav>
        <Link to="/">Retour à l'accueil</Link>
      </nav>
    </header>
  );
}

export default Header;