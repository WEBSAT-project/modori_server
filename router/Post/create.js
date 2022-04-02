const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'modori'
});

connection.connect();

router.post("/create",function(req,res){
    const { body, user } = req;
    console.log(body);

    for (let i of user) {

        const title=body.title;
        const post_email=i.E_mail;
        const post_nick=i.nick_name;
        const post_text=body.post_text;
        const image_pass=body.image_pass;
        if (!user) {
            return res.status(401).json({
                message: "먼저 로그인을 해주세요",
            });
        }

        if(post_text=="" || title ==""){
            return res.status(403).json({
                message:"제목과 글을 입력해주세요",
            })  
        }
        connection.query('INSERT INTO post(Title,Post_Email,Post_Time,Post_Text,Post_nick_name,image_pass) VALUES(?,?,now(),?,?,?)',[title,post_email,post_text,post_nick,image_pass],function(err,result){
        
            if(err){//추가
                console.log(err);  
                return res.status(403).json({
                    messgae:"server error",
                })
            }
            else{
                console.log(result);
                return res.status(200).json({
                    message:"글 작성 완료",
                    result,
                })
            }   
        })
    }
})

module.exports=router;
