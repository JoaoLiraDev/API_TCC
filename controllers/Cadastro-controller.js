const mysql = require('../config/db').pool;
const jwt = require('jsonwebtoken');
const login = require('../middleware/login');

exports.getAllQuests = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'select * from questions order by id_quest desc',
            (error, result, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                };

                res.status(200).send({
                    mensagem: "Resultado das Questões cadastradas",
                    Query_result: result
                });
            }
        );
    });
};

exports.getUserQuests = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'Select * from Questions where ID_USER = ?',
            req.usuario.id_user,
            (error, resultado, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                };

                res.status(200).send({
                    mensagem: "Questões do usuário!",
                    Query_result: resultado
                });
            }
        );
    });
};

exports.postCadastroQuest = (req, res, next) => {
    console.log(req.usuario);
    const quest = {
        ano: req.body.ano,
        trimestre: req.body.trimestre,
        materia: req.body.materia,
        autor: req.body.autor,
        conteudo: req.body.conteudo,
        descricao: req.body.descricao
    };
    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO Questions(AUTOR, SERIE, TRIMESTRE, DISCIPLINA, CONTEUDO, DESCRICAO)VALUES(?,?,?,?,?,?)',
            [quest.autor, quest.ano, quest.trimestre, quest.materia, quest.conteudo, quest.descricao],
            (error, resultado, field) => {
                conn.release();

                if (error) {
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

}

exports.updateQuest = (req, res, next) => {
    const quest = {
        ano: req.body.ano,
        trimestre: req.body.trimestre,
        materia: req.body.materia,
        autor: req.body.autor,
        conteudo: req.body.conteudo,
        descricao: req.body.descricao,

    };
    mysql.getConnection((error, conn) => {
        conn.query(`UPDATE questions SET SERIE = ?, TRIMESTRE = ?, DISCIPLINA = ?, AUTOR = ?, CONTEUDO = ?, DESCRICAO = ? where ID_QUEST = ?`,
            [quest.ano, quest.trimestre, quest.materia, quest.autor, quest.conteudo, quest.descricao, req.params.id_quest],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                };

                res.status(201).send({
                    mensagem: "Questão atualizada com sucesso!",
                    QuestaoCadastrada: quest
                });
            }
        );
    });

}