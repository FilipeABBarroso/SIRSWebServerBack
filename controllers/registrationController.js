const usersDB = require('../models/users');
const { v4 } = require('uuid');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registration = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const {
        username,
        pw,
    } = req.body;

    const existsUser = await usersDB.findOne({
        where: {
            username: username,
        },
    });

    if(existsUser == undefined){
        const user = await usersDB.create({
            uid: v4(),
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