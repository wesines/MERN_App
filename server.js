const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('API Running'));

//to use it on heruko or locally on 5000 port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
