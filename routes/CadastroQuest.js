const express = require('express');
const router = express.Router();
const mysql = require('../config/db').pool;
const jwt = require('jsonwebtoken');
const login = require('../middleware/login');


router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: "Method GET"
        
    });
});


router.post('/', login.obrigatorio, (req, res, next) => {
    console.log(req.usuario);
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
        'INSERT INTO Questions(AUTOR, SERIE, TRIMESTRE, DISCIPLINA, CONTEUDO, DESCRICAO)VALUES(?,?,?,?,?,?)',
        [quest.autor, quest.ano, quest.trimestre, quest.materia, quest.conteudo, quest.descricao],
        (error, resultado, field) => {
            conn.release();

            if(error){
                return res.status(500).send({
                    error: error,
                    response: null
                });
            };

            res.status(201).send({
                mensagem: "Questão cadastrada com sucesso!",
                id_questao: resultado.insertId,
                QuestaoCadastrada: quest
            });
        }
    );
});
 
});

module.exports = router;