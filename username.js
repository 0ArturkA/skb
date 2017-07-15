var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

app.get('/summ', (req, res) => {
    let { some_l } = req.query;

    console.log(`New request - ${JSON.stringify(req.query)}`);

    // Validate
    if (!some_l) return res.status(500).send('Invalid some_l');

    // Check protocol
    if (some_l.indexOf('http://') > -1)
        some_l.replace('http://', '');
    else if (some_l.indexOf('https://') > -1)
        some_l.replace('http://', '');

    // Get url params
    some_l = some_l.split('/');

    console.log(`Parsed url: ${JSON.stringify(some_l)}`);
});

app.listen(80, () => console.log('CORS-enabled web server listening on port 80'));
