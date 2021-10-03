const mysql = require('../config/db').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const EmailConfig = require('../private/EmailConfig');

exports.postCadastro = (req, res, next) => {

    const user = {
        USERNAME: req.body.nome,
        PASSWORD: req.body.senha,
        EMAIL: req.body.email,
        FIRST_NAME: req.body.first_name,
        LAST_NAME: req.body.last_name,
        ESPECIALIDADE: req.body.especialidade,
        DT_NASC: req.body.dt_nasc
    };

    mysql.getConnection((err, conn) => {
        if (err) { return res.status(500).send({ error: error }) }
        conn.query('SELECT * FROM Users WHERE EMAIL = ?', [user.EMAIL], (error, results) => {
            if (error) { return res.status(500).send({ error: error }) };
            if (results.length > 0) {
                res.status(409).send({ mensagem: 'Usuário já cadastrado' })
            } else {
                bcrypt.hash(user.PASSWORD, 10, (errBcrypt, hash) => {
                    if (errBcrypt) { return res.status(500).send({ error_crypt: errBcrypt }) }
                    conn.query(
                        'INSERT INTO Users(USERNAME, PASSWORD, FIRST_NAME, LAST_NAME, EMAIL, SUBS_TYPE, DT_NASC)VALUES(?,?,?,?,?,?,?)',
                        [user.USERNAME, hash, user.FIRST_NAME, user.LAST_NAME, user.EMAIL, user.ESPECIALIDADE, user.DT_NASC],
                        (error, resultado, field) => {
                            conn.release();

                            if (error) { return res.status(500).send({ error: error, response: null }) };

                            response = {
                                mensagem: "Usuário cadastrado com sucesso!",
                                usuario_criado: {
                                    id_user: resultado.insertId,
                                    UsuarioCadastrado: {
                                        USERNAME: req.body.nome,
                                        PASSWORD: hash,
                                        EMAIL: req.body.email,
                                        FIRST_NAME: req.body.fist_name,
                                        LAST_NAME: req.body.last_name,
                                        ESPECIALIDADE: req.body.especialidade,
                                        DT_NASC: req.body.dt_nasc
                                    }
                                }
                            }

                            return res.status(201).send(response);
                        }
                    );

                });

                var emailSend = {
                    from: "auth.Myquestions@gmail.com",
                    to: user.EMAIL,
                    subject: "Bem vindo a equipe do MyQuestions!",
                    html: `
                    <body>
                        <div class="container">
                            <div class="main" >
                                <h1 style="font-family: Georgia, 'Times New Roman', Times, serif;color: #E96C64;">Bem Vindo a equipe
                                    MyQuestions</h1>
                    
                                <h3 style="font-family: Georgia, 'Times New Roman', Times, serif;color: #413D3C;">Estamos muito felizes em
                                    receber você aqui na nossa plataforma.</h3>
                                <h5 style="font-family: Georgia, 'Times New Roman', Times, serif;color: #413D3C;">Agora que já faz parte
                                    dessa comunidade que tal dar uma olhadinha em nossa plataforma<br>aqui você pode
                                    criar novas questões e ver questões que outros usuários já criaram.</h5>
                    
                                <br>
                                <img src="cid:unique@cid" alt="Verified_Img" width="500vw" height="400vh" style="margin-left: 5vw;">
                                <br>
                                <p id="rodape"
                                    style="font-family: Georgia, 'Times New Roman', Times, serif;font-size: smaller;opacity: 0.6;">
                                    Você recebeu um email automático da MyQuestions Group.<br />
                                    Para entrar em contato com nossa equipe nos envie um email<br />
                                    em <strong><i>auth.Myquestions@gmail.com</i></strong>.<br />
                                    Rua das Rosas, N°1094, SP | Brasil. <br /><br />
                                    © MyQuestions, since 2019
                                </p>
                    
                    
                            </div>
                        </div>
                    </body>
                    `,
                    attachments: [{
                        filename: 'happy_news.png',
                        path: './public/happy_news.png',
                        cid: 'unique@cid'
                    }],
                }

                const mail = nodemailer.createTransport({
                    host: '',
                    service: 'gmail',
                    port: 587,
                    secure: true,
                    auth: {
                        user: EmailConfig.EmailConfig.user,
                        pass: EmailConfig.EmailConfig.pass
                    }
                });
                mail.sendMail(emailSend, function (error) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Email enviado com sucesso.");
                    }
                });

            }
        });
    });

};

exports.getUser = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM Users WHERE ID_USERS = ?',
            req.usuario.id_user,
            (error, result, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                };

                res.status(200).send({
                    mensagem: "Dados do usuário",
                    user: result[0]
                });
            }
        );
    });
}

exports.postLogin = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        const query = 'SELECT * FROM Users WHERE EMAIL = ?';
        conn.query(query, [req.body.email], (error, results, fields) => {
            conn.release();
            if (error) { return res.status(500).send({ error: error }) }
            if (results.length < 1) {
                return res.status(401).send({ mensagem: 'Falha na autenticação' })
            }
            bcrypt.compare(req.body.senha, results[0].PASSWORD, (err, result) => {
                if (err) {
                    return res.status(401).send({ mensagem: 'Falha na autenticação' });
                }
                if (result) {
                    const token = jwt.sign({
                        id_user: results[0].ID_USERS,
                        email: results[0].EMAIL
                    }, 'MyQuestionsKey', {
                        expiresIn: "5h"
                    });
                    return res.status(200).send({
                        mensagem: 'Autenticado com sucesso',
                        token: token,
                        user: {
                            id_user: results[0].ID_USERS,
                            username: results[0].USERNAME,
                            first_name: results[0].FIRST_NAME,
                            last_name: results[0].LAST_NAME,
                            email: results[0].EMAIL,
                        }


                    });
                }
                return res.status(401).send({ mensagem: 'Falha na autenticação' });
            });
        });
    });
};