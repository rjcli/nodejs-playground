const express = require('express');

const viewRouter = require('./routes/viewRoutes');

const app = express();

// View engine
app.set('view engine', 'pug');
app.set('views', './views');

// Routes
app.use('/', viewRouter);

app.use(express.static('./public'));

const PORT = global.process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}...`);
});
