console.log("Risk in Las Vegas has loaded!");

var violationCodesURL = "https://opendata.arcgis.com/datasets/9abf2b74783e49f4949afc06839860a7_0.geojson";
var restaurantInspectionsURL = "https://opendata.arcgis.com/datasets/94fe16f2a6a241f6841e1ed5c2f1f519_0.geojson";


d3.json(restaurantInspectionsURL).then(function(restaurantInspectionsData) {
    var LVRestaurants = restaurantInspectionsData.features
    console.log("Restaurant Data")
    console.log(LVRestaurants)
    // load violation explanation data
    d3.json(violationCodesURL).then(function(violationCodesData) {
        var violationCodes = violationCodesData.features
        console.log("Violation Data")
        console.log(violationCodes)

        violationRational = {}

        for (i=0; i < violationCodes.length; i++){
            var violationCode = violationCodes[i].properties.Violation_Code
            var violationDescription = violationCodes[i].properties.Violation_Description
            violationRational[violationCode] = violationDescription
        }

        // console.log(violationRational)
        // for (var value in violationRational){
        //     console.log(value)
        // }

        for (const property in violationRational) {
            console.log(`${property}: ${violationRational[property]}`);
        }









    
    }); //d3.json(violationCodesURL)
}); //d3.json(restaurantInspectionsURL)
