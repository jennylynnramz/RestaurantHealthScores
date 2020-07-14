console.log("scores.js is connected")

//data links
var healthScoresUrl = "https://data.sfgov.org/resource/pyih-qa8i.json"
//end data links

d3.json(healthScoresUrl).then(function(healthData) {
    // console.log(healthData);
    console.log(healthData[0])

    var riskCategoryAll = []

    ///for loop to get risk categories
    for (i = 0; i < healthData.length; i++) { //for 1
        if (healthData[i].risk_category != undefined) { //if 1
            // console.log(healthData[i].business_name + ": " + healthData[i].risk_category);
            riskCategoryAll.push(healthData[i].risk_category);            
        } //end if 1
    }; //end for 1


    var restaurantRiskList = {} 

    for (i = 0; i < healthData.length; i++) { //for 1
        // var risk_level = healthData[i].risk_category;
        if (healthData[i].risk_category != undefined) { //if 1
            restaurantRiskList[healthData[i].business_name + ", " + healthData[i].business_address] = {"business_name": healthData[i].business_name, "risk_level": healthData[i].risk_category, "address": healthData[i].business_address + ", " + healthData[i].business_city + ", " + healthData[i].business_state + ", " + healthData[i].business_postal_code, "inspection_date": healthData[i].inspection_date, "inspection_type": healthData[i].inspection_type, "violation_description": healthData[i].violation_description}
        } //end if 1
    }; //end for 1

    // console.log(restaurantRiskList)

    





    // console.log(riskCategoryAll)
    //consolidate to only unique values
    var riskCategoryUnique =  [...new Set(riskCategoryAll)]
    // console.log(riskCategoryUnique)

    //populate restaurant-risk dropdown with values
    var select = document.getElementById("risk-select");
      for(i=0; i < riskCategoryUnique.length; i++) {
        // console.log(key)
        select.options[select.options.length] = new Option(riskCategoryUnique[i]);
      }
    ////end populate dropdown





}); //end d3.json(healthScoresUrl, function(healthData)
