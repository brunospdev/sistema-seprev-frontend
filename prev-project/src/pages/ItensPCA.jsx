import { useEffect, useState } from "react";
import api from "../api/axios";
import "../assets/css/itens-pca.css";

function ItensPCA() {
  const [itens, setItens] = useState([]);
  const [pcas, setPcas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [pcaSelecionado, setPcaSelecionado] = useState(null);

  const [novoItem, setNovoItem] = useState({
    nome: "",
    quantidade_estimada: "",
    unidade_medida: "",
    valor_estimado_unit: "",
    valor_estimado_total: 0,
    publicado: false,
    modalidade_itemPCA: "",
    setor: "",
    versao: 1,
    versao_PCA: 1,
    criado_por: "",
    idPCA: "",
    data_inicio_aq_previsto: "",
    data_final_aq_previsto: "",
    data_inicio_aq_real: "",
    data_final_aq_real: "",
  });

  const modalidades = ["Material", "Serviço", "Renovação"];
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
  ];

  useEffect(() => {
    fetchItens();
    fetchPcas();
  }, []);

  const fetchItens = async () => {
    try {
      const response = await api.get("/item-pca");
      setItens(response.data);
    } catch (error) {
      console.error("Erro ao buscar itens PCA:", error);
    }
  };

  useEffect(() => {
    const fetchItens = async () => {
      try {
        const res = await api.get("");
      } catch (error) {}
    };
  });
  const fetchPcas = async () => {
    const response = await api.get("/pca");
    setPcas(response.data);
  };

  const handleSave = async () => {
    try {
      if (itemSelecionado) {
        const { inicio_vigencia_registro, ...dadosAtualizados } =
          itemSelecionado;
        console.log("Dados enviados para atualização:", dadosAtualizados);
        await api.put(`/item-pca/${itemSelecionado.idItem_PCA}`, {
          data: dadosAtualizados,
        });
      } else {
        const dadosNovoItem = {
          ...novoItem,
          quantidade_estimada: Number(novoItem.quantidade_estimada),
          valor_estimado_unit: Number(novoItem.valor_estimado_unit),
          valor_estimado_total: Number(novoItem.valor_estimado_total),
          data_inicio_aq_previsto: new Date(novoItem.data_inicio_aq_previsto),
          data_final_aq_previsto: new Date(novoItem.data_final_aq_previsto),
          data_inicio_aq_real: new Date(novoItem.data_inicio_aq_real),
          data_final_aq_real: new Date(novoItem.data_final_aq_real),
        };
        console.log("Dados enviados para criação:", dadosNovoItem);
        await api.post("/item-pca", {
          data: dadosNovoItem,
        });
      }
      setShowModal(false);
      setItemSelecionado(null);
      setNovoItem({
        nome: "",
        quantidade_estimada: 0,
        unidade_medida: "",
        valor_estimado_unit: 0,
        valor_estimado_total: 0,
        publicado: false,
        modalidade_itemPCA: "",
        setor: "",
        versao: 1,
        versao_PCA: 1,
        criado_por: "",
        idPCA: "",
        data_inicio_aq_previsto: "",
        data_final_aq_previsto: "",
        data_inicio_aq_real: "",
        data_final_aq_real: "",
      });
      fetchItens();
    } catch (error) {
      console.error("Erro ao salvar item PCA:", error);
    }
  };

  const abrirModalEdicao = (item) => {
    setItemSelecionado({ ...item });
    setShowModal(true);
  };

  const pcasDosItens = [...new Set(itens.map((item) => item.idPCA))].map(
    (id) => ({
      id,
      nome: pcas.find((p) => p.idPCA === id)?.nome_pca || `PCA ${id}`,
    })
  );
  const itensFiltrados = pcaSelecionado
    ? itens.filter((item) => item.idPCA === Number(pcaSelecionado))
    : itens;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const valor = type === "checkbox" ? checked : value;

    if (itemSelecionado) {
      setItemSelecionado((prev) => ({
        ...prev,
        [name]: valor,
      }));
    } else {
      setNovoItem((prev) => ({
        ...prev,
        [name]: valor,
      }));
    }
  };

  return (
    <div className="pca-container">
      <div className="pca-header">
        <h2>Itens do PCA</h2>
        <div className="filtro-pca-container">
          <label className="filtro-pca-label" htmlFor="filtro-pca">
            Filtrar por PCA:
          </label>
          <select
            id="filtro-pca"
            className="filtro-pca-select"
            value={pcaSelecionado}
            onChange={(e) => setPcaSelecionado(e.target.value)}
          >
            <option value="">Todos os PCA</option>
            {pcasDosItens.map((pca) => (
              <option key={pca.id} value={pca.id}>
                {pca.nome}
              </option>
            ))}
          </select>
        </div>

        <button onClick={() => setShowModal(true)} className="btn">
          + Adicionar Item
        </button>
      </div>
      <div className="tabela-wrapper">
        <table className="tabela-pca">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Qtd. Estimada</th>
              <th>Unidade</th>
              <th>Valor Unitário</th>
              <th>Valor Total</th>
              <th>Publicado</th>
              <th>Modalidade</th>
              <th>Setor</th>
              <th>Versão</th>
              <th>Versão PCA</th>
              <th>Criado Por</th>
              <th>PCA</th>
              <th className="data-tabela">data inicio previsto</th>
              <th className="data-tabela">data final previsto</th>
              <th className="data-tabela">data inicio real</th>
              <th className="data-tabela">data final real</th>
            </tr>
          </thead>
          <tbody>
            {itensFiltrados.map((item) => (
              <tr key={item.idItem_PCA} onClick={() => abrirModalEdicao(item)}>
                <td>{item.nome}</td>
                <td>{item.quantidade_estimada}</td>
                <td>{item.unidade_medida}</td>
                <td>{item.valor_estimado_unit}</td>
                <td>{item.valor_estimado_total}</td>
                <td>{item.publicado ? "Sim" : "Não"}</td>
                <td>{item.modalidade_itemPCA}</td>
                <td>{item.setor}</td>
                <td>{item.versao}</td>
                <td>{item.versao_PCA}</td>
                <td>{item.criado_por}</td>
                <td>
                  {pcas.find((pca) => pca.idPCA === item.idPCA)?.nome_pca ||
                    item.idPCA}
                </td>
                <td>{item.data_inicio_aq_previsto}</td>
                <td>{item.data_final_aq_previsto}</td>
                <td>{item.data_inicio_aq_real}</td>
                <td>{item.data_final_aq_real}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="itens-pca-modal-content">
            <h3>
              {itemSelecionado ? "Editar Item PCA" : "Adicionar Item PCA"}
            </h3>

            <input
              type="text"
              placeholder="Nome"
              name="nome"
              value={itemSelecionado ? itemSelecionado.nome : novoItem.nome}
              onChange={handleChange}
            />

            <input
              type="number"
              placeholder="Quantidade Estimada"
              name="quantidade_estimada"
              value={
                itemSelecionado
                  ? itemSelecionado.quantidade_estimada
                  : novoItem.quantidade_estimada
              }
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="Unidade de Medida"
              name="unidade_medida"
              value={
                itemSelecionado
                  ? itemSelecionado.unidade_medida
                  : novoItem.unidade_medida
              }
              onChange={handleChange}
            />

            <input
              type="number"
              placeholder="Valor Unitário Estimado"
              name="valor_estimado_unit"
              value={
                itemSelecionado
                  ? itemSelecionado.valor_estimado_unit
                  : novoItem.valor_estimado_unit
              }
              onChange={handleChange}
              step="0.01"
            />

            <label className="itens-pca-checkbox-label">
              <input
                type="checkbox"
                name="publicado"
                checked={
                  itemSelecionado
                    ? itemSelecionado.publicado
                    : novoItem.publicado
                }
                onChange={handleChange}
              />
              Publicado
            </label>

            <label>
              Modalidade:
              <select
                name="modalidade_itemPCA"
                value={
                  itemSelecionado
                    ? itemSelecionado.modalidade_itemPCA
                    : novoItem.modalidade_itemPCA
                }
                onChange={handleChange}
              >
                <option value="">Selecione...</option>
                {modalidades.map((mod) => (
                  <option key={mod} value={mod}>
                    {mod}
                  </option>
                ))}
              </select>
            </label>

            <label>
              PCA:
              <select
                name="idPCA"
                value={itemSelecionado ? itemSelecionado.idPCA : novoItem.idPCA}
                onChange={handleChange}
              >
                <option value="">Selecione...</option>
                {pcas.map((pca) => (
                  <option key={pca.id} value={String(pca.idPCA)}>
                    {pca.nome_pca}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Setor:
              <select
                name="setor"
                value={itemSelecionado ? itemSelecionado.setor : novoItem.setor}
                onChange={handleChange}
              >
                <option value="">Selecione...</option>
                {setores.map((setor) => (
                  <option key={setor} value={setor}>
                    {setor}
                  </option>
                ))}
              </select>
            </label>
            <div className="grupo-datas">
              <div className="campo-data">
                <label>Início previsto:</label>
                <input
                  type="date"
                  name="data_inicio_aq_previsto"
                  value={
                    itemSelecionado
                      ? itemSelecionado.data_inicio_aq_previsto
                      : novoItem.data_inicio_aq_previsto
                  }
                  onChange={handleChange}
                />
              </div>

              <div className="campo-data">
                <label>Fim previsto:</label>
                <input
                  type="date"
                  name="data_final_aq_previsto"
                  value={
                    itemSelecionado
                      ? itemSelecionado.data_final_aq_previsto
                      : novoItem.data_final_aq_previsto
                  }
                  onChange={handleChange}
                />
              </div>

              <div className="campo-data">
                <label>Início real:</label>
                <input
                  type="date"
                  name="data_inicio_aq_real"
                  value={
                    itemSelecionado
                      ? itemSelecionado.data_inicio_aq_real
                      : novoItem.data_inicio_aq_real
                  }
                  onChange={handleChange}
                />
              </div>

              <div className="campo-data">
                <label>Fim real:</label>
                <input
                  type="date"
                  name="data_final_aq_real"
                  value={
                    itemSelecionado
                      ? itemSelecionado.data_final_aq_real
                      : novoItem.data_final_aq_real
                  }
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="itens-pca-modal-buttons">
              <button onClick={handleSave} className="btn-salvar">
                Salvar
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setItemSelecionado(null);
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

export default ItensPCA;
