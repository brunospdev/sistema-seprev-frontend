import SearchIcon from '../assets/search.svg'; // puxando o ícone de pesquisa

function SearchBox() {
  return (
    <div className="search-box">
      <img src={SearchIcon} alt="Pesquisar" className="search-icon" />
      <input type="text" placeholder="pesquisar..." />
    </div>
  );
}

export default SearchBox;
