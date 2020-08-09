var Scraper = require("image-scraper");
var express = require('express')
const cherio = require('cherio');
const request = require('request');
var router = express.Router();
var getImageUrls = require('get-image-urls');
var phantom = require('phantom');
const puppeteer = require('puppeteer');

// Firebase imports
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

// Firebase configs and imports end

var flag = 1;
var listImageUrls = [];
var websitesScrapedSoFar = 0;
var totalWebsitesToScrap = 0;
var tshirtsList = [];

var getWebsites = async(req, res, next, websitesListRef ) =>
{
    var websitesList = await websitesListRef.get();
        websitesList = websitesList.data();
        eCommerceWebsites = websitesList['eCommerce'];
    totalWebsitesToScrap = eCommerceWebsites.length;
    console.log(eCommerceWebsites);
    for( websiteUrlIndex in eCommerceWebsites){
        appendImagesToList(req, res, next, eCommerceWebsites[websiteUrlIndex]);
    }
};

var appendImagesToList = async(req, res, next, websiteUrlObj ) =>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log(totalWebsitesToScrap);

    await page.goto(websiteUrlObj['url']);
    const images = await page.evaluate(() => Array.from(document.images, e => 
        e.src
        ));
    var objListImageUrls = new Object();
    objListImageUrls['name'] = websiteUrlObj['name'];
    objListImageUrls['type'] = websiteUrlObj['type'];
    var objListImageUrlsImageList = [];

    for( var data in images ){
        objListImageUrlsImageList.push(images[data]);
    }
    objListImageUrls['imageList'] = objListImageUrlsImageList;
    listImageUrls.push(objListImageUrls);
    browser.close();
    websitesScrapedSoFar += 1;

    if( websitesScrapedSoFar == totalWebsitesToScrap ){
        for ( imageUrlIndex in listImageUrls ){
            var objSend = new Object();
            objSend['name'] = listImageUrls[imageUrlIndex]['name'];
            objSend['listWebsites'] = [];
            for( index in listImageUrls[imageUrlIndex]['imageList'] ){
                var imageUrl = listImageUrls[imageUrlIndex]['imageList'][index];
                await fetch('http://127.0.0.1:5000/?image_url=' + imageUrl)
                .then(res => res.text())
                .then( res=> {
                    if(res[0]=='{'){
                        var resObj = JSON.parse(res);
                        if(resObj['category']=='tshirt'){
                            objSend['listWebsites'].push(imageUrl);
                        }
                    }
                } );
                if( index == listImageUrls[imageUrlIndex]['imageList'].length - 1  ){
                    if(objSend['listWebsites'].length > 0 ){
                        objSend['type'] = listImageUrls[imageUrlIndex]['type'];
                        objSend['listWebsites'].push("https://www.mydesignation.com/wp-content/uploads/2019/12/Manushyan-tshirt-image-mydesignation-.jpg");
                        if( objSend['name'] == "pininterest.com" ){
                            objSend['listWebsites'].shift();
                        }
                        tshirtsList.push(objSend);
                    }
                }
                console.log(objSend);
            }
            if( imageUrlIndex == listImageUrls.length-1){
                if( flag== 1)
                {
                    res.send(tshirtsList);
                    flag=0;
                }
            }
        }
    }
    // flag=0;
};

var doit = (req, res, next) => {
    tshirtsList=[];
    listImageUrls=[];
    totalWebsitesToScrap = 0;
    websitesScrapedSoFar = 0;
    flag=1;

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    var db = firebase.firestore();
    const websitesListRef =  db.collection('websites').doc('test');
    getWebsites(req, res, next, websitesListRef);
    
    setTimeout(()=>{
            if( flag== 1)
            {
                // console.log(websitesScrapedSoFar);
                // console.log(totalWebsitesToScrap);
                // console.log(listImageUrls.length);
                res.send(tshirtsList);
                flag=0;
            }
        },120000
    );
}

// (async () => {
//         var websitesList = await websitesListRef.get();
//         websitesList = websitesList.data();
//         eCommerceWebsites = websitesList['eCommerce'];
//         console.log(eCommerceWebsites);
//     }
// )();
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto('https://www.amazon.in/s?k=tshirts&ref=nb_sb_noss_2');

//         const images = await page.evaluate(() => Array.from(document.images, e => 
//             e.src
//             ));
//             console.log(images);
//   browser.close();
//   flag=0;
//   res.send("23");
// })();
// request('https://www.vogue.co.uk/fashion/gallery/history-of-grunge-aesthetic-fashion?image=5f2bded1e86e508de4dbfd6f', (err, resp, html)=>{

//     if(!err && resp.statusCode == 200){
//         console.log("Request was success ");
        
//         // Define Cherio or $ Object 
//         const $ = cherio.load(html);

//         $("img").each((index, image)=>{

//             var img = $(image).attr('src');
//             // var baseUrl = 'https://www.vogue.co.uk';
//             var Links = img;
//             console.log(Links);
//         });

//     }else{
//         console.log("Request Failed ");
//     }

// });



    // listImages = [];
    // getImageUrls('https://www.myntra.com/tshirts/hrx-by-hrithik-roshan/hrx-by-hrithik-roshan-men-yellow-printed-round-neck-t-shirt/1700944/buy')
    // .then(function(images) {
    // console.log('Images found', images.length);
    // console.log(images);
    // res.send("123");
    // })
    // .catch(function(e) {
    // console.log('ERROR', e);
    // res.send("123456");
    // })

    // var scraper = new Scraper("https://www.myntra.com/men-tshirts/");
    // scraper.scrape( (image) => {
    //     listImages.push(image.address);
    // } );
    
router.get("/", doit);
module.exports = router;
