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
    { name: 'ingredient 1', cost: 3 },
    { name: 'ingredient 2', cost: 0 },
    { name: 'ingredient 3', cost: 7 },
    { name: 'ingredient 4', cost: 1 }
  ]

var recipes = [
    {name: 'Test Recipe 1', skill: 'skill 1',ingredients: [{name: 'Ingredient 1',baseAmount: 4, name: 'Ingredient 2',baseAmount: 4}]},
    {name: 'Test Recipe 2', skill: 'skill 2',ingredients: [{name: 'Ingredient 3',baseAmount: 4, name: 'Ingredient 4',baseAmount: 4}]},
    {name: 'Test Recipe 3', skill: 'skill 3',ingredients: [{name: 'Ingredient 3',baseAmount: 4, name: 'Ingredient 6',baseAmount: 40}]}
]

const skills = [
    { name: 'skill 1', multiplier: .2 },
    { name: 'skill 2', multiplier: 1 },
    { name: 'skill 3', multiplier: .8 }
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