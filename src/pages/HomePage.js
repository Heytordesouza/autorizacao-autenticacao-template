import { useState } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { navigateToAdmin } from "../routes/coordinator";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 50vw;
  gap: 5px;
`;
function HomePage() {
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: "", senha: "" });

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const submitForm = (event) => {
    event.preventDefault();  //evita atualizar a pagina
    console.log(form);
    login()
  };

  const login = () => {
    const aluno = "heytordesouza"
    const body = {
      email: form.email,
      password: form.senha
    }

    axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labeX/${aluno}/login`, body)
    .then((resp) =>{
      console.log(resp.data.token)
      localStorage.setItem("token", resp.data.token)

      //pratica guiada 2
      navigateToAdmin(navigate)
      
    })
    .catch((erro) => {
      console.log(erro.response.status)
    })
  }


  return (
    <main>
      <Header />
      <h1>Página Inicial</h1>
      <Form onSubmit={submitForm}>
        <label htmlFor="email">Login</label>
        <input
          id="email"
          name="email" // event.target.name
          type="text"
          value={form.email}  // event.target.value
          onChange={onChange}
          placeholder="email"
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        />
        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          name="senha"
          type="password"
          value={form.senha}
          onChange={onChange}
          placeholder="senha"
          required
        />
        <button>Login</button>
      </Form>
    </main>
  );
}

export default HomePage;
