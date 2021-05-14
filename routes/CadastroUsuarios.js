const express = require('express');
const router = express.Router();
const mysql = require('../config/db');

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: "Lista de Usuarios"
        
    });
});

router.post('/', (req, res, next) => {
    const user = {
        USERNAME: req.body.nome, 
        PASSWORD: req.body.senha, 
        EMAIL: req.body.email, 
        FIRST_NAME: req.body.fist_name, 
        LAST_NAME: req.body.last_name, 
        ESPECIALIDADE: req.body.especialidade, 
        IDENTIFICACAO_ESCOLAR: req.body.identificacao_escolar, 
        DT_NASC: req.body.dt_nasc
    };

    res.status(201).send({
        mensagem: "Usuario criado com sucesso!",
        usuarioCriado: user
    });
});

module.exports = router;