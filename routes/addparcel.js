const express = require('express');
const router = express.Router();
const soapRequest = require('easy-soap-request');
const request = require('request');

router.post('/api/addparcel', (req, res) => {

    let url = 'https://labelservice.gls-italy.com/ilswebservice.asmx';

    const xmlParcel = req.body.xmlParcel;
    const xmlInfo =
        '<Info>' +
        '<SedeGls>al</SedeGls>' +
        '<CodiceClienteGls>659</CodiceClienteGls>' +
        '<PasswordClienteGls>glsale</PasswordClienteGls>' +
        xmlParcel +
        '</Info>';

    url += `/AddParcel?XMLInfoParcel=${xmlInfo}`
    request(url, function(error, response, body) {
        console.log('error:', error); // Print the error if one occurred and handle it
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        res.send(body);
    });
})

module.exports = router;