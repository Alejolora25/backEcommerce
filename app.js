const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const morgan = require('morgan');
const cors = require('cors');
const roleRouter = require('./routes/roleRoute');
const userRouter = require('./routes/userRoute');
const categoryRouter = require('./routes/categoryRoute');
const productRouter = require('./routes/productRoute');
const imageRouter = require('./routes/imageRoute')


const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 
}

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/roles', cors(corsOptions), roleRouter); // endpoint types
app.use('/api/users', cors(corsOptions), userRouter); // endpoint users
app.use('/api/categories', cors(corsOptions), categoryRouter); // endpoint categories
app.use('/api/products', cors(corsOptions), productRouter); // endpoint products
app.use('/api/images', cors(corsOptions), imageRouter); // endpoint products

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT} http://localhost:3000`);
});