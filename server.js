const mongoClient = require('mongodb').MongoClient;
const test = require('assert');
const express = require('express');
const connectUrl = 'mongodb+srv://user:6WhqrRdDwu5zKr9@cluster0-nkp2n.mongodb.net/test?retryWrites=true';
const databaseName = 'eco-nomy';
const app = express();

app.set('port',process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }


//******************** MOCK DATA*******************
const ingredients = [
    { id: 1,name: 'ingredient 1', cost: 3 },
    { id: 2,name: 'ingredient 2', cost: 0 },
    { id: 3,name: 'ingredient 3', cost: 7 },
    { id: 4,name: 'ingredient 4', cost: 1 }
  ]

const skills = [
    { id: 1,name: 'skill 1', multiplier: .2 },
    { id: 2,name: 'skill 2', multiplier: 1 },
    { id: 3,name: 'skill 3', multiplier: .8 }
]

var recipes = [
    {name: 'Test Recipe 1', skill: {Id: 1},ingredients: [{id: 1,baseAmount: 4}, {id: 2,baseAmount: 4}],cost:0},
    {name: 'Test Recipe 2', skill: {Id: 2},ingredients: [{id: 3,baseAmount: 4}, {id: 4,baseAmount: 4}],cost:0},
    {name: 'Test Recipe 3', skill: {Id: 3},ingredients: [{id: 3,baseAmount: 4}, {id: 6,baseAmount: 40}],cost:0}
]
//******************** MOCK DATA*******************

app.get('/api/ingredients',(req, res)=>{
    res.json(ingredients);
});

app.get('/api/recipes',(req, res)=>{
    res.json(recipes);
});

app.get('/api/skills',(req, res)=>{
    res.json(skills);
})
  
app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
    });

function SetupTestData(){
    
    mongoClient.connect(connectUrl,{useNewUrlParser: true},function(err,db){
        if(err) throw err;
        var dbo = db.db(databaseName);
        var ingredientsCollection = dbo.collection('ingredients');
        var recipesCollection = dbo.collection('recipes');
        ingredientsCollection.deleteMany({})
            .then(function(result){
                console.log('Cleared ' + result.deletedCount + ' objects from \'ingredients\' collection')
                test.strictEqual(result.result.n,result.deletedCount,"ingredients collection did not delete properly");
                
            })
            .catch(function(err){
                console.log(err);
            })
            
            recipesCollection.deleteMany({})
                .then(function(result){
                    console.log('Cleared ' + result.deletedCount + ' objects from the \'reipes\' collection');
                })
                .catch(function(err){
                    console.log(err);
                });
            
        ingredientsCollection.insertMany(ingredients)
            .then(function(result){
                test.equal(2,result.insertedCount);
                console.log('added ' + result.ops);
            })
            .catch(function(error){
                console.log(error);
            })

        recipesCollection.insertMany(recipes)
            .then(function(r){
                r.ops.forEach(function(s){
                    console.log(JSON.stringify(s));
                })
            })
            .catch(function(err){
                console.log(err);
            })

            db.close();
    });    
}