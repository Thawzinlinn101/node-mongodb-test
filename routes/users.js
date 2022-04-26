const express = require('express');
const User = require('../models/User');
const { generate } = require('password-hash');

const router = express.Router();

// GET /users
router.get('/', (req, res) => {
    User.find().all().then((users) => res.json(users.map(user => ({
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    }))));
});


// GET /users/:id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find(user => user.id == id);
    if (!user) {
        return res.status(404).json({ error: 'user not found' })
    }
    res.json({
        result: user
    })
});

// POST /users
router.post('/', express.json(), (req, res) => {
    const data = req.body;
    if (!data.name || !data.email || !data.password) {
        return res.status(400).json({ error: 'required name,email,password' })
    }
    const user = {
        name: data.name,
        email: data.email,
        password: generate(data.password),
    };
    User.create(user).then(() => {
        res.json({ success: true });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: true })
    })
});

// POST /users/:id
router.post('/users/:id', express.json(), (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const index = users.findIndex(user => user.id == id);
    if (index === -1) {
        return res.status(404).json({ error: 'user not found' });
    }
    if (!data.name) {
        return res.status(400).json({ error: 'required name' })
    }
    users[index].name = data.name;
    users[index].updatedAt = new Date();
    res.json({
        success: true
    });
});

// DELETE /users/:id
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const index = users.findIndex(user => user.id == id);
    if (index === -1) {
        return res.status(404).json({ error: 'user not found' });
    }
    users.splice(index, 1);
    res.json({
        success: true
    });
});

module.exports = router;