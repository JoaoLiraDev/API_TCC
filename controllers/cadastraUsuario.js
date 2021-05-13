module.exports = () => {
    const cadastraUsuarioDB = require('../data/cadastraUsuario.json');
    const controller = {};

    controller.listCadastraUsuario = (req, res) => res.status(200).json(cadastraUsuarioDB);

    return controller;
}