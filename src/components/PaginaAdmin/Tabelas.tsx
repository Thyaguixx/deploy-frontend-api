import { Chart } from "react-google-charts";
import styles from "./PagAdmin.module.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Tabelas({ usersAll, usersActions }) {
  const [IsOpenPopupADM, setIsOpenPopupADM] = useState(false);
  const navigate = useNavigate()

  //Dados do gráfico ativo x inativo
  const numUsuariosAtivos = Array.isArray(usersAll)
    ? usersAll.filter((item) => item.usuario_status_registro === "Ativo").length
    : 0;
  const numUsuariosInativos = Array.isArray(usersAll)
    ? usersAll.filter((item) => item.usuario_status_registro === "Inativo")
      .length
    : 0;

  const data = [
    ["Status", "Quantidade"],
    ["Ativos", numUsuariosAtivos],
    ["Inativos", numUsuariosInativos],
  ];

  //Paginação e Ordenação
  const [valorFiltroUsers, setValorFiltroUsers] = useState(""); // Estado para o valor do filtro
  const [registrosFiltradosUsers, setRegistrosFiltradosUsers] =
    useState(usersAll); // Estado para os dados filtrados
  const [ordenarPeloMaisRecenteUsers, setOrdenarPeloMaisRecenteUsers] =
    useState(false); // Estado para controlar a ordem de recentes

  const [valorFiltroActions, setValorFiltroActions] = useState("");
  const [registrosFiltradosActions, setRegistrosFiltradosActions] =
    useState(usersActions);
  const [ordenarPeloMaisRecenteActions, setOrdenarPeloMaisRecenteActions] =
    useState(false);

  const [paginaAtualUsers, setPaginaAtualUsers] = useState(1);
  const RegistrosPaginaUsers = 10;
  const ultimoIndexUsers = paginaAtualUsers * RegistrosPaginaUsers;
  const primeiroIndexUsers = ultimoIndexUsers - RegistrosPaginaUsers;
  const recordsUsers =
    registrosFiltradosUsers &&
    registrosFiltradosUsers.slice &&
    registrosFiltradosUsers.slice(primeiroIndexUsers, ultimoIndexUsers);
  const totalPaginasUsers = Math.ceil(usersAll.length / RegistrosPaginaUsers); // Calcula o número total de páginas
  const ultimaPaginaUsers = totalPaginasUsers; // Calcula a última página
  const [busca, setBusca] = useState("");
  const [buscaActions, setBuscaActions] = useState("");

  const [paginaAtualActions, setPaginaAtualActions] = useState(1);
  const RegistrosPaginaActions = 5;
  const ultimoIndexActions = paginaAtualActions * RegistrosPaginaActions;
  const primeiroIndexActions = ultimoIndexActions - RegistrosPaginaActions;
  const recordsActions =
    registrosFiltradosActions &&
    registrosFiltradosActions.slice &&
    registrosFiltradosActions.slice(primeiroIndexActions, ultimoIndexActions);
  const totalPaginasActions = Math.ceil(
    usersActions.length / RegistrosPaginaActions
  ); // Calcula o número total de páginas
  const ultimaPaginaActions = totalPaginasActions; // Calcula a última página

  useEffect(() => {
    const filtradoUsers =
      valorFiltroUsers === ""
        ? usersAll
        : usersAll.filter((item) =>
          item.tipo_acao.startsWith(valorFiltroUsers)
        );

    setRegistrosFiltradosUsers(filtradoUsers); // Atualiza o estado dos dados filtrados
  }, ["", usersAll]); // Coloque as dependências do useEffect aqui

  useEffect(() => {
    const filtradoActions =
      valorFiltroActions === ""
        ? usersActions
        : usersActions.filter((item) =>
          item.tipo_acao.startsWith(valorFiltroActions)
        );

    setRegistrosFiltradosActions(filtradoActions); // Atualiza o estado dos dados filtrados
  }, ["", usersActions]); // Coloque as dependências do useEffect aqui

  useEffect(() => {
    const lowerBusca = busca.toLowerCase();
    const usersBarra =
      usersAll &&
      usersAll.filter &&
      usersAll.filter((item) =>
        item.usuario_nome.toLowerCase().includes(lowerBusca)
      );
    setRegistrosFiltradosUsers(usersBarra);
  }, [busca, usersAll]);

  useEffect(() => {
    const lowerBuscaActions = buscaActions.toLowerCase();
    const usersBarraActions =
      usersActions &&
      usersActions.filter &&
      usersActions.filter((item) =>
        item.usuario_nome.toLowerCase().includes(lowerBuscaActions)
      );
    setRegistrosFiltradosActions(usersBarraActions);
  }, [buscaActions, usersActions]);

  const handleMudançaFiltroUsers = (event) => {
    const valorSelecionadoUsers = event.target.value;
    setValorFiltroUsers(valorSelecionadoUsers); // Atualiza o estado do valor do filtro

    if (busca.length === 0) {
      const filtradoUsers = usersAll.filter((item) => {
        if (valorSelecionadoUsers === "AZ") {
          return item.usuario_nome;
        }
        if (valorSelecionadoUsers === "ZA") {
          return item.usuario_nome;
        }
        if (valorSelecionadoUsers === "statusAtivo") {
          return item.usuario_status_registro === "Ativo";
        }
        if (valorSelecionadoUsers === "statusInativo") {
          return item.usuario_status_registro === "Inativo";
        }

        if (valorSelecionadoUsers === "tipoComum") {
          return item.usuario_tipo === "Comum";
        }

        if (valorSelecionadoUsers === "tipoADM") {
          return item.usuario_tipo === "Administrador";
        } else {
          return item.usuario_nome;
        }
      });

      if (valorSelecionadoUsers === "AZ") {
        filtradoUsers.sort((a, b) => {
          const nomeA = a.usuario_nome.toLowerCase();
          const nomeB = b.usuario_nome.toLowerCase();
          if (nomeA < nomeB) {
            return -1;
          }
          if (nomeA > nomeB) {
            return 1;
          }
          return 0;
        });
      }

      if (valorSelecionadoUsers === "ZA") {
        filtradoUsers.sort((a, b) => {
          const nomeA = a.usuario_nome.toLowerCase();
          const nomeB = b.usuario_nome.toLowerCase();
          if (nomeA < nomeB) {
            return 1; // Altera para 1 para ordem decrescente
          }
          if (nomeA > nomeB) {
            return -1; // Altera para -1 para ordem decrescente
          }
          return 0;
        });
      }
      setRegistrosFiltradosUsers(filtradoUsers);
    } else {
      const filtradoUsers = registrosFiltradosUsers.filter((item) => {
        if (valorSelecionadoUsers === "AZ") {
          return item.usuario_nome;
        }
        if (valorSelecionadoUsers === "ZA") {
          return item.usuario_nome;
        }
        if (valorSelecionadoUsers === "statusAtivo") {
          return item.usuario_status_registro === "Ativo";
        }
        if (valorSelecionadoUsers === "statusInativo") {
          return item.usuario_status_registro === "Inativo";
        }

        if (valorSelecionadoUsers === "tipoComum") {
          return item.usuario_tipo === "Comum";
        }

        if (valorSelecionadoUsers === "tipoADM") {
          return item.usuario_tipo === "Administrador";
        } else {
          return item.usuario_nome;
        }
      });

      if (valorSelecionadoUsers === "AZ") {
        filtradoUsers.sort((a, b) => {
          const nomeA = a.usuario_nome.toLowerCase();
          const nomeB = b.usuario_nome.toLowerCase();
          if (nomeA < nomeB) {
            return -1;
          }
          if (nomeA > nomeB) {
            return 1;
          }
          return 0;
        });
      }

      if (valorSelecionadoUsers === "ZA") {
        filtradoUsers.sort((a, b) => {
          const nomeA = a.usuario_nome.toLowerCase();
          const nomeB = b.usuario_nome.toLowerCase();
          if (nomeA < nomeB) {
            return 1; // Altera para 1 para ordem decrescente
          }
          if (nomeA > nomeB) {
            return -1; // Altera para -1 para ordem decrescente
          }
          return 0;
        });
      }
      setRegistrosFiltradosUsers(filtradoUsers); // Atualiza o estado dos dados filtrados
    }
  };

  const handleMudançaFiltroActions = (event) => {
    const valorSelecionadoActions = event.target.value;
    setValorFiltroActions(valorSelecionadoActions); // Atualiza o estado do valor do filtro

    if (buscaActions.length === 0) {
      const filtradoActions = usersActions.filter((item) => {
        if (valorSelecionadoActions === "AZ") {
          return item.usuario_nome;
        }
        if (valorSelecionadoActions === "ZA") {
          return item.usuario_nome;
        }
        if (valorSelecionadoActions === "trocaNome") {
          return item.tipo_acao === "Troca de nome";
        }
        if (valorSelecionadoActions === "trocaUsuario") {
          return item.tipo_acao === "Troca de usuário";
        }

        if (valorSelecionadoActions === "trocaNomeUsuario") {
          return item.tipo_acao === "Troca de nome e usuário";
        }

        if (valorSelecionadoActions === "trocaSenha") {
          return item.tipo_acao === "Troca de senha";
        } else {
          return item.usuario_nome;
        }
      });

      if (valorSelecionadoActions === "AZ") {
        filtradoActions.sort((a, b) => {
          const nomeA = a.usuario_nome.toLowerCase();
          const nomeB = b.usuario_nome.toLowerCase();
          if (nomeA < nomeB) {
            return -1;
          }
          if (nomeA > nomeB) {
            return 1;
          }
          return 0;
        });
      }

      if (valorSelecionadoActions === "ZA") {
        filtradoActions.sort((a, b) => {
          const nomeA = a.usuario_nome.toLowerCase();
          const nomeB = b.usuario_nome.toLowerCase();
          if (nomeA < nomeB) {
            return 1; // Altera para 1 para ordem decrescente
          }
          if (nomeA > nomeB) {
            return -1; // Altera para -1 para ordem decrescente
          }
          return 0;
        });
      }
      setRegistrosFiltradosActions(filtradoActions);
    } else {
      const filtradoActions = usersActions.filter((item) => {
        if (valorSelecionadoActions === "AZ") {
          return item.usuario_nome;
        }
        if (valorSelecionadoActions === "ZA") {
          return item.usuario_nome;
        }
        if (valorSelecionadoActions === "trocaNome") {
          return item.tipo_acao === "Troca de nome";
        }
        if (valorSelecionadoActions === "trocaUsuario") {
          return item.tipo_acao === "Troca de usuário";
        }

        if (valorSelecionadoActions === "trocaNomeUsuario") {
          return item.tipo_acao === "Troca de nome e usuário";
        }

        if (valorSelecionadoActions === "trocaSenha") {
          return item.tipo_acao === "Troca de senha";
        }

        if (valorSelecionadoActions === "trocaEmail") {
          return item.tipo_acao === "Troca de email"
        }

        if (valorSelecionadoActions === "trocaEmailNome") {
          return item.tipo_acao === "Troca de nome e email"
        }

        if (valorSelecionadoActions === "trocaEmailUsuario") {
          return item.tipo_acao === "Troca de usuário e email"
        }

        if (valorSelecionadoActions === "trocaEmailUsuarioNome") {
          return item.tipo_acao === "Troca de nome, usuário e email"
        }

        else {
          return item.usuario_nome;
        }
      });

      if (valorSelecionadoActions === "AZ") {
        filtradoActions.sort((a, b) => {
          const nomeA = a.usuario_nome.toLowerCase();
          const nomeB = b.usuario_nome.toLowerCase();
          if (nomeA < nomeB) {
            return -1;
          }
          if (nomeA > nomeB) {
            return 1;
          }
          return 0;
        });
      }

      if (valorSelecionadoActions === "ZA") {
        filtradoActions.sort((a, b) => {
          const nomeA = a.usuario_nome.toLowerCase();
          const nomeB = b.usuario_nome.toLowerCase();
          if (nomeA < nomeB) {
            return 1; // Altera para 1 para ordem decrescente
          }
          if (nomeA > nomeB) {
            return -1; // Altera para -1 para ordem decrescente
          }
          return 0;
        });
      }
      setRegistrosFiltradosActions(filtradoActions);
    }
  };

  useEffect(() => {
    if (ordenarPeloMaisRecenteUsers) {
      const registrosFiltradosOrdenadosUsers = registrosFiltradosUsers.sort(
        (a, b) =>
          registrosFiltradosUsers.indexOf(b) -
          registrosFiltradosUsers.indexOf(a)
      );
      setRegistrosFiltradosUsers(registrosFiltradosOrdenadosUsers);
    }
  }, [valorFiltroUsers, ordenarPeloMaisRecenteUsers]);

  useEffect(() => {
    if (ordenarPeloMaisRecenteActions) {
      const registrosFiltradosOrdenadosActions = registrosFiltradosActions.sort(
        (a, b) =>
          registrosFiltradosActions.indexOf(b) -
          registrosFiltradosActions.indexOf(a)
      );
      setRegistrosFiltradosActions(registrosFiltradosOrdenadosActions);
    }
  }, [valorFiltroActions, ordenarPeloMaisRecenteActions]);

  function prePageActions() {
    if (paginaAtualActions !== 1) {
      setPaginaAtualActions(paginaAtualActions - 1);
    }
  }

  function nextPageActions() {
    if (paginaAtualActions < ultimaPaginaActions) {
      setPaginaAtualActions(paginaAtualActions + 1);
    }
  }

  function prePageUsers() {
    if (paginaAtualUsers !== 1) {
      setPaginaAtualUsers(paginaAtualUsers - 1);
    }
  }

  function nextPageUsers() {
    if (paginaAtualUsers < ultimaPaginaUsers) {
      setPaginaAtualUsers(paginaAtualUsers + 1);
    }
  }

  //Inativar usuário
  async function inativar(item) {
    const response = await fetch(
      `https://deploy-backend-api.vercel.app/inativarUsuario/${item.usuario_nome}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    console.log(data);

    if (data.msg !== "") {
      Swal.fire({
        title: "Sucesso",
        html: data.msg,
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => window.location.reload());
    }
  }

  async function reativar(item) {
    const response = await fetch(`https://deploy-backend-api.vercel.app/reativarUsuario/${item.usuario_nome}`, {
      method: "PUT",
    });
    const data = await response.json();
    console.log(data);

    if (data.msg !== '') {
      if (data.msg === 'O usuário já está ativo.') {
        Swal.fire({
          title: 'O usuário já está ativo.',
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Voltar',
        }).then((result) => {
          if (result.isConfirmed) {
            return
          }
        });
      } else {
        Swal.fire({
          title: 'Sucesso',
          html: data.msg,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        }).then(() => window.location.reload());
      }
    }
  }

  function editarUsuario(item) {
    const nome = item.usuario_nome
    const username = item.nome_usuario
    const email = item.usuario_email
    const tipo = item.usuario_tipo
    const status = item.usuario_status_registro

    const data = {
      nome: nome,
      username: username,
      email: email,
      tipo: tipo,
      status: status,
    }
    
    localStorage.setItem('nome_usuario', nome)
    localStorage.setItem('dados_usuario', JSON.stringify(data))
  }
  return (
    <div className={styles.containerGeralTables}>
      <div className={styles.containerTablesEsquerda}>
        <div className={styles.filtroBarraHistorico}>
          <span className={styles.relogioHistorico}>
            <a
              href="#"
              onClick={() =>
                setOrdenarPeloMaisRecenteActions((prevState) => !prevState)
              }
            >
              <img
                src="Imagens/relogio.png"
                alt="relogio"
                title="Ordenar por tempo: Mais novo - Mais antigo"
              />
            </a>
          </span>
          <span className={styles.barraHistorico}>
            <input
              value={buscaActions}
              type="text"
              onChange={(ev) => setBuscaActions(ev.target.value)}
            />
          </span>
        </div>
        <div className={styles.tableHistorico}>
          <table>
            <thead>
              <tr>
                <th className={styles.mescla} colSpan={4}>
                  Histórico de atividades do usuário
                </th>
              </tr>
              <tr>
                <th>
                  <span className={styles.filtroHistorico}>
                    <select
                      value={valorFiltroActions}
                      onChange={handleMudançaFiltroActions}
                    >
                      <option value="todosRegistros">Usuário</option>
                      <option value="AZ">A-Z</option>
                      <option value="ZA">Z-A</option>
                    </select>
                  </span>
                </th>
                <th>
                  <span className={styles.filtroHistorico}>
                    <select
                      value={valorFiltroActions}
                      onChange={handleMudançaFiltroActions}
                    >
                      <option value="todosRegistros"> Ações</option>
                      <option value="trocaNome">Troca de nome</option>
                      <option value="trocaUsuario">Troca de usuário</option>
                      <option value="trocaEmail">Troca de email</option>
                      <option value="trocaEmailNome">Troca de nome e email</option>
                      <option value="trocaEmailUsuario">Troca de usuário e email</option>
                      <option value="trocaEmailUsuarioNome">Troca de nome, usuário e email</option>
                      <option value="trocaNomeUsuario">
                        Troca de nome e usuario
                      </option>
                      <option value="trocaSenha">Troca de senha</option>
                    </select>
                  </span>
                </th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {recordsActions &&
                recordsActions.map &&
                recordsActions.map((item, i) => (
                  <tr key={i}>
                    <td>{item.usuario_nome}</td>
                    <td>{item.tipo_acao}</td>
                    <td>{item.to_char}</td>
                  </tr>
                ))}
            </tbody>
            <tr>
              <td className={styles.mescla} colSpan={4}>
                <div className={styles.paginacao}>
                  <button
                    className={styles.botaoPaginacao01}
                    onClick={prePageActions}
                  >
                    ◄
                  </button>
                  <button
                    className={styles.botaoPaginacao02}
                    onClick={nextPageActions}
                  >
                    ►
                  </button>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div className={styles.tableGrafico}>
          <table>
            <tr>
              <th className={styles.mescla} colSpan={3}>
                Usuários ativos x Usuários inativos
              </th>
            </tr>
            <tr>
              <td>
                <span className={styles.posicaoGrafico}>
                  <Chart
                    chartType="PieChart"
                    data={data}
                    width={"100%"}
                    height={"13rem"}
                  />
                </span>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div className={styles.containerTableDireita}>
        <div className={styles.filtroBarra}>
          <span className={styles.botaoNewUser}>
            <a href="/cadastro-by-admin">
              <button className={styles.botaoAdminNew}>
                Cadastrar novo usuário
              </button>
            </a>
          </span>
          <span className={styles.relogio}>
            <a
              href="#"
              onClick={() =>
                setOrdenarPeloMaisRecenteUsers((prevState) => !prevState)
              }
            >
              <img
                src="Imagens/relogio.png"
                alt="relogio"
                title="Ordenar por tempo: Mais novo - Mais antigo"
              />
            </a>
          </span>
          <span className={styles.barra}>
            <input
              value={busca}
              type="text"
              onChange={(ev) => setBusca(ev.target.value)}
            />
          </span>
        </div>
        <div className={styles.tableUsers}>
          <table>
            <thead>
              <tr>
                <th>
                  <span className={styles.filtro}>
                    <select
                      value={valorFiltroUsers}
                      onChange={handleMudançaFiltroUsers}
                    >
                      <option value="todosRegistros" selected>
                        Nome
                      </option>
                      <option value="AZ">A-Z</option>
                      <option value="ZA">Z-A</option>
                    </select>
                  </span>
                </th>
                <th>Ações</th>
                <th>Data de criação</th>
                <th>
                  <span className={styles.filtro}>
                    <select
                      value={valorFiltroUsers}
                      onChange={handleMudançaFiltroUsers}
                    >
                      <option value="todosRegistros" selected>
                        Tipo
                      </option>
                      <option value="tipoComum">Usuarios (Comum)</option>
                      <option value="tipoADM">Usuarios (Administrador)</option>
                    </select>
                  </span>
                </th>
                <th>
                  <span className={styles.filtro}>
                    <select
                      value={valorFiltroUsers}
                      onChange={handleMudançaFiltroUsers}
                    >
                      <option value="todosRegistros" selected>
                        Status
                      </option>
                      <option value="statusAtivo">Status(Ativo)</option>
                      <option value="statusInativo">Status(Inativo)</option>
                    </select>
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              {recordsUsers &&
                recordsUsers.map &&
                recordsUsers.map((item, i) => (
                  <tr key={i}>
                    <td className={styles.celulaFixa}>
                      <div className={styles.conteudoFixo}>
                        <span
                          className={
                            item.usuario_status_registro === "Ativo"
                              ? styles.situacaoOn
                              : styles.situacaoOff
                          }
                          onClick={() => reativar(item)}
                        >
                          <input type="button" className={styles.botaoFixado} />
                        </span>
                        <span className={styles.nomeUser}>
                          {item.usuario_nome}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={styles.excluir}>
                        <a href="#" onClick={() => inativar(item)}>
                          <img src="Imagens/excluir.png" alt="excluir" />
                        </a>
                      </span>
                      <span className={styles.editar}>
                        <a
                          href="#"
                          onClick={() => {
                            editarUsuario(item)
                            navigate('/editar-usuario')
                          }}
                        >
                          <img src="Imagens/edição.png" alt="editar" />
                        </a>
                      </span>
                    </td>
                    <td>{item.to_char}</td>
                    <td> {item.usuario_tipo}</td>
                    <td>{item.usuario_status_registro}</td>
                  </tr>
                ))}
            </tbody>
            <tr>
              <td className={styles.mescla} colSpan={5}>
                <button
                  className={styles.botaoPaginacao01}
                  onClick={prePageUsers}
                >
                  ◄
                </button>
                <button
                  className={styles.botaoPaginacao02}
                  onClick={nextPageUsers}
                >
                  ►
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}
