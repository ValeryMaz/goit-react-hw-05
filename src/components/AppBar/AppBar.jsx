import { Link } from 'react-router-dom';
export default function AppBar() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/Movies">Movies</Link>
        </nav>
      </header>
    </>
  );
}
