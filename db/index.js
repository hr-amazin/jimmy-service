const mongoose = require('mongoose');
const mongopath = 'mongodb://heroku_fscfdghg:ifnsidoi8f7ai9qvadq1hie8j@ds261626.mlab.com:61626/heroku_fscfdghg' || 'mongodb://localhost/amazin';
mongoose.connect(mongopath, {useNewUrlParser: true});


const connect = mongoose.connection;
connect.on('error', console.error.bind(console, 'connection error:'));
connect.once('open', function() {
   //you can write mongo native syntax in here once connected.
    // console.log(connect, 'this is your connect')
   var imagesSchema = mongoose.Schema({
       _id: Number,
       name: String,
       images: String
   });
    
   var image = mongoose.model('images', imagesSchema);
   var sampleImages = [{_id: 1000, 
    name: 'Lenovo ThinkCentre M92p Business Desktop Computer - Intel Core i7 Up to 3.9GHz, 16GB RAM, 480GB SSD, Windows 10 Pro',
    images: ['https://s3.amazonaws.com/fec.amazin/1000_1.jpg', 'https://s3.amazonaws.com/fec.amazin/1000_2.jpg', 'https://s3.amazonaws.com/fec.amazin/1000_3.jpg', 'https://s3.amazonaws.com/fec.amazin/1000_4.jpg']
   },
   {_id: 1001, 
    name: 'CYBERPOWERPC Gamer Xtreme VR GXiVR8080A4 Gaming PC (Liquid Cooled Intel i7-9700K 3.6GHz, 16GB DDR4, NVIDIA GeForce RTX 2080 8GB, 240GB SSD, 1TB HDD, WiFi & Win 10 Home) Black',
    images: ['https://s3.amazonaws.com/fec.amazin/1001_1.jpg', 'https://s3.amazonaws.com/fec.amazin/1001_2.jpg', 'https://s3.amazonaws.com/fec.amazin/1001_3.jpg', 'https://s3.amazonaws.com/fec.amazin/1001_4.jpg']
   },
]
    image.collection.insertMany(sampleImages, (err,docs)=>{if (err) {console.log('docs not inserted')} else {console.log('docs inserted')}});
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

