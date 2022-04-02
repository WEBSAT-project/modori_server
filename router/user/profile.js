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

router.get("/profile",function(req,res){
    const {body,user}=req;
    for (let i of user) {
    const email = body.E_mail;
    const post_nick = i.nick_name;

    connection.query("SELECT * from post WHERE Post_nick_name=? ORDER BY Post_Code DESC",[post_nick],function(err,result){
        if(err){
            console.log(err);
            return res.status(403).json({
                message:"server error",
            })
        }

        if(!result){//추가
            return res.status(200).json({
                message:"게시글이 없습니다",
                result,
                i,
            })
        }
        else{
            console.log(result);

            res.status(200).json({
                message:"myPostList",
                result,
                i,
            })
        }
    })
}
})


module.exports = router;

