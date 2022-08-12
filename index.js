const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

let app = express();
app.use(bodyParser.json());

const port = process.env.VCAP_APP_PORT || 5000;

app.get('/test', (req, res)=>{
    res.send("Test Successful.");
});

app.post('/wfpost', (req, res) => {
    console.log(req.body);
    const id = req.body.ID; //'d411bd9f-6134-456d-b312-c78b14ff0bfd'; 

    const option = {
        'method': 'PUT',
        'url': 'https://469b9a7atrial-dev-wfsostaging-srv.cfapps.us10.hana.ondemand.com/catalog/SalesOrders(' + id + ')',
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
            'ID': req.body.ID, //'d411bd9f-6134-456d-b312-c78b14ff0bfd',
            'customerID': req.body.customerID, //'C01', 
            'productID': req.body.productID, //'Laptop-09',
            'quantity': req.body.quantity,
            'unitPrice': req.body.unitPrice,
            'decisionStatus': req.body.decisionStatus,
            'decisionText': req.body.decisionText
        })
    };

    request(option, (error, response)=> {
        if(error) throw new Error(error);
        console.log(response.body);
        res.send("Sales order action captured.")
    });
});

app.listen(port, () => {
    console.log('Server started on port ' + port);
});