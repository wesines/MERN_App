const express = require('express');
const app = express();
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

const { use } = require('./routes/api/auth');
const { json } = require('express');
require('./middelware/passportConfig');
const passport = require('passport');

//connect Database
connectDB();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Init middelware
app.use(express.json({ extended: false }));

//app.get('/', (req, res) => res.send('API Running'));

//define routes
app.use('/api/users', require('./routes/api/users'));

app.use('/api/auth', require('./routes/api/auth'));

app.use('/api/profile', require('./routes/api/profile'));

app.use('/api/posts', require('./routes/api/posts'));

app.use(passport.initialize());

//to use it on heruko or locally on 5000 port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
