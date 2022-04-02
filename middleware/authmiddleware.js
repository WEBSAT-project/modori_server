const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

const secretKey = 'SecRetKeyOfModoriPostId';
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'modori'
});

connection.connect();

module.exports = async(req,res,next)=>{
    const token = req.headers.token;
    console.log(token);
    if (!token){
        next();
    } else{
        const decoded =jwt.verify(token,secretKey);
        console.log(decoded);
    
        connection.query('Select * from member where nick_name=?',[decoded.nick],function(err,result){
            if(err) console.log(err);
            else {
                req.user = result;
            }
            next();
        })
    
    }
}
