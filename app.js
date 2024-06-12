const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const morgan = require('morgan');
const cors = require('cors');
const indexRoutes = require('./routes/index');


const corsOptions = {
    origin: 'https://front-ecommerce-navy.vercel.app/',
    optionsSuccessStatus: 200 
}


app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api', cors(corsOptions), indexRoutes); // endpoint types

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});