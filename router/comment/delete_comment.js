const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const { route } = require('./create_comment');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'modori'
});

connection.connect();

router.delete('/C_delete/:Comment_Code',function(req,res){
    const {body}=req;
    const{Comment_Code}=req.params;

    connection.query('DELETE FROM comment WHERE Comment_Code =?',[Comment_Code],function(err,result){
        console.log(result);

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
        }
        else{
            return res.status(200).json({
                message:"comment delete",
            })
        }

    })


})

module.exports = router;