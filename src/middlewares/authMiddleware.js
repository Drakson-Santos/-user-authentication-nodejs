const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        return res.status(401).send({ message: 'Not authenticated.' });
    }

    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2) {
        return res.status(401).send({ message: 'Not authenticated.' });
    }

    const [ scheme, token ] = tokenParts;
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ message: 'Not authenticated.' });
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Not authenticated.' });
        }
        req.userId = decoded.id;
        return next();
    });
}

