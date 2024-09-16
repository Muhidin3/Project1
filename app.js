const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://muhidinshemsu3:hpInIu1U0hHJPuAS@cluster0.cd40j.mongodb.net/blogDB")

// mongoose.connect('mongodb://localhost:27017/blogDB')



const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
app.listen(process.env.PORT || 3000)


const blogSchema = new mongoose.Schema({
    title:String,
    content:String
})

const blog = mongoose.model('blogs',blogSchema)

app.get('/',(req,res)=>{
    async function blogsee() {
        let blogs = await blog.find()
        
        res.render('index',{a:blogs})
    }
    blogsee()
})

app.get('/compose',(req,res)=>{
    res.render('compose')
})
app.post('/compose',(req,res)=>{
    const blog1 = new blog({
        title: req.body.title,
        content:req.body.content,
    })
    blog.insertMany([blog1])
    
    
    
    res.redirect('/')
    
})
app.get('/contact',(req,res)=>{
    res.send('cnjdskns')
})

app.get('/:l',async (req,res)=>{

    let link = req.params.l
    const eblog = await blog.find({title: link.replace(/_/g,' ')})
    try {
        res.render('eachblog',{atitle:eblog[0].title,acontent:eblog[0].content}) 
        
    } catch (error) {
        // console.error('that error')
    }
    

    // console.log(eblog[0].title);
    
})

//mongodb atlas user name muhidinshemsu3
// password hpInIu1U0hHJPuAS


//mongodb+srv://muhidinshemsu3:hpInIu1U0hHJPuAS@cluster0.cd40j.mongodb.net/