var firebase = require("firebase");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
require("firebase/database");
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');

var firebaseConfig = {
    apiKey: "AIzaSyC-vQivOO7ZFJ6aAIhSSPGf4DBADF_-5qQ",
    authDomain: "flipkartgridchallenge.firebaseapp.com",
    databaseURL: "https://flipkartgridchallenge.firebaseio.com",
    projectId: "flipkartgridchallenge",
    storageBucket: "flipkartgridchallenge.appspot.com",
    messagingSenderId: "749649847875",
    appId: "1:749649847875:web:a36fb250e8a7f851f956f6",
    measurementId: "G-4M995FXDV2"
  };
  
 

// Atomically remove a region from the "regions" array field.
// const removeRes = await washingtonRef.update({
//   regions: admin.firestore.FieldValue.arrayRemove('east_coast')
// });

var express = require('express')
var router = express.Router();

var doit = async(req, res, next) => {
  let type = req.query.type;
  let value = req.query.value;

 // Initialize Firebase
 if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }
 var db = firebase.firestore();
 
 const washingtonRef =  db.collection('websites').doc('FvCMOoyXc2wNz6WYBojs');

 if ( type == "eCommerce" ){
    await washingtonRef.update({
    eCommerce: firebase.firestore.FieldValue.arrayUnion(value)
 });
}

 if ( type == "fashionMagazines" ){
    await washingtonRef.update({
        fashionMagazines: firebase.firestore.FieldValue.arrayUnion(value)
    });
}
 
res.send("Website Added Successfully..!!");
 
};

router.get("/", doit);

module.exports = router;
