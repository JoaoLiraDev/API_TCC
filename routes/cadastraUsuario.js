module.exports = app => {
    const controller = require('../controllers/cadastraUsuario.')();

    app.route('api/v1/cadastraUsuario')
    .get(controller.listCadastraUsuario);
}