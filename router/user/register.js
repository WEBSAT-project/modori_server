const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'modori'
});

connection.connect();

router.post("/register",function(req,res){
    const { body } = req;
    console.log(body);

    var email = body.email;
    var name = body.name;
    var pw = body.pw;
    var nick = body.nick;

    connection.query(`INSERT INTO member(E_mail,password,name,nick_name) VALUES(?, ?, ?, ?)`, [email, pw, name, nick], function(err,result){
        
        let engNum =  /^[a-zA-Z0-9]*$/;
        let test = engNum.test(pw);
        
        if(!test){
            console.log("비밀번호 형식이 틀립니다.");
            return res.status(402).json({
                message:"비밀번호 형식이 틀립니다."
            })
        }
        console.log(test)
        
        
        if(pw=="" || name==""){추가
            console.log("공백 존재");
            return res.status(403).json({
                message:"공백이 있습니다",
            })
        }

        if(err) {
            console.log(err);
            res.status(403).json({
                message: "회원가입 실패",
            })
        }
        else{
            return res.status(200).json({
                message: "회원가입 성공",
            })
        }
        
    })
})

module.exports = router;