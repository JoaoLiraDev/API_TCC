const express = require('express');
const app = express();
const morgan = require('morgan');
const BodyParser = require('body-parser');
const rotaCadastro = require('./routes/CadastroUsuarios')
const rotaCadastroQuest = require('./routes/CadastroQuest');

app.use(morgan('dev'));
app.use(BodyParser.urlencoded({urlencoded: false})); //apenas dados simples
app.use(BodyParser.json());

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin,  X-Requested-With, Content-Type, Accept, Authorization');
    
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
});

app.use('/Cadastro', rotaCadastro);
app.use('/CreateQuest', rotaCadastroQuest);


app.use((req, res, next) => {
    const erro = new Error("Não encontrado")
    erro.status = 404;
    next(erro);
});

app.use((error,req, res, next) =>{
    res.status(error.status || 500);
    return res.send({
        err: {
            mensagem: error.mensagem
        }
    });
});

module.exports = app;