const express = require('express');
const app = express();
const {findByUuid} = require('../db/index.js');
const port = process.env.PORT || 8080;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static('./public'));



app.get('/api/images', (req, res)=>{
    // console.log(req.params.id)
    findByUuid(parseInt(req.params.id) || 1005, (err, data)=>{
      if(err){ res.send(err); 
      } else {
          res.send(data);
      } 
    }) 
})


app.get('/api/images/:id', (req, res)=>{
  // console.log(req.params.id)
  findByUuid(parseInt(req.params.id) || 1005, (err, data)=>{
    if(err){ res.send(err); 
    } else {
        // console.log(data);
        res.send(data);
    } 
  }) 
})



app.get('/api/db', (req, res)=>{
  res.end('helloworld');
})

app.listen(port, ()=>{console.log('listening at port:',port)})