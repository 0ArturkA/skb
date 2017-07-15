var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

app.get('/summ', (req, res) => {
    let { a, b } = req.query;

    console.log(`New request - ${JSON.stringify(req.query)}`);

    if (!a && !b) {
        if (req.query.some)
            return res.status(500).send(req.query.some);

        return res.status(500).end('0');
    }

    if (!a) return res.status(200).send(b);

    if (!b) return res.status(200).send(a);

    let summ = ((+a) + (+b)).toString();

    res.status(200).send(summ);
});

app.listen(80, () => console.log('CORS-enabled web server listening on port 80'));
