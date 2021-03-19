// checking to make sure there is a connection
console.log("Risk in Las Vegas has loaded!");

//the link where the data comes from
var restaurantInspectionsURL = "https://opendata.arcgis.com/datasets/94fe16f2a6a241f6841e1ed5c2f1f519_0.geojson";

//the place where we will store all the sorted and organized data
var AllLVRestaurant = []

///data call to populate dropdown lists with data
d3.json(restaurantInspectionsURL).then(function(restaurantInspectionsData) {
    var LVRestaurants = restaurantInspectionsData.features
    
    var scoreAll = []
    var restaurantCategoryAll = []
    var restaurantNameAll = []

        ///for loop to get risk categories
        for (i = 0; i < LVRestaurants.length; i++) { //for 1
            if (LVRestaurants[i].properties.Inspection_Result != undefined) { //if 1
                scoreAll.push(LVRestaurants[i].properties.Inspection_Result); 
            } //end if 1
            if (LVRestaurants[i].properties.Category_Name != undefined) { //if 2
                restaurantCategoryAll.push(LVRestaurants[i].properties.Category_Name);
            } //end if 2
            if (LVRestaurants[i].properties.Restaurant_Name != undefined) { //if 2
                if (LVRestaurants[i].properties.Restaurant_Name.includes("Eleven") == false && LVRestaurants[i].properties.Restaurant_Name.includes("7") == false)
                {restaurantNameAll.push(LVRestaurants[i].properties.Restaurant_Name)}   
                else {continue}
            } //end if 2

        }; //end for 1

        //consolidate to only unique values
        var restaurantNameUnique = [...new Set(restaurantNameAll)]
        restaurantNameUnique.sort()
        var riskCategoryUnique =  [...new Set(scoreAll)]
        riskCategoryUnique.sort()
        var restaurantCategoryUnique = [...new Set(restaurantCategoryAll)]
        restaurantCategoryUnique.sort()

        //populate restaurant-risk dropdown with values
        var select = document.getElementById("name-select");
        for(i=0; i < restaurantNameUnique.length; i++) {
            select.options[select.options.length] = new Option(restaurantNameUnique[i]);
        }  
        
        var select = document.getElementById("inspection-result-select");
        for(i=0; i < riskCategoryUnique.length; i++) {
            select.options[select.options.length] = new Option(riskCategoryUnique[i]);
        }  
        
        var select = document.getElementById("category-select");
        for(i=0; i < restaurantCategoryUnique.length; i++) {
            select.options[select.options.length] = new Option(restaurantCategoryUnique[i]);
        }  

        var LVRestaurantMinData = []
        for (i=0; i < LVRestaurants.length; i++){
            // console.log(LVRestaurants[i])
            var LVRestaurantName = LVRestaurants[i].properties.Restaurant_Name
            var LVRestaurantAddress = LVRestaurants[i].properties.Address + ", " + LVRestaurants[i].properties.City + ", " + LVRestaurants[i].properties.State + ", " + LVRestaurants[i].properties.Zip

            LVRestaurantMinData[LVRestaurantName] = {"Name": LVRestaurantName, "Address" : LVRestaurantAddress, "Category" : LVRestaurants[i].properties.Category_Name, "Date_of_Inspection": new Date (LVRestaurants[i].properties.Inspection_Date).toDateString(), "Inspection_Result": LVRestaurants[i].properties.Inspection_Result, "Current_Grade": LVRestaurants[i].properties.Current_Grade, "Inpection_Type": LVRestaurants[i].properties.Inspection_Type}
        } //for loop to create new list

        // var AllLVRestaurant = []
        for (const property in LVRestaurantMinData) {
            AllLVRestaurant.push(LVRestaurantMinData[property])
        }

        populateTable(AllLVRestaurant)
        
});////end populate dropdown


function populateTable(restaurantList) {

    d3.select("tbody")
    .selectAll("tr").remove()

    d3.select("tbody")
    .selectAll("tr")
    .data(restaurantList)
    .enter()
    .append("tr")
    .html(function(d) {
    return `<td>${d.Name}</td><td>${d.Address}</td><td>${d.Category}</td><td>${d.Date_of_Inspection}</td><td>${d.Inspection_Result}</td><td>${d.Current_Grade}</td><td>${d.Inpection_Type}</td>`;
    })

    console.log("I just added a table!")
}; //end create table function




//find values that match the chosen category

function nameTable(value) {
    console.log(value)
    var InspectionResultData = []
 
    for (i=0; i < AllLVRestaurant.length; i++){
        if (AllLVRestaurant[i].Name == value){
            InspectionResultData.push(AllLVRestaurant[i])
        }
    }
    //send data to the populateTable function to clear and reset the page data
    populateTable(InspectionResultData)
};

function categoryTable(value) {
    console.log(value)
    var categoryData = []
    for (i=0; i < AllLVRestaurant.length; i++){
        if (AllLVRestaurant[i].Category == value){
            categoryData.push(AllLVRestaurant[i])
        }
    }
    //send data to the populateTable function to clear and reset the page data
    populateTable(categoryData)

}; //end of createTable function

function ratingTable(value) {
    console.log(value)
    var InspectionResultData = []
 
    for (i=0; i < AllLVRestaurant.length; i++){
        if (AllLVRestaurant[i].Inspection_Result == value){
            InspectionResultData.push(AllLVRestaurant[i])
        }
    }
    //send data to the populateTable function to clear and reset the page data
    populateTable(InspectionResultData)
};



