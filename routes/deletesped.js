const express = require('express');
const router = express.Router();
const soapRequest = require('easy-soap-request');

router.post('/api/deletesped', (req, res) => {
    // example data
    const url = 'https://labelservice.gls-italy.com/ilswebservice.asmx';
    const sampleHeaders = {
        'user-agent': 'sampleTest',
        'Content-Type': 'text/xml;charset=UTF-8',
        'soapAction': 'https://labelservice.gls-italy.com/DeleteSped',
    };

    const xml = '<?xml version="1.0" encoding="utf-8"?>' +
        '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">' +
        '<soap12:Body>' +
        '<DeleteSped  xmlns="https://labelservice.gls-italy.com/">' +
        '<SedeGls>al</SedeGls>' +
        '<CodiceClienteGls>659</CodiceClienteGls>' +
        '<PasswordClienteGls>glsale</PasswordClienteGls>' +
        `<NumSpedizione>${req.body.NumSpedizione}</NumSpedizione>` +
        '</DeleteSped>' +
        '</soap12:Body>' +
        '</soap12:Envelope>';

    // usage of module
    (async() => {
        const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 3000 }); // Optional timeout parameter(milliseconds)
        const { headers, body, statusCode } = response;
        // console.log(headers);
        // console.log(body);
        // console.log(statusCode);
        res.send(body);
    })();
})

module.exports = router;