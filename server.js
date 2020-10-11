const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const _ = require("lodash");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.get("/index.html", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.get("/login.html", function(req, res) {
  res.sendFile(__dirname + "/login.html");
});
app.get("/aboutus.html", function(req, res) {
  res.sendFile(__dirname + "/aboutus.html");
});
app.get("/contactus.html", function(req, res) {
  res.sendFile(__dirname + "/contactus.html");
});
app.get("/internships.html", function(req, res) {
  res.sendFile(__dirname + "/internships.html");
});
app.get("/notes.html", function(req, res) {
  res.sendFile(__dirname + "/notes.html");
});
app.get("/questionpapers.html", function(req, res) {
  res.sendFile(__dirname + "/questionpapers.html");
});
app.get("/team.html", function(req, res) {
  res.sendFile(__dirname + "/team.html");
});
app.get("/notices.html", function(req, res) {
  res.sendFile(__dirname + "/notices.html");
});
app.get("/timetable.html", function(req, res) {
  res.sendFile(__dirname + "/timetable.html");
});
app.get("/compose", function(req, res) {
  res.render("compose");
});

var posts = [];
var answers = [];
//render .html file
app.engine('.html', require('ejs').renderFile);
app.get("/codingdoubts.html", function(req, res) {
  res.render("doubts", {posts: posts});
});

//routing parameters
app.get("/codingdoubts.html/:queryPost",function(req, res){
  const reqPage = _.lowerCase(req.params.queryPost);
  posts.forEach(function(post){
    const serverPage = _.lowerCase(post.title);
    if(serverPage === reqPage){
      res.render("post",{
        title: post.title,
        content: post.content
      });
    }
  });
});

app.post("/codingdoubts.html/:queryPost",function(req, res){

    res.redirect('back');
});

app.post("/", function(req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    'members': [
      {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
        }
      }
    ],
  }

  var jsonData = JSON.stringify(data)

  console.log(firstName, lastName, email);

  var options = {
    url: 'https://us2.api.mailchimp.com/3.0/lists/5b73e09283',
    method: 'POST',
    headers: {
      'Authorization': "ayush b4482ebf4df9c35d43d29bddd782e19d-us2"
    },
    body: jsonData
  }

  request(options, function(error, response, body) {
    if (error) {
      console.log(error);
      res.sendFile(__dirname + "/fail.html");
    } else {
      if(response.statusCode == 200){
        res.sendFile(__dirname + "/success.html");
      }else{
        res.sendFile(__dirname + "/fail.html");
      }
    }
  });
});

app.post("/fail.html", function(req, res){
  res.redirect("/");
});

app.post("/compose", function(req, res){
  const content = {
    title: req.body.title,
    content: req.body.content
  };
  posts.push(content);
  for(var i = 0; i < posts.length; i++){
    console.log(posts[i]);
  }
  res.redirect("/codingdoubts.html");
});

app.listen(PORT, function() {
  console.log("Server is running at port " + PORT);
});

//b4482ebf4df9c35d43d29bddd782e19d-us2

//5b73e09283
