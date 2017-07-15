var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

app.get('/fio', (req, res) => {
    let { fullname } = req.query;

    console.log(`New request - ${JSON.stringify(req.query)}`);

    if (!fullname) return res.send('Invalid fullname');

    // Removes all spaces at the beginning of the line
    fullname = fullname.replace(/^\s+/g, '');

    // Replace several consecutive spaces with one space
    fullname = fullname.replace(/\s\s+/g, ' ');

    console.log(fullname);

    // Parse fullname
    fullname = fullname.split(' ');

    console.log(fullname);

    // Validate fullname
    if (/[0-9]|[!@#$%^&*()/|_\-+]/.test(fullname)) return res.send('Invalid fullname');

    if (!/[A-Z][a-z]|[А-Я][а-я]/.test(fullname)) return res.send('Invalid fullname');

    if (!fullname.length) return res.send('Invalid fullname');

    if (fullname.length > 3) return res.send('Invalid fullname');

    // Check fullname lenght values
    if (fullname.length == 1) {
        // Fix register
        fullname = fixRegister(fullname);

        return res.send(fullname[0]);
    }

    if (fullname.length == 2) {
        // Fix register
        fullname = fixRegister(fullname);

        // Cut string to first latter
        let surname = fullname[0].slice(0, 1);

        return res.send(`${fullname[1]} ${surname}.`);
    }

    if (fullname.length == 3) {
        // Fix register
        fullname = fixRegister(fullname);

        // Cut string to first latter
        let surname = fullname[0].slice(0, 1);
        let patronymic = fullname[1].slice(0, 1);

        return res.send(`${fullname[2]} ${surname}. ${patronymic}.`);
    }

    res.send('Unknown error');
});

function fixRegister(fullname) {
    if (fullname[0]) {
        fullname[0] = fullname[0].toLowerCase();
        fullname[0] = fullname[0][0].toUpperCase() + fullname[0].slice(1);
    }

    if (fullname[1]) {
        fullname[1] = fullname[1].toLowerCase();
        fullname[1] = fullname[1][0].toUpperCase() + fullname[1].slice(1)
    }

    if (fullname[2]) {
        fullname[2] = fullname[2].toLowerCase();
        fullname[2] = fullname[2][0].toUpperCase() + fullname[2].slice(1)
    }

    return fullname;
};

app.listen(80, () => console.log('CORS-enabled web server listening on port 80'));
