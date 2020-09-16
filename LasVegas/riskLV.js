console.log("Risk in Las Vegas has loaded!");

var violationCodesURL = "https://opendata.arcgis.com/datasets/9abf2b74783e49f4949afc06839860a7_0.geojson";
var restaurantInspectionsURL = "https://opendata.arcgis.com/datasets/94fe16f2a6a241f6841e1ed5c2f1f519_0.geojson";


///data call to populate dropdown list
d3.json(restaurantInspectionsURL).then(function(restaurantInspectionsData) {
    var LVRestaurants = restaurantInspectionsData.features
    
    var scoreCategoryAll = []

        ///for loop to get risk categories
        for (i = 0; i < LVRestaurants.length; i++) { //for 1
            if (LVRestaurants[i].properties.Inspection_Result != undefined) { //if 1
                scoreCategoryAll.push(LVRestaurants[i].properties.Inspection_Result);            
            } //end if 1
        }; //end for 1

        //consolidate to only unique values
        var riskCategoryUnique =  [...new Set(scoreCategoryAll)]
        console.log(riskCategoryUnique)

        //populate restaurant-risk dropdown with values
        var select = document.getElementById("risk-select");
        for(i=0; i < riskCategoryUnique.length; i++) {
            select.options[select.options.length] = new Option(riskCategoryUnique[i]);
        }    
});////end populate dropdown



d3.json(restaurantInspectionsURL).then(function(restaurantInspectionsData) {
    var LVRestaurants = restaurantInspectionsData.features
    console.log("Restaurant Data")
    // console.log(LVRestaurants)

        LVRestaurantMinData = {}
        for (i=0; i < LVRestaurants.length; i++){
            // console.log(LVRestaurants[i])
            LVRestaurantName = LVRestaurants[i].properties.Restaurant_Name
            LVRestaurantAddress = LVRestaurants[i].properties.Address + ", " + LVRestaurants[i].properties.City + ", " + LVRestaurants[i].properties.State + ", " + LVRestaurants[i].properties.Zip


            LVRestaurantMinData[LVRestaurantName] = {"Name": LVRestaurantName, 
                                                    "Address" : LVRestaurantAddress,
                                                    "Category" : LVRestaurants[i].properties.Category_Name, 
                                                    "Date of Inspection": LVRestaurants[i].properties.Inspection_Date,
                                                    "Inspection Result": LVRestaurants[i].properties.Inspection_Result,
                                                    "Current Grade": LVRestaurants[i].properties.Current_Grade,
                                                    "Inpection Type": LVRestaurants[i].properties.Inspection_Type
                                                }
        } //for loop to create new list

        console.log(LVRestaurantMinData)









    
}); //d3.json(restaurantInspectionsURL)


