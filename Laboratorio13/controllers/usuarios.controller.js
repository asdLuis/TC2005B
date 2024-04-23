const model = require('../models/usuarios.model');

module.exports.login = async (request, response) => {
    const usuarioLogeado =
        model.login('user, pass');
    response.render("users/login", {
        user: usuarioLogeado
    });
}