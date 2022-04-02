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

router.get("/:Post_Code",function(req,res){
    const { user } = req;
    const Post_Code = req.params.Post_Code;
    console.log(Post_Code);
    connection.query('SELECT * from post WHERE Post_Code=?',[Post_Code],function(err,result){
        if(result.length == 0){//추가
            return res.status(200).json({
                message:"게시글 없음",
            })
        }
        if(err){
            console.log(err);
            return res.status(403).json({
                message:"error",
            })
        }else{
                if(err){
                    console.log(err);
                    return res.status(403).json({
                        message:"server error",
                    })
                }

                if(result.length !=0){
                    console.log(result);
                    return res.status(200).json({
                        message:"Yes",
                        result,
                    })
                }
                else{
                    return res.status(403).json({
                        message:"없는 게시글 입니다",
                    })
                }
        }

    })
})

module.exports = router ;