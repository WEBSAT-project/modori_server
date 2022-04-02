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

router.get('/getComments',function(req,res){
    //const Post_Code = req.params.Post_Code;
    connection.query('SELECT * from comment ORDER BY Comment_Code DESC',function(err,result){
        if(err){
            console.log(err)
                return res.status(403).json({
                    message:"server error",
                })
        }
        else{
            return res.status(200).json({
                message:"success getComments",
                result,
            })
        }
    })
})

module.exports = router;