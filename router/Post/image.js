const multer = require('multer')
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const path = require('path');
const { v4:uuidv4 } = require('uuid')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public'));
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4()+'.png')
    }
  })

let upload = multer({storage: storage});


router.post('/upload',upload.single('file'),(req,res)=>{

    console.log(req.file)
    return res.status(200).json({
        message:"실행됨",
        filename: req.file.filename
    })
})

module.exports = router;