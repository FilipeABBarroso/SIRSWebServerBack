const usersDB = require('../models/users');
const bcrypt = require("bcrypt");

exports.login = async (req, res, next) => {
    const {
        username,
        pw,
    } = req.body;
    console.log(username + pw);
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
            res.status(200).end();
        }
    }

}