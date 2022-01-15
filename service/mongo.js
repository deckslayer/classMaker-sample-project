
const MongoClient = require('mongodb').MongoClient;
const urlMongo = "mongodb://localhost:27017/";

class Mongo{

    constructor(nameDB="mydb"){
        this.nameDB=nameDB;
    }

    connect(){  
        let nameDB=this.nameDB;
        let thisMongoObject=this;
        return new Promise( function(resolve, reject){
            MongoClient.connect(urlMongo, {useUnifiedTopology: true}, function(err, db) {
                if (err) throw err;
                var dbo = db.db(nameDB);
                thisMongoObject.db=db;
                thisMongoObject.dbo=dbo;
                resolve(dbo);
                })
           });
    }

    disconnect(){
        if (this.db){
            this.db.close();
            delete this.db;
            delete this.dbo;
        }
    }
}



let mongo=new Mongo();

module.exports=mongo;

//"C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe" avviare MongoDb
