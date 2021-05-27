const express = require('express');
const router = express.Router();
const mysql = require('../config/db').pool;
const bcrypt = require('bcrypt');

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
        DT_NASC: req.body.dt_nasc
    };

    mysql.getConnection((err, conn)=> {
        if(err) {return res.status(500).send({error: error})}
        conn.query('SELECT * FROM Users WHERE EMAIL = ?', [user.EMAIL], (error, results)=> {
            if(error){return res.status(500).send({error: error})};
            if (results.length > 0){
                res.status(409).send({mensagem: 'Usuário já cadastrado'})
            }else{
                bcrypt.hash(user.PASSWORD, 10, (errBcrypt, hash) => {
                    if(errBcrypt) {return res.status(500).send({error_crypt: errBcrypt})}
                    conn.query(
                        'INSERT INTO Users(USERNAME, PASSWORD, FIRST_NAME, LAST_NAME, EMAIL, SUBS_TYPE, DT_NASC)VALUES(?,?,?,?,?,?,?)',
                        [user.USERNAME, hash, user.FIRST_NAME, user.LAST_NAME, user.EMAIL, user.ESPECIALIDADE, user.DT_NASC],
                        (error, resultado, field) => {
                            conn.release();
                
                            if(error){return res.status(500).send({error: error,response: null})};
                            
                            response = {
                                mensagem: "Usuário cadastrado com sucesso!",
                                usuario_criado:{
                                    id_user: resultado.insertId,
                                    UsuarioCadastrado:{ USERNAME: req.body.nome,
                                                        PASSWORD: hash,
                                                        EMAIL: req.body.email, 
                                                        FIRST_NAME: req.body.fist_name, 
                                                        LAST_NAME: req.body.last_name, 
                                                        ESPECIALIDADE: req.body.especialidade,
                                                        DT_NASC: req.body.dt_nasc}
                                }
                            }
                            
                            return res.status(201).send(response);
                        }
                    );
        
                });
            }
        });
});
 
});
module.exports = router;