const express = require('express');
const router = express.Router();
const mysql = require('../config/db').pool;
const jwt = require('jsonwebtoken');
const login = require('../middleware/login');
const controllerQuest = require('../controllers/Cadastro-controller');

router.get('/all', login.opcional, controllerQuest.getAllQuests);

router.get('/user', login.obrigatorio, controllerQuest.getUserQuests);

router.get('/QuestId/:id_quest', login.obrigatorio, controllerQuest.getUserQuestsById);

router.get('/lembretes', login.obrigatorio, controllerQuest.getLembrete);

router.post('/cadastroQuest', login.obrigatorio, controllerQuest.postCadastroQuest);

router.post('/cadastroLembrete', login.obrigatorio, controllerQuest.postCadastroLembrete);

router.patch('/atualiza/:id_quest', login.obrigatorio, controllerQuest.updateQuest);

router.delete('/delete_quest/:id_quest', login.obrigatorio, controllerQuest.deleteQuest)


module.exports = router;