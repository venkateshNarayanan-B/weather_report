//api key       :   1fbc322f264026a3468b11852d8919fc
//weather api   :   https://api.openweathermap.org/data/2.5/weather?lat=9.7347&lon=77.2844&appid=1fbc322f264026a3468b11852d8919fc&units=metric
//initiate required lib to the project
const express       =   require('express');
const bodyParser    =   require('body-parser');
//extend https lib for api manuplation
const https         =   require("https");


//extend express to app
const app           =   express();

//initiating ejs in project
app.set("view engine", "ejs");

//initiate static asset folder
app.use(express.static("assets"));
//initiate body-parser
app.use(bodyParser.urlencoded({extended: true}));

//home page section
app.get("/", function(req, res){
    var url     =   "https://api.openweathermap.org/data/2.5/weather?lat=9.7347&lon=77.2844&appid=1fbc322f264026a3468b11852d8919fc&units=metric"
    https.get(url, function(response){
        console.log(response.statusCode);

        //retrive weather data
        response.on("data",function(data){
            let weatherReport   =   JSON.parse(data);
            let cityName        =   weatherReport.name;
            let temperature     =   weatherReport.main.temp;
            let description     =   weatherReport.weather[0].description;
            let icon            =   weatherReport.weather[0].icon;
            let iconUrl         =   "https://openweathermap.org/img/wn/"+icon+"@2x.png";

            //sending weather data to the browser
            res.write("<h1>the weather in "+ cityName +" is "+temperature+" degree celcius</h1>");
            res.write("<h3>"+description+"</h3>");
            res.write("<p><img src='"+iconUrl+"'></p>");
            res.send();
        });
    });
    
});
//get custome weather report landing page
app.get("/weather", function(req, res){
//load weather file containg form
res.render("index", {dataPresent: false});
});

//custome weather report result page
app.post("/weather", function(req, res){
    //get latitude value
    let lat =   req.body.lat;
    let lon =   req.body.lon;
    let url =   "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=1fbc322f264026a3468b11852d8919fc&units=metric";

    //initiate https lib to get JSON data
    https.get(url, function(response){
        //check the status code 200
        if(response.statusCode === 200)
        {
            console.log(response.statusCode);
            //retrive data from response
            response.on("data", function(data){
                let weatherReport   =   JSON.parse(data);
                let cityName        =   weatherReport.name;
                let temperature     =   weatherReport.main.temp;
                let description     =   weatherReport.weather[0].description;
                let icon            =   weatherReport.weather[0].icon;
                let iconUrl         =   "https://openweathermap.org/img/wn/"+icon+"@2x.png";

                //data object
                let weatherData     =   {
                                            dataPresent     :   true,
                                            dataCityName    :   cityName, 
                                            dataTemperature :   temperature, 
                                            dataDescription :   description,
                                            dataIconUrl     :   iconUrl
                                        };

                //sending weather data to the browser
                res.render("index", weatherData);
                
            });
        }else{
            console.log(response.statusCode);
            res.redirect("/weather");
        }
    });

});
//create port and start the server
app.listen(3000, function(){
    console.log("Server is up in port 3000");
});

