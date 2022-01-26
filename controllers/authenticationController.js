require('dotenv').config();
const axios = require('axios');
const usersDB = require('../models/users');
const jwt = require('jsonwebtoken');

exports.authentication = async (req, res, next) => {
    const {
        token,
        auth_code,
    } = req.body;

    const auth_server = process.env.AUTH_HOST + ":" + process.env.AUTH_PORT;

    axios.post(`https://${auth_server}/auth`, { auth_code:auth_code }, { headers: { 'x-access-token':token }})
        .then(response => {
            res.status(200).end();
        })
        .catch((err) => {
            if(err.response?.status === 400) {
                res.status(400).send('Wrong code');
            } else {
                res.status(401).end();
            }
        });
}

exports.fileAuthentication = async (req, res, next) => {
    const {
        auth_code,
        uid,
    } = req.body;

    const existsUser = await usersDB.findOne({
        where: {
            uid: uid,
        },
    });

    const auth_server = process.env.AUTH_HOST + ":" + process.env.AUTH_PORT;

    const token = jwt.sign({uuid: existsUser.dataValues.uuid}, process.env.TOKEN_KEY_CONN);

    axios.post(`https://${auth_server}/auth`, { auth_code:auth_code }, { headers: { 'x-access-token':token }})
    .then(response => {
        res.status(200).end();
    })
    .catch((err) => {
        if(err.response?.status === 400) {
            res.status(400).send('Wrong code');
        } else {
            res.status(401).end();
        }
    });
}