const express = require('express');
const bodyParser = require('body-parser');
const middleware = require('./middleware/middleware');
const Mongo = require('./service/mongo.js');
const ApiHandler=require("./apiHandlers/apiHandler");



// Starting point of the server
function main () {

	Mongo.connect("mydb").then((dbo)=>{

  let app = express(); // Export app for other routes to use
  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`Server is listening on port: ${port}`));

  app.use(bodyParser.urlencoded({ // Middleware
	extended: true
  }));

  app.use(bodyParser.json({limit: '10mb', extended: true}),function (req, res, next) {
		// Website you wish to allow to connect
		res.setHeader('Access-Control-Allow-Origin', '*');
		 // Request methods you wish to allow
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		// Request headers you wish to allow
		res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
		// Pass to next layer of middleware
		next();
	});
	  
// Routes & Handlers

app.post('/login', ApiHandler.login);
app.get('/example',  middleware.checkToken, ApiHandler.example);
app.get('/', ApiHandler.index);



});

}

main();	


