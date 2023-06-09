
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const fs=require("fs");
const mongoose = require("mongoose");
main().catch(err => console.log(err));
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
//console.log(_);
const app = express();
//var arr=[];
var para="";
var h="";
var t="";
var postReply={postHead:"",postText:""};
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/blog');
}
const blogSchema = new mongoose.Schema({
    title: String,
    content: String
});
const blog =  mongoose.model('blog', blogSchema);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


  
app.get('/',(req,res)=>{

    blog.find()
    .then(function(objs) {
      res.render('home',{homeStartingContent: homeStartingContent,Newpost: objs});
 //       console.log(objs);
    })
    .catch(function (err) {
        console.log("error");
    });
    
})
app.get('/about',(req,res)=>{
    res.render('about',{aboutContent: aboutContent});
})
app.get('/contact',(req,res)=>{
    res.render('contact',{contactContent: contactContent});
})
app.get('/compose',(req,res)=>{
    res.render('compose');
})
app.get('/post',(req,res)=>{
     res.render('post',{postHeader: h,postText: t});
})
app.get('/post/:blogId',(req,res)=>{
   para=req.params.blogId;
   console.log(para);
   blog.findById(para)
  .then(function(result) {
    h=result.title;
    t=result.content;
    res.redirect("/post");
  })
  .catch(function(err) {
    console.log(err);
  });
})
app.post('/compose',(req,res)=>{
    
    const newBlog= new blog({
        title: req.body.postTitle,
        content: req.body.post
    });
    newBlog.save()
    .then((docs)=>{
        console.log("added");
        res.redirect('/');
    })
    .catch((err)=>{
        console.log(err);
    });
    //arr.push(post);
    
})
app.listen(9000,()=>{
    console.log("server is running well");
})