const express = require("express");
const {Client} = require('pg');
const cors = require("cors");
const bodyparser = require("body-parser");
const config = require("./config");
const funcoes = require("./funcoes"); //funciona
// import { todosUsuarios } from "./funcoes.js";

const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(bodyparser.json());

var conString = config.urlConnection;

var client = new Client(conString);

//const client = new Client(process.env.urlConnection);

client.connect(function(err){
    if(err){
        return console.error('Não foi possível conectar ao banco.', err);
    }
    client.query('SELECT NOW()', function(err, result) {
    if(err) {
        return console.error('Erro ao executar a query.', err);
    }
        console.log(result.rows[0]);
    });
});

app.get("/", (req, res) => {
    console.log("Response ok.");
    res.send("Ok");
});

// app.get("/usuarios", funcoes.todosUsuarios);

app.get("/usuarios", (req, res) => {
    try{
        client.query('SELECT * FROM Usuarios', 
        function(err, result){
            if(err){
                return console.error('Erro ao executar a query', err);
            }
            res.send(result.rows);
            console.log("Chamou usuarios");
        });
    } catch(error){
        console.log(error);
    }
});

app.get("/solucao", (req, res) => {
    try{
        client.query('SELECT * FROM Problemas', 
        function(err, result){
            if(err){
                return console.error('Erro ao executar a query', err);
            }
            res.send(result.rows);
            console.log("Chamou solucao");
        });
    } catch(error){
        console.log(error);
    }
});

// app.get("/solucao/:numero", (req, res) => {
//     try{
//         console.log("Chamou /:numero " + req.params.numero);
//         client.query('SELECT solucao FROM Problemas WHERE numero = $1', 
//         [req.params.numero],
//         function(err, result){
//             if(err){
//                 return console.error('Erro ao executar a query de SELECT numero', err);
//             }
//         res.send(result.rows);
//         console.log(result);
//         });
//     } catch (error){
//         console.log(error);
//     }
// });

app.get("/usuarios/:id", (req, res) => {
    try{
        console.log("Chamou /:id " + req.params.id);
        client.query('SELECT * FROM Usuarios WHERE id = $1', 
        [req.params.id],
        function(err, result){
        if(err){
                return console.error('Erro ao executar a query de SELECT id', err);
        }
        res.send(result.rows);
        console.log(result);
        });
    } catch (error) {
        console.log(error);
    }
});

app.get("/usuarios/:id/solucao/:numero", (req, res) => {
    try{
        console.log("Chamou /:id " + req.params.id + " e Chamou /:numero " + req.params.numero);
        const id = req.params.id;
        const numero = req.params.numero;
        client.query('SELECT Usuarios.nome, Usuarios.email, Problemas.numero, Problemas.solucao FROM Usuarios JOIN Problemas ON Usuarios.id = Problemas.id_usuario WHERE Usuarios.id = $1 AND Problemas.numero = $2', 
        [id,numero],
        function(err, result){
        if(err){
                return console.error('Erro ao executar a query', err);
        }
        res.send(result.rows);
        console.log(result);
        });
    } catch (error) {
        console.log(error);
    }
});

app.delete("/usuarios/:id", (req, res) => {
    try{
        console.log("Chamou delete /:id " + req.params.id);
        const id = req.params.id;
        client.query(
            "DELETE FROM Usuarios WHERE id = $1", [id],
            function(err, result){
                if(err){
                    return console.error("Erro ao executar a qry de DELETE", err);
                } else {
                    if(result.rowCount == 0){
                        res.status(400).json({info: "Registro não encontrado."});
                    } else {
                        res.status(200).json({ info: `Registro excluído.
                        Código: ${id}`});
                    }
                }
            }
        )
    }catch (error) {
        console.log(error);
    }
});

app.delete("/usuarios/:id/solucao/:numero", (req, res) => {
    try{
        console.log("Chamou /:id " + req.params.id + " e Chamou /:numero " + req.params.numero);
        const id = req.params.id;
        const numero = req.params.numero;
        client.query('DELETE From Problemas WHERE Problemas.id_usuario = $1 AND Problemas.numero = $2', 
        [id,numero],
        function(err, result){
        if(err){
                return console.error('Erro ao executar a query', err);
        }
        res.send(result.rows);
        console.log(result);
        });
    } catch (error) {
        console.log(error);
    }
});

app.post("/usuarios", (req, res) => {
    try{
        console.log("Chamou post", req.body);
        const {nome, email} = req.body;
        client.query(
            "INSERT INTO Usuarios (nome, email) VALUES ($1, $2) RETURNING * ", [nome, email],
            function(err, result){
                if(err){
                    return console.error("Erro ao executar a qry de INSERT", err);
                } 
                const {id} = result.rows[0];
                res.setHeader("id", `${id}`);
                res.status(201).json(result.rows[0]);
                console.log(result);
            }
        )
    }catch (error) {
        console.log(error);
    }
});

app.post("/usuarios/:id/solucao", (req, res) => {
    try{
        console.log("Chamou post", req.body);
        const id_usuario = req.params.id;
        const {numero, solucao} = req.body;
        client.query(
            "INSERT INTO Problemas (id_usuario, numero, solucao) VALUES ($1, $2, $3) RETURNING * ", [id_usuario, numero, solucao],
            function(err, result){
                if(err){
                    return console.error("Erro ao executar a qry de INSERT", err);
                } 
                const {id} = result.rows[0];
                // res.setHeader("id", `${id}`);
                // res.status(201).json({ info: `Registro criado com o código ${id}`});
                res.setHeader("id", `${id}`);
                res.status(201).json(result.rows[0]);
                console.log(result);
            }
        )
    }catch (error) {
        console.log(error);
    }
});

app.put("/usuarios/:id", (req, res) => {
    try{
        console.log("Chamou post", req.body);
        const id = req.params.id;
        const {nome, email} = req.body;
        client.query(
            "UPDATE Usuarios SET nome=$1, email=$2 WHERE id = $3 ", [nome, email, id],
            function(err, result){
                if(err){
                    return console.error("Erro ao executar a qry de UPDATE", err);
                } else {
                    res.setHeader("id", id);
                    res.status(202).json({ id: id });
                    console.log(result);
                }
            }
        )
    }catch (error) {
        console.log(error);
    }
});

app.put("/usuarios/:id/solucao/:numero", (req, res) => {
    try{
        console.log("Chamou post", req.body);
        const id = req.params.id;
        const id_usuario = req.params.id;
        const numero = req.params.numero;
        const {solucao} = req.body;
        client.query(
            "UPDATE Problemas SET id_usuario=$1, numero=$2, solucao=$3", [id_usuario, numero, solucao],
            function(err, result){
                if(err){
                    return console.error("Erro ao executar a qry de UPDATE", err);
                } else {
                    // res.setHeader("id", `${numero}`);
                    // res.status(202).json({ info: `Registro atualizado.
                    // Código: ${numero    }`});
                    res.setHeader("id", id);
                    res.status(202).json({ id: id });
                    console.log(result);
                }
            }
        )
    }catch (error) {
        console.log(error);
    }
});

app.listen(config.port, () =>
console.log("Servidor funcionando na porta " + config.port)
);


