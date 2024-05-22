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
const ratingRouter = require('./routes/ratingRoute')
const orderRouter = require('./routes/orderRoute');

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 
}

app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Ajusta el límite de tamaño según tus necesidades
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/roles', cors(corsOptions), roleRouter); // endpoint types
app.use('/api/users', cors(corsOptions), userRouter); // endpoint users
app.use('/api/categories', cors(corsOptions), categoryRouter); // endpoint categories
app.use('/api/products', cors(corsOptions), productRouter); // endpoint products
app.use('/api/images', cors(corsOptions), imageRouter); // endpoint products
app.use('/api/ratings', cors(corsOptions), ratingRouter); // endpoint ratings
app.use('/api/orders', cors(corsOptions), orderRouter); // endpoint orders

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT} http://localhost:3000`);
});