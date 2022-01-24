require('dotenv').config();
const jwt = require("jsonwebtoken");
const axios = require('axios');

exports.authentication = async (req, res, next) => {
    const {
        uuid,
        auth_code,
    } = req.body;

    const token = jwt.sign(
        { uuid: uuid },
        process.env.TOKEN_KEY,
    );

    const auth_server = process.env.AUTH_HOST + ":" + process.env.AUTH_PORT;

    axios.post(`http://${auth_server}/auth`, { token: token, auth_code:auth_code })
        .then(response => {
            res.status(200).end();
        })
        .catch(error => {
            res.status(400).send('Wrong');
        });
}