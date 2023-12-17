// Import
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config();

// Import file
const Connection = require('./configs/DBContext');
const { errorHandler } = require('./middleware/errorHandler');
const ProductRouter = require('./routes/product.route');

// Config app
const app = express();
const PORT = process.env.PORT || 3000;

// Config Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('common'));
app.use(cors());

// Connection MongoDB
Connection();

// Routes

app.use('/uploads', express.static('src/uploads'));

app.use('/api/v1/product', ProductRouter);

app.use('*', (req, res, next) => {
    const error = createError(404, 'API not found !!!');
    next(error);
});

app.use(errorHandler);

// App Start
app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
});
