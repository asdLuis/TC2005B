const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarios.controller.js');

router.get('/test_json', (request, response) => {
    response.status(200).json({code: 200, message: "Hola Mundo"});
});
router.get('/login', controller.login)
router.post('/login', () => {})
router.get('/registro', () => {})
router.post('/registro', () => {})
router.get('/obtener_usuarios', () => {})
router.post('/obtener_usuario', () => {})
router.get('/buscar_usuario', () => {})
router.post('/buscar_usuario', () => {})
router.get('/editar_usuario', () => {})
router.post('/editar_usuario', () => {})
router.get('/eliminar_usuario', () => {})
router.post('/eliminar_usuario', () => {})

module.exports = router;