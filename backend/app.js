const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const productRoutes = require('./route/product');
const authRoutes = require('./route/authentication');
const cartRoutes = require('./route/cart');
const favouriteProductsRoutes = require('./route/favouriteProducts');
const productCategoryRoutes = require('./route/productCategory');


// cors
app.use(cors({
   origin: 'http://localhost:4200'
}));

// env config
require('dotenv').config();

// json config
app.use(express.json({ limit: '50mb' }));

// cookies config
// app.use(cookieParser());

// mongodb config
mongoose.connect(process.env.MONGO_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

// mongodb connection
const db = mongoose.connection;
db.on('error', console.error.bind(console.error, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

// routes
app.use('/api/v1', productRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', cartRoutes);
app.use('/api/v1', favouriteProductsRoutes);
app.use('/api/v1', productCategoryRoutes);

app.listen(PORT, () => {
   console.log(`SERVER LISTENING ON PORT ${PORT}`);
});
