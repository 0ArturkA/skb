var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

app.get('/summ', (req, res) => {
    let { a, b } = req.query;

    console.log(`New request - ${JSON.stringify(req.query)}`);

    if (!a && !b) {
        if (req.query.some)
            return res.send(req.query.some);

        return res.send('0');
    }

    if (!a) return res.send(b);

    if (!b) return res.send(a);

    let summ = ((+a) + (+b)).toString();

    res.send(summ);
});

app.listen(80, () => console.log('CORS-enabled web server listening on port 80'));
