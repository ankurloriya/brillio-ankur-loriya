const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 8080;

const corsOptions = {
    origin: '*'
};

app.use(cors(corsOptions));


app.use(bodyParser.json({
    "json": {
        "limit": "250mb"
    },
    "urlencoded": {
        "extended": false
    }
}));


const generateRandomString = function (len, stringSet) {
    const text = [];
    const possible = stringSet || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < len; i++) {
        text.push(possible.charAt(Math.floor(Math.random() * possible.length)));
    }

    return text.join("");
};

app.use("/public", express.static('public'));

app.post('/generate-password', (req, res) => {
    if ((req.body.char == undefined || req.body.char.trim() === "") || (req.body.num == undefined || req.body.num.trim() === "") || (req.body.spl == undefined || req.body.spl.trim() === "")) {
        res.json({
            error: true,
            message: "Missing data."
        });
        res.end();
        return;
    }

    res.json({
        error: false,
        data: generateRandomString(8, req.body.char + req.body.num + req.body.spl)
    });
    res.end();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
