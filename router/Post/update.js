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

router.put('/update/:Post_Code',function(req,res){
    const { Post_Code } = req.params;
    const{body}=req;

    console.log(Post_Code);
    const title=body.title;
    const post_text=body.post_text;

    connection.query("UPDATE post SET Title=?,Update_Time= now(),Post_Text=? WHERE Post_Code=?",[title,post_text,Post_Code],function(err,result){
        console.log(title);
        console.log(post_text);
        if(err){
            console.log(err);
            return res.status(403).json({
                message:"업데이트에 실패하였습니다",
            })
        }
        else{
            console.log(result);
            return res.status(200).json({
                message:"업데이트가 완료되었습니다",
            })
        }
    })
})

module.exports = router;