/* setting up express */
const express = require('express');
const logger = require('morgan');
const path = require('path');
const app = express();

/* importing routes */
const quoteRoutes = require('./routes/quotes');

/* setting up port & listen */
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});

/* setting up views */
app.set('views', './views');
app.set('view engine', 'ejs');

/* setting static file */
app.use('/static', express.static(path.join(__dirname, 'public')));
/* setting up logging */
app.use(logger('dev'));

/* setting routes */
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

/* handling 404 */
app.get('*', function(req, res) {
  res.status(404).send({message: 'Oops! Not found.'});
});
