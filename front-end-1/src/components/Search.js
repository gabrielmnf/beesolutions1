import { useState } from "react";
import '../index.css';

export default function Search(){
    const [busca, setBusca] = useState ('');
    const url = "https://www.beecrowd.com.br/judge/pt/problems/view/";
    function Pesquisa() {
        // let exibe;
        // exibe= document.getElementById("exibicao").innerHTML = complemento;
        let linkCompleto = url + busca;
        const a = document.querySelector("#link-problema");
        a.href = linkCompleto;    
        return(
            false
        );
    }

    return(
        <>
            <div class="search">
                <h2 id="textoSearch">Buscar problema</h2>
                <div id="pesquisa">
                    <input
                        id="caixaSearch"
                        type="text" 
                        value={busca}
                        placeholder = "1001"
                        onChange = {(ev) => {
                            setBusca(ev.target.value)
                        }}
                    />
                    <button id="botaoSearch" type="button" onClick={Pesquisa}>
                        <a href="/" id="link-problema" target="_blank"> Enunciado do problema</a>
                    </button>   
                </div>
            </div>
        </>
    );
}


