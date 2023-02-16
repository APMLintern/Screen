var axios = require('axios');
var data = JSON.stringify({
  "collection": "SHPL_LOGIN DATABASE ",
  "database": "SHPL",
  "dataSource": "ApmlDatabase"
});

var config = {
  method: 'post',
  url: 'https://data.mongodb-api.com/app/data-qnlja/endpoint/data/v1/action/findOne',
  headers: { 
    'Content-Type': 'application/json', 
    'Access-Control-Request-Headers': '*', 
    'api-key': '5ulZ4dPioIRNl1a4jNbkYDnN8VNcw9EryJ9pNNdN0Kbw8SyLJHQWibBAMoLgcZ5k'
  },
  data : data
};

axios(config) 
.then(function (response) {
  console.log(response.data.document.username,response.data.document.password);


})
.catch(function (error) {
  console.log(error);
});