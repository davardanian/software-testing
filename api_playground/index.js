const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const apiv1 = require('./src/api_v1')

const logger = require('morgan');

app.get('/', function(req, res){
    res.send("Hello to our testing playground !");
    res.send("Head to /api/v1/tasks")
 });

app.use(express.json());
app.use(logger('dev'));
app.use(cookieParser());
app.use('/api/v1', apiv1)



 

app.get('*', (req, res, next) => {
    // Error goes via `next()` method
    res.status(404)
    setImmediate(() => {
      next(new Error('Something went wrong'));
    });
  });
  app.use((error, req, res, next) => {
    // Error gets here
    res.json({
      message: error.message
    });
  });


const port = process.env.PORT || 3000;
app.listen(port, () => {
    
    console.log(`Listening on port ${port}...`)
    app.emit("appStarted");
});
module.exports = app
