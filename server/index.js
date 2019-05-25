const express = require('express');
const app = express();
const {findByUuid} = require('../db/index.js');
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(express.static('./public'))


app.get('/api/images', (req, res)=>{
    findByUuid(1001, (err, data)=>{
      if(err){ res.send('I AM AN ERROR'); 
      } else {
          res.send('I AM A DATA');
      } 
    }) 
})

app.get('/api/db', (req, res)=>{
  res.end('helloworld');
})

app.listen(port, ()=>{console.log('listening at port:',port)})