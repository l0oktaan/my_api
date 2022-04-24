const express = require('express');
const _ = require('lodash');
const path = require('path');
const cors = require('cors')
const app = express()
const fs = require('fs');
const nc = JSON.parse(fs.readFileSync('./nc.json', 'utf8'));
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Content-Type", "application/json"); 
    next();
  });
app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, '/index.html'))
  });
app.get('/api/non_conformances', (req, res)=> {
    res.end(JSON.stringify(nc));
});
app.get('/api/non_conformances/:uid', (req, res)=> {
    let index = _.findIndex(nc, {id: req.params.uid});//nc.filters(x=>x.id == req.params.uid)
    // res.end(JSON.stringify(index));
    res.end(JSON.stringify(nc[index]));
});
  
app.get('/about',(req,res)=>{
    res.status(200).send('About PPage')
})

app.all('*',(req,res)=>{
    res.status(404).send('<h1>  Resource not found</h1>')
})
app.listen(5000,()=>{
    console.log('Server is listening on port 5000...')
})

