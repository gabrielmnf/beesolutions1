
const todosUsuarios =  (req, res) => {
    try{
        client.query('SELECT * FROM Usuarios', function(err, result){
        if(err){
                return console.error('Erro ao executar a query', err);
            }
            res.send(result.rows);
            console.log("Chamou usuarios");
        });
    } catch (error) {
        console.log(error);
    }
}

// export {
//     todosUsuarios
// }

module.exports = {
   todosUsuarios,
}


