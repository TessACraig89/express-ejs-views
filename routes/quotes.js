//set up express
const express = require('express');

//create modular, mountable route handlers using express.Router
const quoteRoutes = express.Router();

//require quotes from database and store in quotesData var
const quotesData = require('../db/quotes');

//when routes to home pafe
  //render quotes/quotes-index view, quotesData object, quoteClass, and documentTitle
quoteRoutes.get('/', function(req, res) {
  res.render('quotes/quotes-index', {
    quotes: quotesData,
    quoteClass: 'my-quote',
    documentTitle: 'Ada quotes!!'
  });
});

//when routed to home page push quotesData
quoteRoutes.post('/', function(req, res) {
  quotesData.push({
    quote: req.body.quote,
    author: req.body.author,
    genre: req.body.genre,
  });
  res.redirect('/quotes');
});

//define the add route

quoteRoutes.get('/add', function(req, res) {
  res.render('quotes/quotes-add', {
    documentTitle: 'Ada\'s Quotes!!',
  });
});

/* get individual quote */
quoteRoutes.get('/:id', function(req, res) {
  const id = req.params.id;
  res.render('quotes/quotes-single', {
    documentTitle: 'Ada quotes!!',
    quoteClass: 'single-quote',
    quote: quotesData[id]
  });
});

/* exporting */
module.exports = quoteRoutes;
