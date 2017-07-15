var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

app.get('/username', (req, res) => {
    let { username } = req.query;

    console.log(`New request - ${JSON.stringify(req.query)}`);

    // Simple Validate
    if (!username) return res.status(500).send('Invalid username');

    // Remove protocol
    if (username.indexOf('https://') > -1)
        username = username.replace('https://', '');
    else if (username.indexOf('http://') > -1)
        username = username.replace('http://', '');

    if (/^[/]{2}/.test(username))
        username = username.replace('//', '');

    // Get url params
    username = username.split('/');

    console.log(`Parsed url: ${JSON.stringify(username)}`);

    // Validate
    if (!username.length) return res.status(500).send('Invalid username');

    if (username.length == 1) {
        if (/^[@]{1}/.test(username[0]))
            return res.status(200).send(username[0]);

        return res.status(200).send(`@${username[0]}`);
    }

    if (username.length >= 2) {
        if (/^[@]{1}/.test(username[1]))
            return res.status(200).send(username[1]);

        return res.status(200).send(`@${username[1]}`);
    }

    console.log('Unknown error');

    res.status(500).send('Unknown error');
});

app.listen(80, () => console.log('CORS-enabled web server listening on port 80'));
