# 📦 SOA Lab 1: Simple Product Service with Node.js and Docker

## 🛠️ Project Setup

### Step 1: Initialize the Project

```bash
npm init -y
npm install express
```

### Step 2: Create `index.js`

```javascript
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
```

---

## 🐳 Docker Configuration

### Step 3: Create `Dockerfile`

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "index.js"]
```

---

## 🚀 Build and Run with Docker

```bash
docker build -t soa-service-node .
docker run -p 5000:5000 soa-service-node
```

---

## 📊 Test the API with Postman

### ➕ Add a Product

* Method: `POST`
* URL: `http://localhost:5000/products`
* Body (JSON):

```json
{
  "id": 3,
  "name": "Tablet"
}
```

---

## ✅ Output

The new product is added to the in-memory list and returned in the response.

---