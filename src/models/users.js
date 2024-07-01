// users.js

const pool = require('../utils/mysql.connect');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { KEY } = require('../global/_var.js');

const getUser = async ({ email }) => {
    try {
        let msg = {
            status: false,
            message: 'User not found',
            code: 404
        }

        const connection = await pool.getConnection();

        let sql = `SELECT id_usuario FROM usuarios WHERE email = ?`;
        const [user] = await connection.execute(sql, [email]);

        if (user.length > 0) {
            msg = {
                status: true,
                message: 'Email found',
                dataUser: user,
                code: 200
            }
        }

        connection.release();
        return msg;

    } catch (err) {
        console.log(err);
        let msg = {
            status: false,
            message: 'Error en el Servidor',
            code: 500,
            error: err
        }
        return msg;
    }
}

const saveUser = async ({ nombre, apellido, telefono, email, password, provider, provider_id }) => {
    try {
        let msg = {
            status: false,
            message: 'User not Registered',
            code: 500
        }

        const connection = await pool.getConnection();
        let hash = null;

        // Verificar si se proporciona una contraseña
        if (password) {
            hash = await bcrypt.hash(password, 10); // Hash de la contraseña con 10 rondas de sal
        }

        const fechaActual = new Date();
        const date_created = fechaActual.toISOString().split('T')[0];

        let tokenLic = {
            email: email,
            date_created: date_created
        }

        const token = jwt.sign(tokenLic, KEY, { algorithm: 'HS256' });

        let sql = `INSERT INTO usuarios (nombre, apellido, email, telefono, password, provider, provider_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const [user] = await connection.execute(sql, [nombre, apellido, email, telefono, hash, provider, provider_id, date_created]);
        console.log(user);
        if (user.affectedRows > 0) {
            msg = {
                status: true,
                message: 'User registered successfully',
                code: 200
            }
        }

        connection.release();
        return msg;

    } catch (err) {
        let msg = {
            status: false,
            message: 'Error en el Servidor',
            code: 500,
            error: err.message // Devolver el mensaje de error específico
        }
        return msg;
    }
}

module.exports = {
    getUser,
    saveUser
}
