console.log("scores.js is connected")

//data links
var healthScoresUrl = "https://data.sfgov.org/resource/pyih-qa8i.json"
//end data links

///data call to populate dropdown list
d3.json(healthScoresUrl).then(function(healthData) {
    var riskCategoryAll = []

        ///for loop to get risk categories
        for (i = 0; i < healthData.length; i++) { //for 1
            if (healthData[i].risk_category != undefined) { //if 1
                riskCategoryAll.push(healthData[i].risk_category);            
            } //end if 1
        }; //end for 1

        //consolidate to only unique values
        var riskCategoryUnique =  [...new Set(riskCategoryAll)]
        console.log(riskCategoryUnique)

        //populate restaurant-risk dropdown with values
        var select = document.getElementById("risk-select");
        for(i=0; i < riskCategoryUnique.length; i++) {
            select.options[select.options.length] = new Option(riskCategoryUnique[i]);
        }    
});////end populate dropdown


function createTable(value) {

    d3.json(healthScoresUrl).then(function(healthData) {
        // console.log(healthData);
        console.log(healthData[0])

        var restaurantRiskList = {} 

        for (i = 0; i < healthData.length; i++) { //for 1
            // var risk_level = healthData[i].risk_category;
            if (healthData[i].risk_category != undefined) { //if 1
                // restaurantRiskList[healthData[i].business_name + ", " + healthData[i].business_address] = 
                restaurantRiskList[i] = {"business_name": healthData[i].business_name, "risk_level": healthData[i].risk_category, "address": healthData[i].business_address + ", " + healthData[i].business_city + ", " + healthData[i].business_state + ", " + healthData[i].business_postal_code, "inspection_date": new Date(healthData[i].inspection_date).toDateString(), "inspection_type": healthData[i].inspection_type, "violation_description": healthData[i].violation_description}
            } //end if 1
        }; //end for 1
        // console.log(restaurantRiskList)

        console.log(restaurantRiskList)
        console.log(restaurantRiskList[1].business_name)


        moderateRisk = []
        highRisk = []
        lowRisk = []

        // "Moderate Risk", "Low Risk", "High Risk"]
        for (const property in restaurantRiskList) {
            // console.log("moo")
            if (restaurantRiskList[property].risk_level === "Moderate Risk") {
                console.log("Moderate Risk at: " + restaurantRiskList[property].business_name)
                moderateRisk.push(restaurantRiskList[property])
            }
            else if (restaurantRiskList[property].risk_level === "Low Risk"){
                console.log("Low Risk at: " + restaurantRiskList[property].business_name)
                lowRisk.push(restaurantRiskList[property])
            }
            else {
                console.log("High Risk at: " + restaurantRiskList[property].business_name)
                highRisk.push(restaurantRiskList[property])
            }
        };

        console.log("chosen value: " + value)

        if (value === "Moderate Risk") {
            console.log("Moderate Risk, dawg")
            var tableData = moderateRisk
        }
        else if (value === "Low Risk") {
            console.log("Low Risk, home. We can risk it.")
            var tableData = lowRisk
        }
        else if (value === "High Risk") {
            console.log("High risk! Beware!!!")
            var tableData = highRisk
        }
        else {console.log("something broke")}

        d3.select("tbody")
        .selectAll("tr").remove()

        d3.select("tbody")
        .selectAll("tr")
        .data(tableData)
        .enter()
        .append("tr")
        .html(function(d) {
            return `<td>${d.business_name}</td><td>${d.risk_level}</td><td>${d.address}</td><td>${d.inspection_date}</td><td>${d.inspection_type}</td><td>${d.violation_description}</td>`;

        })
            

        }); //end createTable

}; //end d3.json(healthScoresUrl, function(healthData)

