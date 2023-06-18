//initiate required lib to the project
const express       =   require('express');
const bodyParser    =   require('body-parser');

//extend express to app
const app           =   express();


//create port and start the server
app.listen(3000, function(){
    console.log("Server is up in port 3000");
});

