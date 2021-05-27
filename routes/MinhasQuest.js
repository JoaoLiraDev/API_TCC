const express = require('express');
const router = express.Router();
const mysql = require('../config/db');

router.get('/', (req, res, next) => {
    
    res.status(200).send({
        mensagem: "Suas questões cadastradas"
        
    });
});

router.put('/:id', (req, res, next) => {

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
        'UPDATE QUEST SET ANO_ESCOLAR = ?, TRIMESTRE = ?, MATERIA = ?, AUTOR = ?, CONTEUDO = ?, DESCRICAO = ?',
        [quest.ano, quest.trimestre, quest.materia, quest.autor, quest.conteudo, quest.descricao],
        (error, resultado, field) => {
            conn.release();
            if(error){
                return res.status(500).send({
                    error: error,
                    response: null
                });
            };

            res.status(201).send({
                mensagem: "Questão atualizada com sucesso!",
                id_questao: resultado.insertId,
                QuestaoCadastrada: quest
            });
        }
    );
});
 
});

module.exports = router;