import { Link, useLocation } from 'react-router-dom';
import {
  FaClipboardList,
  FaCubes,
  FaFileAlt,
  FaFileContract,
  FaPlus,
  FaCog,
} from 'react-icons/fa';

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        <li className={location.pathname === "/pca" ? "active" : ""}>
          <Link to="/pca"><FaClipboardList className="icon" /> PCA</Link>
        </li>
        <li className={location.pathname === "/itens-pca" ? "active" : ""}>
          <Link to="/itens-pca"><FaCubes className="icon" /> Itens PCA</Link>
        </li>
        <li className={location.pathname === "/aquisicoes" ? "active" : ""}>
          <Link to="/aquisicoes"><FaFileAlt className="icon" /> Aquisições</Link>
        </li>
        <li className={location.pathname === "/contratos" ? "active" : ""}>
          <Link to="/contratos"><FaFileContract className="icon" /> Contratos</Link>
        </li>
        <li className={location.pathname === "/aditivos" ? "active" : ""}>
          <Link to="/aditivos"><FaPlus className="icon" /> Aditivos</Link>
        </li>
      </ul>
      <div className="config">
        <Link to="/config"><FaCog className="icon" /> Configurações do Sistema</Link>
      </div>
    </aside>
  );
}

export default Sidebar;
