console.log("scores.js is connected")

//data links
var healthScoresUrl = "https://data.sfgov.org/resource/pyih-qa8i.json"
//end data links

d3.json(healthScoresUrl).then(function(healthData) {
    console.log(healthData);



}); //end d3.json(healthScoresUrl, function(healthData)
