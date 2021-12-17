const express = require('express');
const bcrypt = require('bcryptjs/dist/bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

const UserSchema = require('../schemas/user');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {
    const { email } = req.body;
    try {
        if (await UserSchema.findOne({ email })) {
            return res.status(400).send({ error: 'User already exists' });
        }
        const user = await UserSchema.create(req.body);
        user.password = undefined;
        return res.send({ user, token: generateToken({ id: user.id }) });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserSchema.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(401).send({ error: 'Invalid password' });
        }

        user.password = undefined;

        return res.send({ user, token: generateToken({ id: user.id }) });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error });
    }
});

module.exports = app => app.use('/auth', router);