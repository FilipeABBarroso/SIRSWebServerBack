const usersDB = require('../models/users');
const filesDB = require('../models/files');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

exports.delegate = async (req, res, next) => {
    const {
        uid,
        fileHashes,
    } = req.body;

    let files = []
    fileHashes.map(async (hash) => {
        const file = await filesDB.findOne({
            where: {
                fileHash: hash,
            },
        });
        if(file){
            files.push({"file_hash": hash, "file_name": file.dataValues.title});
        }
    });

    const user = await get_user(uid)

    console.log(files);

    if(!user.existsUser){
        res.status(400).send('user not found');
    } else { 
        const auth_server = process.env.AUTH_HOST + ":" + process.env.AUTH_PORT;
        
        const token = jwt.sign({uuid: user.uuid}, process.env.TOKEN_KEY_CONN);
        
        axios.post(`https://${auth_server}/delegate_files`,{files:files}, { headers: { 'x-access-token':token }})
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
        
        axios.get(`https://${auth_server}/delegated_files`, { headers: { 'x-access-token':token }})
        .then(response => {
            res.status(200).send(response.data);
        })
        .catch(error => {
            console.log(error);
            res.status(400).end();
        });
    }
}

exports.createFile = async (req, res, next) => {
    const {
        title,
        content,
        isBlocked,
        uid,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const id = uuidv4()

    try {
        await filesDB.create({
            id: id,
            fileHash: await bcrypt.hash(id, salt),
            title: title,
            content: content,
            isBlocked: isBlocked,
            uid: uid,
        });
        
        res.status(200).end();
    } catch (err){
        res.status(400).end();
    }

}

exports.getFiles = async (req, res, next) => {
    const {
        uid
    } = req.body;

    const files = await filesDB.findAll({
        where: {
            uid: uid,
        }
    })
    .then((files) => {
        res.status(200).send(files);
    })
    .catch((err) =>{
        res.status(400).end()
    });
}

async function get_user(uid) {
    const existsUser = await usersDB.findOne({
        where: {
            uid: uid,
        },
    });
    return {existsUser:existsUser != undefined , uuid:existsUser.dataValues.uuid}
}