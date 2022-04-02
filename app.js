var express = require("express");//node server 사용할때 epress필요
var app = express();
var mysql = require("mysql2");
const bodyParser = require('body-parser');
const cors = require('cors');

const login = require('./router/user/login');
const register = require('./router/user/register');
const email_check =require('./router/user/email_check');
const nickname_check = require('./router/user/nickname_check');
const profile = require('./router/user/profile');
const create = require('./router/Post/create');
const P_delete = require('./router/Post/P_delete');
const authmiddleware = require('./middleware/authmiddleware');
const image = require('./router/Post/image');
const getPost = require('./router/Post/getPost');
const update = require('./router/Post/update');
const getPosts = require('./router/Post/getPosts');
const create_comment = require('./router/comment/create_comment');
const delete_comment = require('./router/comment/delete_comment');
const getComment = require('./router/comment/getComment');
const getComments = require('./router/comment/getComments');
const ranking = require('./router/ranking');


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(authmiddleware);
app.use(login,register,email_check,nickname_check,profile,create,P_delete,image,update,getPost,getPosts,create_comment,delete_comment,getComment,getComments,ranking);
app.use('/static',express.static('public'));

app.listen(8080, () => {
    console.log("server start");
})

module.exports = app;