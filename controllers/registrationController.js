const usersDB = require('../models/users');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registration = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const {
        uuid,
        username,
        pw, 
    } = req.body;

    if(existsUser == undefined){
        const user = await usersDB.create({
            uid: uuid,
            username: username,
            password: await bcrypt.hash(pw, salt),
        });

        const token = jwt.sign(
            { user_id: user._id },
            process.env.TOKEN_KEY,
        );

        user.token= token;

        res.status(200).send(user);
    } else {
        res.status(400).send('existing user');
    }

}

exports.isRegistered = async (req, res, next) => {
    console.log('is registered');
    const {
        username,
        pw, 
    } = req.body;

    const existsUser = await usersDB.findOne({
        where: {
            username: username,
        },
    });

    if(existsUser != undefined){
        res.status(400).send('existing user');
    } else { 
        res.status(200).send(req.body);
    }
}