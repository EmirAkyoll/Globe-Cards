const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const port = process.env.PORT || 5000;

//routes
const countryRoute = require('./routes/countries.js');

dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to mongoDB');
    } catch (error) {
        throw error
    }
};

// middlewares
app.use(express.json());
app.use(cors());

app.use('/api/countries', countryRoute);

app.get("/", (req, res) => {
    res.send('HELLO');
});

app.listen(port, () => {
    connect();
    console.log(`Api is listening on ${port}..`);
});