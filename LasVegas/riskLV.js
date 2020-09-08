console.log("Risk in Las Vegas has loaded!");

var violationCodesURL = "https://opendata.arcgis.com/datasets/9abf2b74783e49f4949afc06839860a7_0.geojson";
var restaurantInspectionsURL = "https://opendata.arcgis.com/datasets/94fe16f2a6a241f6841e1ed5c2f1f519_0.geojson";


d3.json(restaurantInspectionsURL).then(function(restaurantInspectionsData) {
    var LVRestaurants = restaurantInspectionsData.features
    console.log("Restaurant Date")
    console.log(LVRestaurants)


    d3.json(violationCodesURL).then(function(violationCodesData) {
        var violationCodes = violationCodesData.features
        console.log("Violation Data")
        console.log(violationCodes)

    

        var lvRestaurantRisk = {}

        for (i = 0; i < LVRestaurants.length; i++){
            var violationRestaurant = LVRestaurants[i].properties.Violations
            restaurantName = LVRestaurants[i].properties.Restaurant_Name

            for (j = 0; j < violationCodes.length; j++){
                var violationCodeNumVC = violationCodes[j].properties.Violation_Code
                if (violationRestaurant == null){
                    var violationReason = "non-violation"
                // console.log(LVRestaurants[i])
                    lvRestaurantRisk[restaurantName] = {
                        "restaurant_name" : LVRestaurants[i].properties.Restaurant_Name, 
                        "address" : LVRestaurants[i].properties.Address + ", " + LVRestaurants[i].properties.City + " " + LVRestaurants[i].properties.Zip, "violation_reason" : violationReason,
                        "wow" : "wow"

                    } //end list creation

                } //end if null
                // console.log(violationCodes[j].properties.Violation_Code)
                else {
                    if (violationRestaurant == violationCodeNumVC){
                    violationReason = violationCodes[j].properties.Violation_Description
                    console.log(violationReason)
                  
    
                    }


                    }
                
                

            } //for j
        } //for i


        }
        console.log(lvRestaurantRisk)

        // Current_Demerits: 0
        // Current_Grade: "A"
        // Inspection_Date: "2020/07/04 00:00:00"
        // Inspection_Demerits: 0
        // Inspection_Grade: "A"
        // Inspection_Result: "'A' Grade"
        // Inspection_Type: "Routine Inspection"
        // Location_1: "(36.1073485,115.1765836)"
        // Location_Name: "CITY CENTER Residences"
        // Restaurant_Name: "ARIA GEM BAR LOUNGE"
        // Violations: null
        // Zip: "89109"










    
    }); //d3.json(violationCodesURL)
}); //d3.json(restaurantInspectionsURL)
