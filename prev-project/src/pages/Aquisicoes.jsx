// src/pages/Aquisicoes.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import "../assets/css/pca.css";

function Aquisicoes() {
  const [aquisicoes, setAquisicoes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [aquisicaoSelecionada, setAquisicaoSelecionada] = useState(null);
  const [credores, setCredores] = useState([]);
  const [credorSelecionado, setCredorSelecionado] = useState(null);
  const [itens, setItens] = useState([]);
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [novaAquisicao, setNovaAquisicao] = useState({
    nome: "",
    ano: "",
    data_inicio: "",
    data_fim: "",
    processo_E_DOC: "",
    setor_requisitante: "",
    cod_igesp: "",
    valor_estimado: 0,
    valor_realizado: 0,
    situacao_aquisicao: "",
    modalidade_aquisicao: "",
    versao: 1,
    versao_Item_PCA: 1,
    criado_por: "",
    idItem_PCA: "",
    idCredor: "",
  });

  const modalidades = [
    "Adesão à Ata",
    "anuência",
    "Dispensa de Valor",
    "Dispensa de inexigibilidade",
    "Dispensa Outros",
    "Inexigibilidade de Licitação",
    "Pregão Eletrônico",
  ];
  const setores = [
    "Gerplanea",
    "Getec",
    "Assepci",
    "Ascom",
    "Asseri",
    "Geadi",
    "Geof",
    "Gereh",
    "Gecon",
    "Gercomp",
    "Geainv",
    "Gerpag",
    "Gercon",
    "Gerat",
    "Coss",
  ];

  useEffect(() => {
    buscarAquisicoes();
    buscarCredor();
  }, []);

  const buscarAquisicoes = async () => {
    try {
      const res = await api.get("/aqui");
      setAquisicoes(res.data);
    } catch (err) {
      console.error("Erro ao buscar aquisições", err);
    }
  };
  const buscarCredor = async () => {
    try {
      const credores = await api.get("/credor/");
      setCredores(credores.data);
    } catch (error) {
      console.error("Erro ao buscar credores", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (aquisicaoSelecionada) {
      setAquisicaoSelecionada((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setNovaAquisicao((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    try {
      if (aquisicaoSelecionada) {
        await api.put(`/aqui/${aquisicaoSelecionada.id}`, {
          data: aquisicaoSelecionada,
        });
      } else {
        await api.post("/aqui", { data: novaAquisicao });
        console.log("dados para o post: ", novaAquisicao);
      }
      setShowModal(false);
      setAquisicaoSelecionada(null);
      setNovaAquisicao({
        nome: "",
        ano: "",
        data_inicio: "",
        data_fim: "",
        processo_E_DOC: "",
        setor_requisitante: "",
        cod_igesp: "",
        valor_estimado: 0,
        valor_realizado: 0,
        situacao_aquisicao: "",
        modalidade_aquisicao: "",
        versao: 1,
        versao_Item_PCA: 1,
        criado_por: "",
        idItem_PCA: "",
        idCredor: "",
      });
      buscarAquisicoes();
    } catch (error) {
      console.error("Erro ao salvar aquisição:", error);
    }
  };

  const abrirModalEdicao = (aqui) => {
    setAquisicaoSelecionada({ ...aqui });
    setShowModal(true);
  };

  return (
    <div className="pca-container">
      <div className="pca-header">
        <h2>Aquisições</h2>
        <button onClick={() => setShowModal(true)} className="btn">
          + Adicionar Aquisição
        </button>
      </div>

      <div className="tabela-wrapper">
        <table className="tabela-pca">
          <thead>
            <tr>
              <th>Processo E-DOC</th>
              <th>Ano</th>
              <th>Nome</th>
              <th>Objeto</th>
              <th>Cod I-GESP</th>
              <th>Modalidade da Licitação</th>
              <th>Versão</th>
              <th>Criado Por</th>
              <th>Item PCA</th>
              <th>Credor</th>
            </tr>
          </thead>
          <tbody>
            {aquisicoes.map((aq) => (
              <tr key={aq.id} onClick={() => abrirModalEdicao(aq)}>
                <td>{aq.processo_E_DOC}</td>
                <td>{aq.ano}</td>
                <td>{aq.nome}</td>
                <td>{aq.objeto}</td>
                <td>{aq.cod_igesp}</td>
                <td>{aq.modalidade_aquisicao}</td>
                <td>{aq.versao}</td>
                <td>{aq.criado_por}</td>
                <td>{aq.idItem_PCA}</td>
                <td>
                  {credores.find((credor) => credor.id === aq.idCredor)?.nome ||
                    aq.idCredor}
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="itens-pca-modal-content">
            <h3>{aquisicaoSelecionada ? "Editar" : "Nova"} Aquisição</h3>

            <input
              type="text"
              placeholder="Nome"
              name="nome"
              value={
                aquisicaoSelecionada
                  ? aquisicaoSelecionada.nome
                  : novaAquisicao.nome
              }
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="Descrição"
              name="descricao"
              value={
                aquisicaoSelecionada
                  ? aquisicaoSelecionada.descricao
                  : novaAquisicao.descricao
              }
              onChange={handleChange}
            />

            <div className="itens-pca-modal-buttons">
              <button onClick={handleSave} className="btn-salvar">
                Salvar
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setAquisicaoSelecionada(null);
                }}
                className="btn-cancelar"
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

export default Aquisicoes;
