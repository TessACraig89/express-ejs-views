//sets up express, morgan and path
const express = require('express');

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

//set up ejs view 
app.set('views', './views');
app.set('view engine', 'ejs');

//add and serve static asset using express.static function
app.use('/static', express.static(path.join(__dirname, 'public')));

//add logger
app.use(logger('dev'));

//get index from root folder
app.get('/', function(req, res) {
  res.render('index', {
    message: 'Hello World!',
    documentTitle: 'Ada quotes!!',
    subTitle: 'Read some of the coolest quotes around.',
    showMore: true,
    quoteAuthors: ['Unknown', 'Yoda', 'CS Lewis', 'Frank Chimero', 'Pablo Picasso', 'Italo Calvino', 'T. S. Eliot', 'Samuel Beckett', 'Hunter S. Thompson'],
  });
});

app.use('/quotes', quoteRoutes);

// get 404 page and send message
app.get('*', function(req, res) {
  res.status(404).send({message: 'Oops! Not found.'});
});
