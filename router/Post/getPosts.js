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


router.get('/',function(req,res) {
    keyword = req.query.keyword

    if(keyword){
        connection.query('SELECT * from post WHERE Title LIKE "%' + keyword + '%" ORDER BY Post_Code DESC LIMIT 4', function(err,result){
            if(result.length == 0){//추가
                return res.status(200).json({
                    message:"검색된 글 없음",
                })
            }
            if(err){
                console.log(err);

                return res.status(403).json({
                    message:"search error",
                })
            }
            else{
                
                console.log(keyword);

                return res.status(200).json({
                    message:"search success",
                    result,
                })
            }
        })
    }
    else{

        connection.query("SELECT * from post ORDER BY Post_Code DESC limit 0,5",function(err,result){

            if(result.length == 0){//추가
                return res.status(200).json({
                    message:"글 없음",
                    result,
                })
            }

            if(err){
                console.log(err);
    
                return res.status(403).json({
                    message:"error",
                })
            }
            else{
                console.log(result);
                return res.status(200).json({
                    message:"Success",
                    result,
                })
            }
        })
    }
})

module.exports = router;