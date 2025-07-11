import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';
import LogoPrevi from './LogoPrevi';
import homeIcon from '../assets/home-icon.svg'; // Ícone Home

function Navbar() {
  return (
    <nav className="navbar">
      <div className="left-section">
        {/* Botão Home */}
        <Link to="/">
          <img
            src={homeIcon}
            alt="Home"
            width={28}
            height={28}
            style={{ marginRight: '12px', cursor: 'pointer' }}
          />
        </Link>

        {/* Logo do site */}
        <LogoPrevi />
      </div>

      {/* Caixa de pesquisa à direita */}
      <SearchBox />
    </nav>
  );
}

export default Navbar;
