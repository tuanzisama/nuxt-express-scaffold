var express = require('express');
var router = express.Router();

const path = require('path');
const nowFilePath = path.resolve('./server/routes/nuxt.js')

router.get('/', async function (req, res) {
    res.send(`<center><h1>This page is from Express.</h1><h4>This file is located in ${nowFilePath}</h4><center>`)
});

module.exports = router;