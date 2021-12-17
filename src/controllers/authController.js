const express = require('express');
const User = require('../schemas/user');
const router = express.Router();

const UserSchema = require('../schemas/user');

router.post('/register', async (req, res) => {
    const { email } = req.body;
    try {
        if (await UserSchema.findOne({ email })) {
            return res.status(400).send({ error: 'User already exists' });
        }
        const user = await UserSchema.create(req.body);
        user.password = undefined;
        return res.send({ user });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error });
    }
});

module.exports = app => app.use('/auth', router);