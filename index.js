const express = require('express');
const app = express()
const bodyParser =require('body-parser')
const mongoose = require('mongoose');
const { urlencoded } = require('body-parser');
const { request } = require('express');
const port = 3000
require('./item')
require('./postings')
app.use(bodyParser.json())
app.use(bodyParser.raw());

const Items = mongoose.model('items')
const Posts = mongoose.model('list')
const mongoUri = "mongodb+srv://Admin:ky1mA0hAT7ZtVrYh@cluster0.stszb.mongodb.net/<dbname>?retryWrites=true&w=majority"

mongoose.connect(mongoUri,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})

mongoose.connection.on("connected",() =>{
  console.log("succefulllly conected 3aaashh")
})

app.get('/', (req, res) => {
  
  Posts.find({}).then((listings)=> {
    res.json(listings);
  }).catch((error)=>{
    console.log(error);
  })
})

app.get('/listings',(req,res)=>{
  Items.find({}).then((listings)=> {
    res.send(listings);
  }).catch((error)=>{
    console.log(error);
  })
})



app.post('/listings',(req,res)=>{
  console.log(JSON.stringify(req.body._parts))
  let request = req.body._parts
  request.forEach( item=>{
    console.log ( item[0],' => ',item[1] )
  })
 console.log("posted")
 let urls =[]
 request.forEach(item=>{
   if (item[0] == "urls"){
     urls.push(item[1])
   }
 })
 const post = new Posts({
  title : "diaa",
  descreption: "desc",
  category : "cars",
  price : 500,
  images : urls,
  location : "doestn mater",
})
post.save()
.then(data=>{
  console.log(data)
  res.send("posted")

}).catch(error=>{
  console.log(error)
})
})

app.post('/item-data', (req,res) =>{
  const items = new Items({
    title:req.body.title,
    email:req.body.email,
    category:req.body.category,
    price:req.body.price
  })
  items.save()
  .then(data=>{
    console.log(data)
    res.send("posted")

  }).catch(error=>{
    console.log(error)
  })
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})