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

router.post("/create_comment/:Post_Code",function(req,res){
    const { body, user } = req;
    const Post_Code = req.params.Post_Code;

    for (let i of user) {
    const Comment_Text=body.Comment_Text;
    const nick_name=i.nick_name;

    connection.query("INSERT INTO comment(Comment_Text,nick_name,Comment_Time,Post_Code) VALUES(?,?,now(),?)",[Comment_Text,nick_name,Post_Code],function(err,result){
        if(err){
            console.log(err);

            return res.status(403).json({
                message:"server err",
            })
        }
        else{
            return res.status(200).json({
                message:"댓글 작성 완료",
                result,
            })
        }
    })
    }
})

module.exports = router;