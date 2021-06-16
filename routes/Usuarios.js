const express = require('express');
const router = express.Router();
const mysql = require('../config/db').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const controllerUsuarios = require('../controllers/Usuarios-controller')

router.post('/cadastro', controllerUsuarios.postCadastro);

router.post('/login',controllerUsuarios.postLogin);

module.exports = router;