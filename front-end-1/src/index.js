import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Usuarios from './components/Usuarios';
import Search from './components/Search';
import Problemas from './components/Problemas';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <div id="headerSimples">
      <ul>
        <li><a href="#area2">Ver soluções</a></li>
        <li><a href="#area3">Ver usuários</a></li>
      </ul>
    </div>
    <section id="area1">
      <App />
      <Search />
    </section>
    <section id="area2">
      <li><a href="#headerSimples">Voltar para o início</a></li>
      <Problemas />
    </section>
    <section id="area3">
      <li><a href="#headerSimples">Voltar para o início</a></li>
      <Usuarios />
    </section>
  </>
);