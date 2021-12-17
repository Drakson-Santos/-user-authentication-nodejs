const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);
router.get('/', (req, res) => {
    res.send('projects');
});

module.exports = app => app.use("/projects", router);