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

router.delete("/delete/:Post_Code",function(req,res){
    const{body}=req;
    const { Post_Code } = req.params;
    console.log(Post_Code);

    connection.query("SELECT * from post WHERE Post_Code=?",[Post_Code],function(err,result){
        if(err){
            console.log(err);

            return res.status(403).json({ 
                message:"server error",
            })
        }
        if(result.length == 0){
            return res.status(403).json({
                message:"없는 글입니다",
                result,
            })
        }else{
            connection.query("DELETE from post WHERE Post_Code=?",[Post_Code],function(err,result){
                if(err) console.log(err);
                connection.query("DELETE from comment WHERE Post_Code=?",[Post_Code]);
                   return res.status(200).json({
                        message:"삭제 되었습니다",
                        result,
                    })
            })
        }
    })


})


module.exports = router;
// 없는 postcode 들어갔을때 오류 코드