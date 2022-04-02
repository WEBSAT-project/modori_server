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

router.get("/post/ranking",function(req,res){
    const { user } = req;

    connection.query('SELECT Post_Email,Post_nick_name,count(Post_Email) as cnt_Email from post GROUP BY Post_Email ORDER BY cnt_Email DESC',function(err,result){
        console.log(result);
        if(result.length == 0){//추가
            return res.status(200).json({
                message:"게시글이 없습니다", 
            })
        }

        if(err){
            console.log(err);
            return res.status(403).json({
                message:"server error",
            })
        }
        else{
            console.log("랭킹",result);
            return res.status(200).json({
                message:"랭킹 불러와짐",
                result,
            })
        }
    })
})

module.exports = router;