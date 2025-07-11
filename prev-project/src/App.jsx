import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import PCA from './pages/PCA';
import ItensPCA from './pages/ItensPCA';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="layout">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pca" element={<PCA />} />
              <Route path="/itens-pca" element={<ItensPCA />} />
              {/* Dashboard removido */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
