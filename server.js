

const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended : true}))

app.get('/', function(req, res){

  res.sendFile(__dirname + '/index.html')

})
app.post('/', function(req, res){
  const q = req.body.cityName
  const url = 'https://api.openweathermap.org/data/2.5/weather?q='+q+'&appid=d909eaaa296b03d540713c9b91a033d4&units=metric'
  https.get(url, function(response){
    response.on('data', function(data){
      const temp = JSON.parse(data).main.temp;
      const des = JSON.parse(data).weather[0].description;
      const code = JSON.parse(data).weather[0].icon;
      const iconCodeLink = 'http://openweathermap.org/img/wn/'+ code +'@2x.png'
      res.write('<h1>The weather in ' + q + ' is temp is '  +temp + ' degree celcius</h1>' );
      res.write('<h1>And the current weathe is ' + des + '</h1>')
      res.write('<img src='+ iconCodeLink +' >')

    })
  })

})



app.listen(process.env.PORT || 3000, function(){
  console.log('running at 3000 port')
})
