const usersDB = require('../models/users');
const jwt = require('jsonwebtoken');
const axios = require('axios');

exports.delegate = async (req, res, next) => {
    const {
        uid,
        files
    } = req.body;

    const user = await get_user(uid)

    if(!user.existsUser){
        res.status(400).send('user not found');
    } else { 
        const auth_server = process.env.AUTH_HOST + ":" + process.env.AUTH_PORT;
        
        const token = jwt.sign({uuid: user.uuid}, process.env.TOKEN_KEY_CONN);
        
        axios.post(`http://${auth_server}/delegate_files`,{token:token, files:files})
        .then(response => {
            res.status(200).end();
        })
        .catch(error => {
            console.log(error);
            res.status(400).end();
        });
    }
}

exports.getDelegated = async (req, res, next) => {
    const {
        uid
    } = req.body;

    const user = await get_user(uid)
    
    if(!user.existsUser){
        res.status(400).send('User not found');
    } else { 
        const auth_server = process.env.AUTH_HOST + ":" + process.env.AUTH_PORT;

        const token = jwt.sign({uuid: user.uuid}, process.env.TOKEN_KEY_CONN);
        
        axios.get(`http://${auth_server}/delegated_files`, { headers: { 'x-access-token':token }})
        .then(response => {
            res.status(200).send(response.data);
        })
        .catch(error => {
            console.log(error);
            res.status(400).end();
        });
    }
}

async function get_user(uid) {
    const existsUser = await usersDB.findOne({
        where: {
            uid: uid,
        },
    });
    return {existsUser:existsUser != undefined , uuid:existsUser.dataValues.uuid}
}