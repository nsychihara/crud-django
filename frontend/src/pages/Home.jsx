import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import FormPessoa from "../components/FormPessoa";

export default function Home() {
  const [pessoas, setPessoas] = useState([]);

  async function load() {
    const res = await api.get("pessoas/");
    setPessoas(res.data);
  }

  useEffect(() => {
    load();
  }, []);

  async function criarPessoa(data) {
    await api.post("pessoas/", data);
    load(); 
  }

  async function deletar(id) {
    await api.delete(`pessoas/${id}/`);
    load();
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pessoas</h1>

      <FormPessoa onSubmit={criarPessoa} />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {pessoas.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nome}</td>
              <td>{p.idade}</td>
              <td>{p.email}</td>
              <td>
                <Link to={`/editar/${p.id}`}>
                  <button>Editar</button>
                </Link>
                <button onClick={() => deletar(p.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
