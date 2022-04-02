const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const secretKey = 'SecRetKeyOfModoriPostId'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'modori'
});

connection.connect();

router.post('/login', (req,res) => {
    const { body } = req;

    connection.query("select * from member where E_mail=? and password=? ",[body.email,body.pw],function(err,result){
        if(err){//추가
            console.log(err);
            return res.status(403).json({
                message:"server error",
            })
        }

        if(result.length != 0){
            for (let i of result) {
                console.log(i);
                const token =jwt.sign({
                    nick: i.nick_name,
                    name:i.name,
                },
                secretKey, {
                    expiresIn: '7d',
                });
                console.log(token);
                return res.status(200).json({
                    message: "로그인 성공",
                    token:{
                        token,
                    }
                    })
            }
            
        } else{
            return res.status(401).json({
                message: "로그인 실패",
            })
        }

    })
})

module.exports = router;