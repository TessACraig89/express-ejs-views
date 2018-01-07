// set up express
const express = require('express');

// set up router
const quoteRoutes = express.Router();

// quotes from data base
const quotesData = require('../db/quotes');

//gets quotes through router, renders quotes from data base, sets class to my quote and document title
quoteRoutes.get('/', function(req, res) {
  res.render('quotes/quotes-index', {
    quotes: quotesData,
    quoteClass: 'my-quote',
    documentTitle: 'Ada quotes!!'
  });
});

//posts quotes through router
    //push quote, author, and genre to quotes data
  //redirect
quoteRoutes.post('/', function(req, res) {
  quotesData.push({
    quote: req.body.quote,
    author: req.body.author,
    genre: req.body.genre,
  });
  res.redirect('/quotes');
});


//add quote
quoteRoutes.get('/add', function(req, res) {
  res.render('quotes/quotes-add', {
    documentTitle: 'Ada\'s Quotes!!',
  });
});

//get individual quote
quoteRoutes.get('/:id', function(req, res) {
  const id = req.params.id;
  res.render('quotes/quotes-single', {
    documentTitle: 'Ada quotes!!',
    quoteClass: 'single-quote',
    quote: quotesData[id]
  });
});

//export
module.exports = quoteRoutes;
