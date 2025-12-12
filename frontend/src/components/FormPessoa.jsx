import { useState } from "react";

export default function FormPessoa({ onSubmit, initialData }) {
  const [form, setForm] = useState(
    initialData || { nome: "", idade: "", email: "" }
  );

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        name="nome"
        placeholder="Nome"
        value={form.nome}
        onChange={handleChange}
      />
      <input
        name="idade"
        type="number"
        placeholder="Idade"
        value={form.idade}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <button type="submit">Salvar</button>
    </form>
  );
}
