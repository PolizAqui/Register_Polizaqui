// saveInfo.controller.js

const { saveUser, getUser } = require('../models/users.js');

const controller = {};

controller.saveUser = async (req, res) => {
    try {
        const { nombre, apellido, telefono, email, password, provider, provider_id } = req.body;
        console.log(req.body);
        // Verificar si el usuario ya está registrado mediante el email
        let user = await getUser({ email });

        if (user.code === 200) {
            return res.status(500).json({ message: 'User Already Registered', status: false, code: 500 });
        } else if (user.code === 404) {
            // Si el usuario no está registrado, guardar la información
            let result = await saveUser({ nombre, apellido, telefono, email, password, provider, provider_id });

            if (result.status) {
                res.status(result.code).json(result);
            } else {
                res.status(500).json(result);
            }
        }
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).json({ error: 'Error saving user' });
    }
}

module.exports = controller;
