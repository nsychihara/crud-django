import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";
import FormPessoa from "../components/FormPessoa";

export default function Edit() {
  const { id } = useParams();
  const nav = useNavigate();
  const [pessoa, setPessoa] = useState(null);

  async function load() {
    const res = await api.get(`pessoas/${id}/`);
    setPessoa(res.data);
  }

  useEffect(() => {
    load();
  }, []);

  async function salvar(dados) {
    await api.put(`pessoas/${id}/`, dados);
    nav("/");
  }

  if (!pessoa) return <h2>Carregando...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Editar Pessoa {id}</h1>
      <FormPessoa onSubmit={salvar} initialData={pessoa} />
    </div>
  );
}
