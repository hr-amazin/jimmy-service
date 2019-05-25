const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/amazin', {useNewUrlParser: true});


const connect = mongoose.connection;
connect.on('error', console.error.bind(console, 'connection error:'));
connect.once('open', function() {
   //you can write mongo native syntax in here once connected.
    // console.log(connect, 'this is your connect')
    
});

const findByUuid = (uuid, callback)=>{
    callback('1','2');
    connect.db.collection('images', (err, collection)=>{
        if (err) {callback('eASOKSODKAOSKDO',null)}
        collection.find({_id: uuid}).toArray(function(err, data){
            callback('WE DID NOT FIND ANYTHING', data); // it will print your collection data
        })
    })
}


module.exports = {findByUuid}

