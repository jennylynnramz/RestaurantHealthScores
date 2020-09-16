console.log("Risk in Las Vegas has loaded!");

// var violationCodesURL = "https://opendata.arcgis.com/datasets/9abf2b74783e49f4949afc06839860a7_0.geojson";
var restaurantInspectionsURL = "https://opendata.arcgis.com/datasets/94fe16f2a6a241f6841e1ed5c2f1f519_0.geojson";


///data call to populate dropdown list
d3.json(restaurantInspectionsURL).then(function(restaurantInspectionsData) {
    var LVRestaurants = restaurantInspectionsData.features
    
    var scoreAll = []
    var restaurantCategoryAll = []

        ///for loop to get risk categories
        for (i = 0; i < LVRestaurants.length; i++) { //for 1
            if (LVRestaurants[i].properties.Inspection_Result != undefined) { //if 1
                scoreAll.push(LVRestaurants[i].properties.Inspection_Result); 
            } //end if 1
            if (LVRestaurants[i].properties.Category_Name != undefined) { //if 2
                restaurantCategoryAll.push(LVRestaurants[i].properties.Category_Name);
            } //end if 2

        }; //end for 1

        //consolidate to only unique values
        var riskCategoryUnique =  [...new Set(scoreAll)]
        console.log(riskCategoryUnique)

        var restaurantCategoryUnique = [...new Set(restaurantCategoryAll)]
        console.log(restaurantCategoryUnique)

        //populate restaurant-risk dropdown with values
        var select = document.getElementById("inspection-result-select");
        for(i=0; i < riskCategoryUnique.length; i++) {
            select.options[select.options.length] = new Option(riskCategoryUnique[i]);
        }  
        
        var select = document.getElementById("category-select");
        for(i=0; i < restaurantCategoryUnique.length; i++) {
            select.options[select.options.length] = new Option(restaurantCategoryUnique[i]);
        }  



        
});////end populate dropdown

/////////////////////////////////////////////////////////////////

//function to create table

function createTable(value) {

    d3.json(restaurantInspectionsURL).then(function(restaurantInspectionsData) {
        var LVRestaurants = restaurantInspectionsData.features
        console.log("Restaurant Data")
        // console.log(LVRestaurants)

            LVRestaurantMinData = {}
            for (i=0; i < LVRestaurants.length; i++){
                // console.log(LVRestaurants[i])
                var LVRestaurantName = LVRestaurants[i].properties.Restaurant_Name
                var LVRestaurantAddress = LVRestaurants[i].properties.Address + ", " + LVRestaurants[i].properties.City + ", " + LVRestaurants[i].properties.State + ", " + LVRestaurants[i].properties.Zip

                LVRestaurantMinData[LVRestaurantName] = {"Name": LVRestaurantName, "Address" : LVRestaurantAddress, "Category" : LVRestaurants[i].properties.Category_Name, "Date of Inspection": LVRestaurants[i].properties.Inspection_Date, "Inspection Result": LVRestaurants[i].properties.Inspection_Result, "Current Grade": LVRestaurants[i].properties.Current_Grade, "Inpection Type": LVRestaurants[i].properties.Inspection_Type}
            } //for loop to create new list

            // console.log(LVRestaurantMinData)

            console.log(riskCategoryUnique)

            var scoreCategoryAll = []

            ///for loop to get risk categories
            for (i = 0; i < LVRestaurants.length; i++) {
                if (LVRestaurants[i].properties.Inspection_Result != undefined) {
                    scoreCategoryAll.push(LVRestaurants[i].properties.Inspection_Result);            
                } //end if
            }; //end for

            //consolidate to only unique values
            var riskCategoryUnique =  [...new Set(scoreCategoryAll)]
            console.log(riskCategoryUnique)

            //populate restaurant-risk dropdown with values
            var select = document.getElementById("risk-select");
            for(i=0; i < riskCategoryUnique.length; i++) {
                select.options[select.options.length] = new Option(riskCategoryUnique[i]);
            } 

            for (j=0; j < riskCategoryUnique.length; j++) {
                console.log(riskCategoryUnique[j])

                
            }


        
    }); //d3.json(restaurantInspectionsURL)

} //end of createTable function


