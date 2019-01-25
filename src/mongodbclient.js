const mongDB = require('mongodb')
const mongoClient = mongDB.MongoClient;
const test = require('assert');
const express = require('express');
const connectUrl = 'mongodb+srv://user:6WhqrRdDwu5zKr9@cluster0-nkp2n.mongodb.net/test?retryWrites=true';
const databaseName = 'eco-nomy';
const app = express();



    constructor() {
        var ingredients = [
            { name: 'Test', cost: '100' },
            { name: 'Test1', cost: '10' }
        ];

        var recipes = [
            { name: 'Test Recipe 1', ingredients: [{ name: 'Ingredient 1', count: 4, name: 'Ingredient 2', count: 4 }] },
            { name: 'Test Recipe 2', ingredients: [{ name: 'Ingredient 3', count: 4, name: 'Ingredient 4', count: 4 }] },
            { name: 'Test Recipe 3', ingredients: [{ name: 'Ingredient 3', count: 4, name: 'Ingredient 6', count: 40 }] }
        ]

        mongoClient.connect(connectUrl, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db(databaseName);
            var ingredientsCollection = dbo.collection('ingredients');
            var recipesCollection = dbo.collection('recipes');
            ingredientsCollection.deleteMany({})
                .then(function (result) {
                    console.log('Cleared ' + result.deletedCount + ' objects from \'ingredients\' collection')
                    test.strictEqual(result.result.n, result.deletedCount, "ingredients collection did not delete properly");

                })
                .catch(function (err) {
                    console.log(err);
                })

            recipesCollection.deleteMany({})
                .then(function (result) {
                    console.log('Cleared ' + result.deletedCount + ' objects from the \'reipes\' collection');
                })
                .catch(function (err) {
                    console.log(err);
                });

            ingredientsCollection.insertMany(ingredients)
                .then(function (result) {
                    test.equal(2, result.insertedCount);
                    console.log('added ' + result.ops);
                })
                .catch(function (error) {
                    console.log(error);
                })

            recipesCollection.insertMany(recipes)
                .then(function (r) {
                    r.ops.forEach(function (s) {
                        console.log(JSON.stringify(s));
                    })
                })
                .catch(function (err) {
                    console.log(err);
                })

            db.close();
        });
    }

    GetIngredients() {
        mongoClient.connect(connectUrl, function (err, db) {
            var dbo = db.db(databaseName);

            return dbo.collection('ingredients').find({});
        })
    }

}

