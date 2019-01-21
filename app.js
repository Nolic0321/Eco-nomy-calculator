var mongoClient = require('mongodb').MongoClient;
var test = require('assert');

function setup(connectionString,database){
    var ingredients = [
        {name: 'Test',cost: '100'},
        {name: 'Test1',cost: '10'}
    ];

    mongoClient.connect(connectionString,{useNewUrlParser: true},function(err,db){
        if(err) throw err;
        var dbo = db.db(database);
        var ingredientsCollection = dbo.collection('ingredients');
        ingredientsCollection.deleteMany({})
            .then(function(result){
                console.log('Cleared ' + result.deletedCount + ' objects from \'ingredients\' collection')
                test.strictEqual(result.result.n,result.deletedCount,"ingredients collection did not delete properly");
                
            })
            .catch(function(err){
                console.log(err);
            })
        ingredientsCollection.insertMany(ingredients)
            .then(function(result){
                test.equal(2,result.insertedCount);
                console.log('added ' + result);
            })
            .catch(function(error){
                console.log(error);
            })
            .finally(function(){
                console.log('done');
            })
    });
}


setup('mongodb+srv://user:6WhqrRdDwu5zKr9@cluster0-nkp2n.mongodb.net/test?retryWrites=true','eco-nomy');