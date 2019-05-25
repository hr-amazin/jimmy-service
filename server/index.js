const express = require('express');
const app = express();
const {findByUuid} = require('../db/index.js');
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(express.static('./public'))


app.get('/api/images/:id', (req, res)=>{
    // console.log(req.params.id)
    findByUuid(parseInt(req.params.id), (err, data)=>{
      if(err){ res.send(err); 
      } else {
          res.send(data);
      } 
    }) 
})

app.get('/api/db', (req, res)=>{
  res.end('helloworld');
})

app.listen(port, ()=>{console.log('listening at port:',port)})