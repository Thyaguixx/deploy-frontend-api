//import { AiOutlineCloseSquare } from "react-icons/ai";
import { useState } from "react";
import "./PopupEdicao.css"
import Axios from "axios";
import Swal from "sweetalert2";

const PopupEdicao = ({ setIsOpenPopup }) => {
  const [nome, setNome] = useState("" as any)
  const [apelido, setApelido] = useState("" as any)
  const [email, setEmail] = useState("" as any)

  const msgSucesso = () => {
    Swal.fire({
      title: "Sucesso",
      html: "Informações salvas com sucesso.",
      icon: "success",
      showConfirmButton: true,
      confirmButtonColor: '#de940a'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  }

  const handleEditarInfo =  async (event : any) => {
    event.preventDefault()

    const id = localStorage.getItem('key_id')

    if (nome === '' && apelido === '' && email === '') {
      Swal.fire({
        title: "Alerta",
        html: "Preencha ao menos um dos campos.",
        icon: 'warning',
        confirmButtonColor: '#de940a'
      }).then(() => {return} )
    }

    else {
      Swal.fire({
        title: "Deseja salvar as alterações?",
        showCancelButton: true,
        confirmButtonText: "Sim",
        confirmButtonColor: '#de940a',
        cancelButtonText: "Não"
      }).then((result) => {
        if (result.isConfirmed !== true) {
          return
        }
        else {
          switch (result.isConfirmed) {

            case (nome !== '' && apelido === '' && email === ''):
              Axios.put(`https://deploy-backend-api.vercel.app/editar-info-nome/${id}`, {
                nome: nome,
              }).then((response) => {
                if (response.data.msg !== ''){
                  msgSucesso()
                  setIsOpenPopup(this, false)
                  return Axios.post(`https://deploy-backend-api.vercel.app/registrarAcaoNome/${id}`)
                  .then((result) => {
                    console.log(result.data.msg)
                  })
                } 
              })
            break
    
            case (nome === '' && apelido !== '' && email === ''):
              Axios.put(`https://deploy-backend-api.vercel.app/editar-info-apelido/${id}`, {
                username: apelido
              }).then((response) => {
                if (response.data.msg !== '') {
                  msgSucesso()
                  setIsOpenPopup(this, false)
                  return Axios.post(`https://deploy-backend-api.vercel.app/registrarAcaoApelido/${id}`)
                  .then((result) => {
                    console.log(result.data.msg)
                  })
                }
              })
            break

            case (nome === '' && apelido === '' && email !== ''):
              Axios.put(`https://deploy-backend-api.vercel.app/editar-info-email/${id}`, {
                email: email,
              }).then((response) => {
                if (response.data.msg !== '') {
                  msgSucesso()
                  setIsOpenPopup(this, false)
                  return Axios.post(`https://deploy-backend-api.vercel.app/registrarAcaoEmail/${id}`)
                  .then((response) => {
                    console.log(response.data)
                  })
                }
              })
            break

            case (nome !== '' && apelido !== '' && email === ''):
              Axios.put(`https://deploy-backend-api.vercel.app/editar-info-nome-apelido/${id}`, {
                username: apelido,
                nome: nome
              }).then((response) => {
                if (response.data.msg !== '') {
                  msgSucesso()
                  setIsOpenPopup(this, false)
                  return Axios.post(`https://deploy-backend-api.vercel.app/registrarAcaoNomeApelido/${id}`)
                  .then((result) => {
                    console.log(result.data.msg)
                  })
                }
              })
            break

            case (nome !== '' && apelido === '' && email !== ''):
              Axios.put(`https://deploy-backend-api.vercel.app/editar-info-nome-email/${id}`, {
                email: email,
                nome: nome
              }).then((response) => {
                if (response.data.msg !== '') {
                  msgSucesso()
                  setIsOpenPopup(this, false)
                  return Axios.post(`https://deploy-backend-api.vercel.app/registrarAcaoNomeEmail/${id}`)
                  .then((result) => {
                    console.log(result.data.msg)
                  })
                }
              })
            break

            case (nome === '' && apelido !== '' && email !== ''):
              Axios.put(`https://deploy-backend-api.vercel.app/editar-info-usuario-email/${id}`, {
                email: email,
                username: apelido
              }).then((response) => {
                if (response.data.msg !== '') {
                  msgSucesso()
                  setIsOpenPopup(this, false)
                  return Axios.post(`https://deploy-backend-api.vercel.app/registrarAcaoUsuarioEmail/${id}`)
                  .then((result) => {
                    console.log(result.data.msg)
                  })
                }
              })
            break

            case (nome !== '' && apelido !== '' && email !== ''):
              Axios.put(`https://deploy-backend-api.vercel.app/editar-info/${id}`, {
                nome: nome,
                username: apelido,
                email: email,
              }).then((response) => {
                if (response.data.msg !== '') {
                  msgSucesso()
                  setIsOpenPopup(this, false)
                  return Axios.post(`https://deploy-backend-api.vercel.app/registrarAcaoNomeUsuarioEmail/${id}`)
                  .then((response) => {
                    console.log(response.data)
                  })
                }
              })
            break

            
              
          }
        }
      })
    }
  }

  return (
    <div className="primeiraDiv"
      // onClick={setIsOpenPopup.bind(this, false)}
    >
      {/* Content */}
      <div className="conteudo" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="header">
          {/* // style={{ borderBottom: "1px solid lightgray", paddingBottom: "10px" }} */}
          <h1 className="h1">Editar informações</h1>
          <div className="titulo"
            // onClick={setIsOpenPopup.bind(this, false)}
          >
          </div>
        </div>

        {/* Body */}
        <div className="inputGeral">
          <div className="input1">
            <p>Nome completo</p>
            <input type="text" name="nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
          </div>
          <div className="input2">
            <p>Nome de usuário</p>
            <input type="text" name="username" value={apelido} onChange={(e) => setApelido(e.target.value)}/>
          </div>
          <div className="input3">
            <p>Email</p>
            <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
        </div>

       {/* Footer */}
        <div className="botao">
          <button className="botao1" type="button" onClick={handleEditarInfo}><strong>Salvar</strong></button>
          <button className="botao2" type="button" onClick={setIsOpenPopup.bind(this, false)}><strong>Cancelar</strong></button>  
        </div>
      </div>
    </div>
  );
};

export default PopupEdicao;