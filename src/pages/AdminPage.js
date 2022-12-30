import Header from "../components/Header";
import { useEffect } from "react";
import axios from "axios";
import { navigateToHome } from "../routes/coordinator";
import { useNavigate } from "react-router-dom";

function AdminPage() {

  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  useEffect(()=> {
    
    if(!token){
      navigateToHome(navigate) // se a pagina não existir, entra nesse if
    }
    
    const aluno = "darvas"
    const id = "3bUbdB1gvPzWrThpazVC"
    const header = {
      headers: {
        auth: token
      }
    }
    axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labeX/${aluno}/trip/${id}`, header)
    .then((resp)=>{
      console.log("resposta do admin", resp.data.trip)
    }).catch((erro)=>{
      console.log(erro)
    })
  })

  return (
    <main>
      <Header />
      <h1>Página de Admin</h1>
    </main>
  );
}

export default AdminPage;
