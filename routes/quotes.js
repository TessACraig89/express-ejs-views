//sets up express
const express = require('express');
//sets up router
const quoteRoutes = express.Router();
//require quotes from database
const quotesData = require('../db/quotes');

//when routed to home page render quotes-index.ejs passing in db quotes
quoteRoutes.get('/', function(req, res) {
  res.render('quotes/quotes-index', {
    documentTitle: 'Ada\'s Quotes!!',
    quotesData: quotesData,
  });
});

//when routes to quotes/id
// gets individual quotes by id
  //require id paramaters and stor in id variable
    //send response of db quotes id
quoteRoutes.get('/:id', function(req, res) {
  const id = req.params.id;
  res.render('quotes/quotes-single', {
    documentTitle: "Ada\'s Quotes!!",
    quoteClass: 'single-quote',
    quote: quotesData[id]
  });
});

//exports
module.exports = quoteRoutes;
