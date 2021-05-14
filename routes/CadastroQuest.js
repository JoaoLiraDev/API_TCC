const express = require('express');
const router = express.Router();
const mysql = require('../config/db').pool;

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: "Method GET"
        
    });
});

router.post('/', (req, res, next) => {

    const quest = {
        ano: req.body.ano,
        trimestre: req.body.trimestre,
        materia: req.body.materia,
        autor: req.body.autor,
        conteudo: req.body.conteudo,
        descricao: req.body.descricao
    };
    mysql.getConnection((error, conn)=> {
        conn.query(
            'INSERT INTO QUESTS()'
        );
    });

    res.status(201).send({
        mensagem: "Questão cadastrada com sucesso!",
        usuarioCriado: quest
    });
});

module.exports = router;