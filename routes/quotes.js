/* setting up router */
const express = require('express');
const quoteRoutes = express.Router();

/* getting quotes from database */
const quotesData = require('../db/quotes');

/* get all quotes */
quoteRoutes.get('/', function(req, res) {
  res.render('quotes/quotes-index', {
    documentTitle: 'Ada\'s Quotes!!',
    quotesData: quotesData,
  });
});

/* get individual quote */
quoteRoutes.get('/:id', function(req, res) {
  const id = req.params.id;
  res.send(quotesData[id]);
});

/* exporting */
module.exports = quoteRoutes;
