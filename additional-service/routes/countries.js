const Country = require('../models/Country.js');
const express = require('express');
const router = express.Router();

router.get('/get-all', async (req, res) => {
    try {
        const countries = await Country.find();
        console.log("countries: ", countries);
        res.status(200).send(countries)
    } catch (error) {
        res.status(400).json(error);
    }
})

module.exports = router;