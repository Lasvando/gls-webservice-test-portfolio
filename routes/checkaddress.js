const express = require('express');
const router = express.Router();
const request = require('request');

router.post('/api/checkaddress', (req, res) => {

    const url = `https://weblabeling.gls-italy.com/utility/wsCheckAddress.asmx/CheckAddress?` +
        `SedeGls=al&` +
        `CodiceClienteGls=659&` +
        `PasswordClienteGls=glsale&` +
        `SiglaProvincia=${req.body.Provincia}&` +
        `Cap=${req.body.CAP}&` +
        `Localita=${req.body.Localita}&` +
        `Indirizzo=${req.body.Indirizzo}`;

    request(url, function(error, response, body) {
        console.log('error:', error); // Print the error if one occurred and handle it
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        res.send(body);
    });
})

module.exports = router;