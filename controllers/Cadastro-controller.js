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
            'Select * from Questions where ID_USER = ? order by id_quest desc',
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


exports.getUserQuestsById = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'Select * from Questions where id_quest = ? ',
            req.params.id_quest,
            (error, resultado, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                };

                res.status(200).send({
                    mensagem: "Questões by ID!",
                    Query_result: resultado
                });
            }
        );
    });
};

exports.postCadastroLembrete = (req, res, next) => {
    
    const lembrete = {
        TITULO_LEMBRTE: req.body.TITULO_LEMBRTE,
        DT_LEMBRETE: req.body.DT_LEMBRETE
    };
    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO Lembretes_User(ID_USER ,TITULO_LEMBRTE, DT_LEMBRETE)VALUES(?,?,?)',
            [req.usuario.id_user, lembrete.TITULO_LEMBRTE, lembrete.DT_LEMBRETE],
            (error, resultado, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                };

                res.status(201).send({
                    mensagem: "Lembrete cadastrado com sucesso!",
                    id_lembrete: resultado.insertId,
                    LembreteCadastrado: lembrete
                });
            }
        );
    });

};

exports.getLembrete = (req, res, next) => {
    
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT ID_LEMBRETE ,TITULO_LEMBRTE, DATE_FORMAT( DT_LEMBRETE, "%d/%m/%Y" ) AS dataLembrete, ID_USER  FROM Lembretes_User WHERE ID_USER = ? order by dataLembrete desc',
            [req.usuario.id_user],
            (error, resultado, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                };

                res.status(201).send({
                    mensagem: "Lembrete do usuário!",
                    Lembrete: resultado
                });
            }
        );
    });

};

exports.postCadastroQuest = (req, res, next) => {
    
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
            'INSERT INTO Questions(ID_USER ,AUTOR, SERIE, TRIMESTRE, DISCIPLINA, CONTEUDO, DESCRICAO)VALUES(?,?,?,?,?,?,?)',
            [req.usuario.id_user, quest.autor, quest.ano, quest.trimestre, quest.materia, quest.conteudo, quest.descricao],
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

};

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

exports.deleteQuest = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(`delete from questions where ID_QUEST = ?`,
            [req.params.id_quest],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                };

                res.status(200).send({
                    mensagem: "Questão deletada com sucesso!"
                });
            }
        );
    });
}