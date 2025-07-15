const express = require('express');
const app = express();
const port = 5000;

const cors = require('cors');
app.use(cors());

const items = [
    { id: 1, name: 'Burger' },
    { id: 2, name: 'Fries' },
    { id: 3, name: 'Soda' },
];

app.get('/items', (req, res) => {
    res.json(items);
});

app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
});