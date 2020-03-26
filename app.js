const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors);
app.use(express.static(path.join(__dirname, 'dist'))); // set the default directory 
app.set('port', process.env.PORT); // we use process.env.PORT so that it would work on heroku environment, if null then it will fallback to 3000

const server = app.listen(app.get('port'), function() { 
  console.log('listening on port ', server.address().port); 
});
