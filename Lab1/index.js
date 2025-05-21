import express, { json } from 'express';
const app = express();
const port = 5000;

app.use(json());

let products = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Phone" }
];

app.get('/products', (req, res) => {
    res.json(products);
});

app.post('/products', (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.listen(port, () => {
    console.log(`SOA service running on http://localhost:${port}`);
});
