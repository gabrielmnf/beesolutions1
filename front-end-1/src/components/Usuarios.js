import React, { useEffect, useState } from "react";
import axios from "axios";
import imgEdit from "../img/botaoeditar.ico";
import imgDelete from "../img/botaodeletar.ico";
import '../Usuarios.css';


export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [tipo, setTipo] = useState("");

  const url = "http://localhost:8081/";

//get
  useEffect(() => {
    fetch(url + "usuarios")
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((err) => console.log(err));
  }, [url]);

//post
  function novosDados() {
    setTipo("novo");
  }

//limpa as caixas de texto
  function cancelarDados() {
    setId("");
    setNome("");
    setEmail("");
    setTipo("");
  }

  function limparDados() {
    setId("");
    setNome("");
    setEmail("");
    setTipo("");
  }

//put
function editarDados(cod) {
  let usuario = usuarios.find((item) => item.id === cod);
  const { id, nome, email } = usuario;
  setTipo("editar");
  setId(id);
  setNome(nome);
  setEmail(email);
}


//   put / post
function gravaDados() {
  if (nome !== "" && email !== "") {
    if (tipo === "novo") {
      axios
        .post(url + "usuarios", {
          nome: nome,
          email: email,
        })
        .then((response) => atualizaListaComNovoUsuario(response))
        .catch((err) => console.log(err));
    } else if (tipo === "editar") {
      axios
        .put(url + "usuarios/" + id, {
          id: id,
          nome: nome,
          email: email,
        })
        .then((response) => atualizaListaUsuarioEditado(response))
        .catch((err) => console.log(err));
    }
  } else {
    console.log("Preencha os campos");
  }
}

  function deletarDados(cod) {
    let usuario = usuarios.find(item => item.id === cod);
    const {id} = usuario;
    axios
      .delete(url + "usuarios/" + id, {
      })
      .then(setUsuarios(usuarios.filter(item => item.id !== cod)));
  }

  // const atualizaListaUsuarios = (cod) => {
  //   window.location.reload(); 
  //   setTipo("");
  // };

  function atualizaListaComNovoUsuario(response) {

    const { id, nome, email } = response.data;
    const obj = { id: id, nome: nome, email: email };
    const users = usuarios;
    users.push(obj);
    setUsuarios(users);

    limparDados("");
    setTipo("");
  }

  function atualizaListaUsuarioEditado(response) {

    const { id } = response.data;
    const index = usuarios.findIndex( item => item.id == id );
    const users = usuarios;
    users[index].nome = nome;
    users[index].email = email;
    setUsuarios(users);

    limparDados("");
    setTipo("");
  }


  // function botaoGrava(){
  //   // atualizaListaNovosUsuarios();
  //   gravaDados();
  //   atualizaListaUsuarios();
  // }

  // const [value,setValue] = useState();

  // const refresh = ()=>{
  //     // it re-renders the component
  //    setValue({});
  // }

  return (
    
    <div>
      {/* <div>
        <p>{Math.random()}</p>
        <button onClick={refresh}>Refresh component</button>
      </div> */}
      <h2 id="usuariostitulo">Lista de Usuários</h2>
      <button class="botaoUsuario"type="button" onClick={novosDados}>
        Novo Usuário
      </button>
      {tipo ? (
        <>
          <br/>
          <div class="caixaTexto">
          <input
            id="nomeUsuario"
            type="text"
            name="txtNome"
            value={nome}
            placeholder = "Nome do usuário"
            onChange={(e) => {
              setNome(e.target.value);
            }}
          />
          <br/>
          <input
            id="emailUsuario"
            type="text"
            name="txtEmail"
            value={email}
            placeholder = "email do usuário"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          </div>
          <button class="botaoUsuario" type="button" onClick={cancelarDados}>
            Cancelar
          </button>
          <button class="botaoUsuario" type="button" onClick={gravaDados}>
            Gravar
          </button>
        </>
      ) : (
        false
      )}
      {usuarios
        ? usuarios.map((item) => {
            return (
              <div key={item.id}>
                <div id="listados">
                  {" "}
                  <h3>ID:{" "}{item.id} </h3>{"  "} Nome: {" "}{item.nome} {" | "} Email: {" "} {item.email}{" "}
                  <img
                    class="editarusuario"
                    alt="Editar"
                    src={imgEdit}
                    id={item.id}
                    height={20}
                    width={20}
                    onClick={(e) => editarDados(item.id)}
                  />
                  {" "}
                  <img
                    class="deletarusuario"
                    alt="Deletar"
                    src={imgDelete}
                    id={item.id}
                    height={20}
                    width={20}
                    onClick={(e) => deletarDados(item.id)}
                  />
                  {" "}
                </div>
              </div>
            );
          })
        : false}
        <br/>
    </div>
  );
}
