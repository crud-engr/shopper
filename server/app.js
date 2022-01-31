const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const productRoute = require('./routes/Product');
const cartRoute = require('./routes/Cart');
require('dotenv').config();

connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}`));
