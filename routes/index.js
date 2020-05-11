var express = require('express');
const fs = require('fs-extra');
const mkdirp = require('mkdirp');
const mv =require('mv')
const Blog = require('../model/blogs')

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});






router.post ('/newBlog',(req,res)=> {
  console.log('the req.files ',req.files)
  var imageFile = "";
  if(!req.files) {
    imageFile = ""
  }else {
    imageFile = req.files.photo.name
    var imageFil = req.files.photo
  }

  var title = req.body.title;
  var content = req.body.content;

  const blog = new Blog({
    title:title,
    content : content,
    photo: imageFile
  })  

  blog.save().then((blog)=> {
        if(blog) { 
          if(imageFile != "") {
            mkdirp('public/images/' + blog.id).then((made) =>{
              if(made) {
                var path = 'public/images/' + blog.id + '/' + imageFile
                const blogFile = req.files.photo;
                blogFile.mv(path,(err)=> {
                  if(err) {
                    console.log('error saving to public/images ',err)
                  }             
                })
              };
            }).catch((error)=> {
              throw error
            });
        }     
      res.redirect('back')          
      }
    }).catch((error)=> {
          throw error
  })  
});

//getting all the images and displaying them
router.get('/blogs',(req,res)=> {
  Blog.find((err,blog)=> {
    if(err) {
      throw err
    }else {
      res.render('blogs',{blog:blog})
    }
  })
})

//getting all the images and displaying them
router.get('/blogss',(req,res)=> {
  Blog.find((err,blog)=> {
    if(err) {
      throw err
    }else {
      res.status(200).json(blog)
    }
  })
})


module.exports = router;
