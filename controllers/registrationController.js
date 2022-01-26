const usersDB = require('../models/users');
const bcrypt = require("bcrypt");
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

exports.registration = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const {
        uid,
        username,
        pw, 
    } = req.body;
    try {
        await usersDB.create({
            uid: uuidv4(),
            uuid: jwt.verify(uid, process.env.TOKEN_KEY_CONN).uuid,
            username: username,
            password: await bcrypt.hash(pw, salt),
        });
        
        res.status(200).end();
    } catch (err){
        console.log(err);
        res.status(400).end();
    }

}

exports.isRegistered = async (req, res, next) => {
    const {
        username,
    } = req.body;

    const existsUser = await usersDB.findOne({
        where: {
            username: username,
        },
    });

    if(existsUser != undefined){
        res.status(400).send('existing user');
    } else { 
        const auth_server = process.env.AUTH_HOST + ":" + process.env.AUTH_PORT;
        
        axios.get(`https://${auth_server}/register_auth`)
        .then(response => {
            res.status(200).send(response.data);
        })
        .catch(error => {
            console.log(error);
            res.status(400).end();
        });
    }
}