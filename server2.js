const express = require('express')
const cors = require('cors')
const { MongoClient } = require('mongodb')
const { response } = require('express')

const app = express()
app.use(cors())
app.use(express.json())
const uri = "mongodb+srv://bharadwaja2711:1717@cluster0.thxwy99.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri)
client.connect()
const db = client.db("s17")
const col = db.collection("c211")

app.get('/',(request,response) => {
  response.send('This is a Server Machine')
})

app.post('/insert', (request,response) => {
  col.insertOne(request.body)
  console.log(request.body)
  response.send(request.body)
})

app.get('/check',(req,res)=>{
  console.log(req.query)
  async function find(){
    try{
      const result=await col.findOne({un:req.query.un})
      console.log(result)
      if(result == null)
      {
        res.send("FAIL")
      }
      else{
        if(req.query.pw === result.pw)
        {
          res.send("PASS")
        }
        else
        {
          res.send("FAIL")
        }

      }
      
    }
    finally{}  
  }
  find().catch(console.dir)
})

app.listen(8081)
console.log("server started")