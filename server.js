
var express = require('express');
const request = require('request');
const PORT =  process.env.PORT || 3000;
const cors = require('cors')

var app = express();


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });

app.get('/', function (req, res) {
    request('https://api.npoint.io/20c1afef1661881ddc9c', function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', typeof(body)); // Print the HTML for the Google homepage.
        var array =[]
        var obj = JSON.parse(body);

        for (var i = 0; i < obj["playerList"].length; i++)
        {
            array.push({"image":"assets/"+obj["playerList"][i]["Id"]+".jpg","PFName":obj["playerList"][i]["PFName"],"Value":obj["playerList"][i]["Value"],"VsCCode":obj["playerList"][i]["UpComingMatchesList"][0]["VsCCode"],"CCode":obj["playerList"][0]["UpComingMatchesList"][0]["CCode"],"date":obj["playerList"][0]["UpComingMatchesList"][0]["MDate"],"skilldesc":obj["playerList"][i]["SkillDesc"],"TeamName":obj["playerList"][i]["TName"]})
    
        }

       
        
      
        res.contentType('application/json');
        res.send(JSON.stringify(array));

      });
      



})

  app.listen(PORT,function()
  {
      console.log("Server is running")
  });

