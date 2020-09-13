console.log("Risk in Las Vegas has loaded!");

var violationCodesURL = "https://opendata.arcgis.com/datasets/9abf2b74783e49f4949afc06839860a7_0.geojson";
var restaurantInspectionsURL = "https://opendata.arcgis.com/datasets/94fe16f2a6a241f6841e1ed5c2f1f519_0.geojson";


d3.json(restaurantInspectionsURL).then(function(restaurantInspectionsData) {
    var LVRestaurants = restaurantInspectionsData.features
    console.log("Restaurant Data")
    // console.log(LVRestaurants)

        LVRestaurantMinData = {}
        for (i=0; i < LVRestaurants.length; i++){
            // console.log(LVRestaurants[i])
            LVRestaurantName = LVRestaurants[i].properties.Restaurant_Name
            LVRestaurantAddress = LVRestaurants[i].properties.Address + ", " + LVRestaurants[i].properties.City + ", " + LVRestaurants[i].properties.State + ", " + LVRestaurants[i].properties.Zip

            // console.log(LVRestaurants[i].properties.Inspection_Result)
            console.log(LVRestaurants[i].properties.Inspection_Grade)




            // console.log(LVRestaurantName)
            // console.log(LVRestaurantAddress)



            LVRestaurantMinData[LVRestaurantName] = {"Name": LVRestaurantName, 
                                                    "Address" : LVRestaurantAddress,
                                                    "Category" : LVRestaurants[i].properties.Category_Name, 
                                                }

        }

        console.log(LVRestaurantMinData)









    
}); //d3.json(restaurantInspectionsURL)



// Current_Demerits: 0
// Current_Grade: "A"
// Date_Current: "2020/03/23 00:00:00"
// Employee_ID: "EE7000804"
// Inspection_Date: "2020/03/23 00:00:00"
// Inspection_Demerits: 0
// Inspection_Grade: "A"
// Inspection_Result: "'A' Grade"
// Inspection_Time: "2020/03/23 15:20:00"
// Inspection_Type: "Routine Inspection"
// Location_1: "(36.1588472,115.2075095)"
// ObjectId: 1295877
// Permit_Number: "PR0098643"
// Permit_Status: ""
// Record_Updated: "2020/03/23 16:00:02"
// Serial_Number: "DAIHHHL40"
// Violations: 2928
