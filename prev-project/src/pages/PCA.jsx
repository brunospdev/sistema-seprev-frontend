import { useEffect, useState } from "react";
import api from "../api/axios";
import "../assets/css/pca.css";

function PCA() {
  const [pcas, setPcas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pcaSelecionado, setPcaSelecionado] = useState(null);
  const [novoPca, setNovoPca] = useState({ nome_pca: "", fim_vigencia: false });

  useEffect(() => {
    fetchPcas();
  }, []);

  const fetchPcas = async () => {
    const response = await api.get("/pca");
    setPcas(response.data);
  };

  const handleSave = async () => {
    if (pcaSelecionado) {
      // Edição
      await api.put(`/pca/${pcaSelecionado.idPCA}`, { data: pcaSelecionado });
    } else {
      // Criação
      await api.post("/pca", { data: novoPca });
      console.log(novoPca);
    }

    setShowModal(false);
    setPcaSelecionado(null);
    setNovoPca({ nome_pca: "", fim_vigencia: false });
    fetchPcas();
  };

  const abrirModalEdicao = (pca) => {
    setPcaSelecionado({ ...pca });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const valor = type === "checkbox" ? checked : value;

    if (pcaSelecionado) {
      setPcaSelecionado((prev) => ({ ...prev, [name]: valor }));
    } else {
      setNovoPca((prev) => ({ ...prev, [name]: valor }));
    }
  };

  return (
    <div className="pca-container">
      <div className="pca-header">
        <h2>PCA - Plano de Contratação Anual</h2>

        <button onClick={() => setShowModal(true)} className="btn">
          + Adicionar PCA
        </button>
      </div>

      <table className="tabela-pca">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Versão</th>
            <th>Criado Por</th>
          </tr>
        </thead>
        <tbody>
          {pcas.map((pca) => (
            <tr key={pca.idPCA} onClick={() => abrirModalEdicao(pca)}>
              <td>{pca.nome_pca}</td>
              <td>{pca.versao}</td>
              <td>{pca.criado_por}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{pcaSelecionado ? "Editar PCA" : "Adicionar PCA"}</h3>

            <input
              type="text"
              placeholder="Nome do PCA"
              name="nome_pca"
              value={
                pcaSelecionado ? pcaSelecionado.nome_pca : novoPca.nome_pca
              }
              onChange={handleChange}
              className="modal-input"
            />

            <div className="modal-buttons">
              <button onClick={handleSave} className="btn">
                Salvar
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setPcaSelecionado(null);
                }}
                className="btn"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PCA;
