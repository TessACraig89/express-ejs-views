//sets up express, morgan and path
const express = require('express');

//morgan used to log each http request to the console
const logger = require('morgan');

const path = require('path');

const app = express();

//imports routes from
const quoteRoutes = require('./routes/quotes');

/* setting up port & listen */
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});

// where to look for the template , (what we're setting, where to look for the views)
app.set('views', path.join(__dirname, 'views'));

// what kind of template, (what we're setting, what kind of view engine to expect)
app.set('view engine', 'ejs');

//add and serve static asset using express.static function
app.use('/static', express.static(path.join(__dirname, 'public')));

//use morgan to log dev info to log
app.use(logger('dev'));

//when request is made to the home and show more is true
  // use render to send message, documentTitle, subTitle, show more boolean value , and quote authors back to client and put into a template firsr
app.get('/', function(req, res) {
  res.render('index', {
    message: 'Hello World!',
    documentTitle: 'Ada quotes!!',
    subTitle: 'Read some of the coolest quotes around.',
    showMore: true,
    quoteAuthors: ['Unknown', 'Yoda', 'CS Lewis', 'Frank Chimero', 'Pablo Picasso', 'Italo Calvino', 'T. S. Eliot', 'Samuel Beckett', 'Hunter S. Thompson'],
  });
});

// when request to sent to quotes use quoteRoutes
app.use('/quotes', quoteRoutes);

// app.get '*' catch all for all paths
//  add a 404 status to the response, that routes back a response message
app.get('*', function(req, res) {
  res.status(404).send({message: 'Oops! Not found.'});
});
