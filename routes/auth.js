const express = require('express');
const { verify } = require('password-hash');
const User = require('../models/User');
const router = express.Router();

router.post('/login', express.json(), (req, res) => {
    const data = req.body;
    if (!data.email || !data.password) {
        return res.status(400).json({ error: 'required email and password' });
    }
    User.findOne({ email: data.email }).then((user) => {
        if (!user) {
            return res.status(401).json({ error: 'email not found!' });
        }
        if (verify(data.password, user.password)) {
            res.json({ success: true })
        } else {
            res.json({ error: true, message: 'incorrect password' });
        }
    });
})

module.exports = router;