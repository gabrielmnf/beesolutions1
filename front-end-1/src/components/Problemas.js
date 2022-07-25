import React, { useEffect, useState, /*Component*/ } from "react";
import axios from "axios";
import imgEdit from "../img/botaoeditar.ico";
import imgDelete from "../img/botaodeletar.ico";
import '../Problemas.css';
// import Simpletextarea from "./textarea";

export default function Problemas() {
  const [id, setId] = useState("");
  const [problemas, setProblemas] = useState([]);
  // const [usuarios, setUsuarios] = useState([]);
  // const [nome, setNome] = useState("");
  const [id_usuario, setId_usuario] = useState("");
  const [numero, setNumero] = useState("");
  const [solucao, setSolucao] = useState("");
  const [tipo, setTipo] = useState("");

  const url = "http://localhost:8081/";

//get 
  useEffect(() => {
    fetch(url + "solucao")
      .then((response) => response.json())
      .then((data) => setProblemas(data))
      .catch((err) => console.log(err));
  }, [url]);

//post 
function novaSolucao() {
    setTipo("nova");
  }

//limpa as caixas de texto
  function limparDados() {
    setId("");
    setId_usuario("");
    setTipo("");
    setNumero("");
    setSolucao("");
  }

  function cancelarDados() {
    setId("");
    setId_usuario("");
    setTipo("");
    setNumero("");
    setSolucao("");
  }

//   put CERTO
  function editarDados(cod) {
    console.log(cod);
    let resposta = problemas.find(item => item.id === cod);
    const {id_usuario, numero, solucao} = resposta;
    console.log(resposta);
    setTipo("editar");
    setId(id);
    setId_usuario(id_usuario);
    setNumero(numero);
    setSolucao(solucao);
  }

  function atualizaListaComNovoProblema(response) {

    const { id_usuario, numero, solucao } = response.data;
    const obj = { id_usuario: id_usuario, numero: numero, solucao: solucao };
    const problems = problemas;
    problems.push(obj);
    setProblemas(problems);

    limparDados("");
    setTipo("");
  }

  function atualizaListaProblemaEditado(response) {

    const { id } = response.data;
    const index = problemas.find( item => item.id == id );
    const problems = problemas;
    problems[index].numero = numero;
    problems[index].solucao = solucao;
    setProblemas(problems);

    limparDados("");
    setTipo("");
  }


//   put / post
  function gravaSolucao() {
    if (id_usuario !== "" && numero !== "" && solucao !== "") {
      if (tipo === "nova") {
        axios
          .post(url + "usuarios/" + id_usuario + "/solucao", {
            id_usuario: id_usuario,
            numero: numero,
            solucao: solucao,
          })
          .then((response) => atualizaListaComNovoProblema(response))
          .catch((err) => console.log(err));
      } else if (tipo === "editar") {
          axios.put(url + "usuarios/" + id_usuario + "/solucao/" + numero, {
          id_usuario: id_usuario,
          numero: numero,
          solucao: solucao,
        })
        .then(response => atualizaListaProblemaEditado(response))
        .catch((err) => console.log(err));
      }
    } else {
      console.log("Preencha os campos");
    }
  }
  

//delete
// function deletarDados(cod) {
//   console.log(cod);
//     let resposta = problemas.find(item => item.id === cod);
//     const {id_usuario, numero} = resposta;
//     console.log(resposta);
//     setTipo("");
//     setId(id_usuario, numero);  
//     axios
//         .delete(url + "usuarios/" + id_usuario + "/solucao/" + numero, {
//           id_usuario: id_usuario,
//           numero: numero,
//         })
//         .then((response) => atualizaListaProblemas(response))
//         .catch((err) => console.log(err));
// }

function deletarDados(cod) {
  let resposta = problemas.find(item => item.id === cod);
  const {id_usuario, numero} = resposta;
  axios
  .delete(url + "usuarios/" + id_usuario + "/solucao/" + numero, {
    id_usuario: id_usuario,
    numero: numero,
  })
  .then(setProblemas(problemas.filter(item => item.id !== cod)));
}

// function nomeUsuario(cod){
//   // let resposta = usuarios.find(item => item.id === cod);
//   // let {nome} = resposta;
//   // return (resposta);
// }

  return (
    <div>
      <h2 id="solucoestitulo">Lista de Soluções</h2>
      <button class="botaoSolucao" type="button" onClick={novaSolucao}>
        Nova Solução
      </button>
      {tipo ? (
        <>
          <br/>
          <div class="caixaTexto">
          <input
            id="idUsuario"
            type="text"
            name="txtId_usuario"
            value={id_usuario}
            placeholder = "Id do usuário"
            onChange={(e) => {
              setId_usuario(e.target.value);
            }}
          />
          <br/>
          <input
            id="numeroProblema"
            type="text"
            name="txtNumero"
            value={numero}
            placeholder = "Número do problema"
            onChange={(e) => {
              setNumero(e.target.value);
            }}
          />
          <br/>
          <textarea
            id="solucaoProblema"
            type="textarea"
            rows={20}
            cols={40}
            value={solucao}
            placeholder = "Escreva sua solução"
            onChange={(e) => {
              setSolucao(e.target.value);
            }}
          />
          </div>
          <button class="botaoSolucao" type="button" onClick={cancelarDados}>
            Cancelar
          </button>
          <button class="botaoSolucao" type="button" onClick={gravaSolucao}>
            Gravar
          </button>
        </>
      ) : (
        false
      )}
      {problemas
        ? problemas.map((item) => {
            return (
              <div key={item.id}>
                <div id="listados">
                  {" "}
                  <h3>Usuário:{" "}{(/*nomeUsuario*/(item.id_usuario))} {"|"} Número do problema: {item.numero}</h3> 
                  <pre><code>{item.solucao}</code></pre>{" "}
                  <img
                    class="editarproblema"
                    alt="Editar"
                    src={imgEdit}
                    id={item.id}
                    height={20}
                    width={20}
                    onClick={(e) => editarDados(item.id)}
                  />
                  {" "}
                  <img
                    class="deletarproblema"
                    alt="Deletar"
                    src={imgDelete}
                    id={item.id}
                    height={20}
                    width={20}
                    onClick={(e) => deletarDados(item.id)}
                  />
                </div>
              </div>
            );
          })
        : false}
    </div>
  );

}

//COLOCAR TUDO EM TABELA.