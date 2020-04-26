const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist'))); // set the default directory 

const port = process.env.PORT || 3000; // we use process.env.PORT so that it would work on heroku environment, if null then it will fallback to 3000

app.get('/', (req, res) => {
    res.send('Wrong Endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const server = require('http').createServer(app);

server.listen(port, () => {
    console.log("Server is Starting at Port " + port);
})

// const server = app.listen(app.get('port'), function() { 
//   console.log('listening on port ', server.address().port); 
// });
