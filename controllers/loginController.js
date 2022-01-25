const usersDB = require('../models/users');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
    const {
        username,
        pw,
    } = req.body;
    const existsUser = await usersDB.findOne({
        where: {
            username: username,
        },
    });
    if(existsUser == undefined) {
        res.status(400).send('Wrong username');
    } else {
        if(!bcrypt.compareSync(pw, existsUser.password)) {
            res.status(400).send('Wrong password');
        } else {
            res.status(200).send({token : jwt.sign({uuid: existsUser.dataValues.uuid}, process.env.TOKEN_KEY_CONN), uid: jwt.sign({uid: existsUser.dataValues.uid}, process.env.TOKEN_KEY_USER)});
        }
    }
}