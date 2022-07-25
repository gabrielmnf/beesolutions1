import React from "react";
// import Usuarios from "./Usuarios";

export default function UsuariosTabela(props) {
  return (
    <table>
        <p>{props.esqueci}</p>
      <thead>
        <tr>
          <th colspan="2">Lista de usuários</th>
        </tr>
      </thead>
      <tbody>
        {props.usuarios.map((item) => {
          return (
            <div>
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
              </tr>
            </div>
          );
        })}
      </tbody>
    </table>
  );
}

