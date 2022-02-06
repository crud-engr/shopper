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

app.all('*', (req, res) => {
    return res.status(404).json({
        status: 'fail',
        message: `resource not found on the server!`,
        code: 404,
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}`));
