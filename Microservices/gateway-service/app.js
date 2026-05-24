const express = require('express');
const axios = require('axios');

const app = express();   // ✅ IMPORTANT LINE
app.use(express.json());

const port = 3003;

app.get('/health', (req, res) => {
  res.json({ status: 'Gateway Service is healthy' });
});

app.get('/api/users', async (req, res) => {
  try {
    const response = await axios.get('http://user-service/users');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get('http://product-service/products');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const response = await axios.get('http://order-service/orders');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

app.listen(port, () => {
  console.log(`Gateway service running on port ${port}`);
});
