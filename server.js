//Imported modules.
var express = require('express');
var pouchDB = require('pouchdb');
var bodyParser = require('body-parser');

var app = express();

//Global variables.
var dbName = "testdb";
var database = new pouchDB("http://127.0.0.1:5984/" + dbName);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


//GET-method: Get items from my database.
app.get("/" + dbName, function (req, res) {
    database.allDocs({
        include_docs: true
    }).then(function (result) {
        res.send(result.rows.map(function (item) {
            return item.doc;
        }));
    }, function (error) {
        res.status(400).send(error);
    });
});


//POST-method: Post an item to my database.
app.post("/" + dbName, function (req, res) {
    database.post(req.body).then(function (result) {
        res.send(result);
        //res.redirect("back"); // Redirects user to the previous page.
    }, function (error) {
        res.status(400).send(error);
    });
});


// DELETE specific ID from database.
app.delete("/" + dbName + "/:id", function (req, res) {
    database.get(req.params.id).then(function (result) {
        return database.remove(result);
    }).then(function (result) {
        res.send(result);
    });

});

/*
app.put("/" + dbName + "/:id", function (req, res){
   database.get(req.params.id).then(function (result){
      result.name = req.body.name;
       database.put(result);
       res.send(result);
   }) 
});
*/
app.listen(3000, function (error) {
    if (!error) {
        console.log("Server is running on port 3000.");
    } else {
        console.log("Error. Something went wrong.")
    }
});
