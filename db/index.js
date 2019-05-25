const mongoose = require('mongoose');
const mongopath = 'mongodb://heroku_fscfdghg:ifnsidoi8f7ai9qvadq1hie8j@ds261626.mlab.com:61626/heroku_fscfdghg' || 'mongodb://localhost/amazin';
const imagearray = require('./images.js');
mongoose.connect(mongopath, {useNewUrlParser: true});



const connect = mongoose.connection;
connect.on('error', console.error.bind(console, 'connection error:'));
connect.once('open', function() {
   //you can write mongo native syntax in here once connected.
    // console.log(connect, 'this is your connect')
   connect.dropCollection("images", (err, result)=> {if (err){ console.log('error delete collection')
    } else {console.log('delete collection success');}});
   var imagesSchema = mongoose.Schema({
       _id: Number,
       name: String,
       images: String
   });
    
   var image = mongoose.model('images', imagesSchema);
   
    image.collection.insertMany(imagearray, (err,docs)=>{if (err) {console.log(err)} else {console.log('docs inserted')}});
});

const findByUuid = (uuid, callback)=>{
    
    connect.db.collection('images', (err, collection)=>{
        if (err) {callback(err,null)}
        collection.find({_id: uuid}).toArray(function(err, data){
            callback(err, data); // it will print your collection data
        })
    })
}


module.exports = {findByUuid}

