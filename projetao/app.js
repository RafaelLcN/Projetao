var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Importando o Sequelize e o modelo User
var sequelize = require('./models').sequelize;
// var User = require('./models/user')(sequelize);

var indexRouter = require('./routes/index'); //Para a rota principal do app
var usersRouter = require('./routes/users'); // Para a rota users ./routes/users.js

var app = express(); //Ativa a API express

app.use(logger('dev'));
app.use(express.json()); //Habilita o mapeamento de objetos escritos em JSON
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter); //Cria a rota app/
app.use('/users', usersRouter); //Cria a rota app/users

// Sincronizando o Sequelize (em dev)   
if (process.env.NODE_ENV !== 'production') {
    sequelize.sync({ force: true }) // use 'force: true' para recriar as tabelas a cada inicialização (útil em dev)
        .then(() => {
            console.log('Banco de dados sincronizado');
        })
        .catch(err => {
            console.error('Erro ao sincronizar o banco de dados:', err);
        });
}

//Iniciar o servidor com o app.js na porta 8080
var port = 8080;
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta 8080 ${port}`)
});
module.exports = app;
