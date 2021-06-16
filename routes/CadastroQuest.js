const express = require('express');
const router = express.Router();
const mysql = require('../config/db').pool;
const jwt = require('jsonwebtoken');
const login = require('../middleware/login');
const controllerQuest = require('../controllers/Cadastro-controller');

router.get('/all', login.opcional, controllerQuest.getAllQuests);

router.get('/user', login.obrigatorio, controllerQuest.getUserQuests);

router.post('/cadastroQuest', login.opcional, controllerQuest.postCadastroQuest);

router.patch('/atualiza/:id_quest', login.obrigatorio, controllerQuest.updateQuest);

module.exports = router;