const PORT = process.env.PORT || 3000;

const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();

app.use('/users', users);

app.use('/auth', auth);

mongoose.connect(process.env.MONGODB_URL).then(() => {
    app.listen(PORT, () => {
        console.log('server is running on port', PORT);
    });
}).catch((err) => {
    console.log(err);
    console.error('Failed to connect MongoDB');
});
