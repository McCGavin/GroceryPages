const express = require('express');
const app = express();
const port = 5000;

const cors = require('cors');
app.use(cors());

const items = [
    {
        id: 1,
        name: "Organic Banana",
        description: "Fresh organic bananas from Costa Rica",
        imageID: "banana001.jpg",
        itemPrice: 199,
        itemQuantity: 122,
        discountCode: "FRUIT99",
        isOnSale: true
    },
    {
        id: 2,
        name: "Fresh Strawberries",
        description: "Sweet and juicy strawberries from local farms",
        imageID: "strawberry001.jpg",
        itemPrice: 399,
        itemQuantity: 85,
        discountCode: "BERRY10",
        isOnSale: false
    },
    {
        id: 3,
        name: "Organic Avocado",
        description: "Creamy organic avocados perfect for toast",
        imageID: "avocado001.jpg",
        itemPrice: 249,
        itemQuantity: 67,
        discountCode: null,
        isOnSale: true
    },
    {
        id: 4,
        name: "Red Bell Pepper",
        description: "Crisp red bell peppers rich in vitamins",
        imageID: "pepper001.jpg",
        itemPrice: 179,
        itemQuantity: 43,
        discountCode: "VEGGIE5",
        isOnSale: false
    },
    {
        id: 5,
        name: "Whole Milk",
        description: "Fresh whole milk from local dairy farms",
        imageID: "milk001.jpg",
        itemPrice: 329,
        itemQuantity: 156,
        discountCode: "DAIRY15",
        isOnSale: true
    },
    {
        id: 6,
        name: "Sourdough Bread",
        description: "Artisan sourdough bread baked fresh daily",
        imageID: "bread001.jpg",
        itemPrice: 459,
        itemQuantity: 24,
        discountCode: null,
        isOnSale: false
    }
];


app.get('/items', (req, res) => {
    res.json(items);
});

app.get('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = items.find(item => item.id === itemId);

    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
    }

    res.json(item);
});


app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
});