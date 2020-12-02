const express = require('express');
const router = express.Router();
const fs = require('fs');
const neatCsv = require('neat-csv');

router.get('/', (req, res) => {
    fs.readFile('file/province.csv', async(err, data) => {
        if (err) {
            console.error(err)
            return
        }
        res.render('index', { provincia: await neatCsv(data) });
    })

})


module.exports = router;