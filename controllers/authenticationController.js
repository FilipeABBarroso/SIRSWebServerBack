require('dotenv').config();
const axios = require('axios');

exports.authentication = async (req, res, next) => {
    const {
        token,
        auth_code,
    } = req.body;

    const auth_server = process.env.AUTH_HOST + ":" + process.env.AUTH_PORT;

    axios.post(`http://${auth_server}/auth`, { token: token, auth_code:auth_code })
        .then(response => {
            res.status(200).end();
        })
        .catch(error => {
            res.status(400).send('Wrong code');
        });
}