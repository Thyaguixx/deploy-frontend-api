import { useState } from "react";
import "./CadastroAdmin.css";
import LT from "../img/little_tech.png"
import logo from "../img/visiona_logo.png"
import eyeIconOpen from '../img/open.png';
import eyeIconClose from '../img/close.png';
import Axios from "axios"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


function CadastroByAdmin() {
  const [nome, setNome] = useState("" as any)
  const [email, setEmail] = useState("" as any)
  const [nomeUsuario, setNomeUsuario] = useState("" as any)
  const [password, setPassword] = useState("" as any)
  const [tipo, setTipo] = useState("" as any)
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()


   const handleChangeOption = (event) => {
    setTipo(event.target.value)
   }

  //Validar
  const validaCampos = () => {
    let vazio = false
    if (nome === '' || email === '' || nomeUsuario === '' || password === '') {
      vazio = true
      return vazio
    }
  }

  function msgValidaCampos() {
    Swal.fire({
      title: 'Alerta',
      html: 'Preencha todos os campos.',
      icon: 'warning',
      confirmButtonColor: '#de940a'
    })
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    if (!validaCampos()) {
      await Axios.post("https://deploy-backend-api.vercel.app/registro-by-admin", {
        nome: nome,
        email: email,
        nomeUsuario: nomeUsuario,
        senha: password,
        tipo: tipo
      }).then((response) => {
        console.log(response.data)
        if (response.data.msg === "Cadastro realizado com sucesso.") {
          Swal.fire({
            title: 'Sucesso',
            html: response.data.msg,
            icon: 'success',
            showConfirmButton: true,
            confirmButtonText: "OK",
            confirmButtonColor: '#de940a'
          }).then(() => window.location.reload())
        } else if (response.data.msg === "Já existe uma conta com este email.") {
          Swal.fire({
            title: 'Alerta',
            html: response.data.msg,
            icon: 'info',
            showConfirmButton: true,
            confirmButtonText: "OK",
            confirmButtonColor: '#de940a'
          })
        } else if (response.data.msg === "Já existe uma conta com este nome de usuário.") {
          Swal.fire({
            title: 'Alerta',
            html: response.data.msg,
            icon: 'info',
            showConfirmButton: true,
            confirmButtonText: "OK",
            confirmButtonColor: '#de940a'
          })
        }
      })
    } else {
      msgValidaCampos()
    }

  }

  function showPasswordHandler() {
    setShowPassword(!showPassword);
  }

  const passwordInputTypeSenha = showPassword ? "text" : "password";
  const passwordIconSrc = showPassword ? eyeIconOpen : eyeIconClose;


  return (
    <div className="container-cd-admin">
      <div className="container-cadastro-admin">
        <div className="wrap-cadastro-admin">
          <form className="cadastro-form-admin" onSubmit={handleSubmit}>
            <span className="cadastro-form-title-admin">
              <img src={logo} alt="logo visiona" />
            </span>
            <div className="wrap-input-cd-admin">
              <input
                className={nome !== "" ? "has-val input" : "input-cd"}
                type="text"
                name="nome"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
              />
              <span className="focus-input-cd-admin" data-placeholder="Nome"></span>

            </div>
            <div className="wrap-input-cd-admin">
              <input
                className={email !== "" ? "has-val input" : "input-cd"}
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <span className="focus-input-cd-admin" data-placeholder="Email"></span>
            </div>
            <div className="wrap-input-cd-admin">
              <input
                className={nomeUsuario !== "" ? "has-val input" : "input-cd"}
                type="text"
                name="nomeUsuario"
                value={nomeUsuario}
                onChange={(event) => setNomeUsuario(event.target.value)}
              />
              <span className="focus-input-cd-admin" data-placeholder="Nome de usuário"></span>

            </div>
            <div className="wrap-input-cd-admin">
              <input
                className={password !== "" ? "has-val input" : "input-cd"}
                type={passwordInputTypeSenha}
                name="senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <span className="focus-input-cd-admin" data-placeholder="Senha"></span>
              <img src={passwordIconSrc} alt="eye icon" onClick={showPasswordHandler} />
            </div>

            <div className="container-seletor">
              <label className="title-seletor">Tipo</label>
              <select className="seletor" value={tipo} onChange={handleChangeOption}>
                <option hidden >Selecione o tipo</option>
                <option value="Comum" >Comum</option>
                <option value="Administrador">Administrador</option>
              </select>
            </div>

            <div className="container-cadastro-form-btn-admin">
              <button className="cadastro-form-btn-admin">Cadastrar</button>
            </div>

            <div className="text-center-admin">
              <a className="txt2-admin" href="/user-admin">
                Voltar para a tela de Administrador
              </a>
            </div>
          </form>
        </div>
        <div className='logo-admin'>
          <img src={LT} alt="little_tech"></img>
        </div>
      </div>
    </div>

  );
}

export default CadastroByAdmin;