console.log("search.js is connected")

//data links
var healthScoresUrl = "https://data.sfgov.org/resource/pyih-qa8i.json"
//end data links


d3.json(healthScoresUrl).then(function(healthData) {
    // console.log(healthData)

    // d3.select("tbody")
    // .selectAll("tr").remove()


    var searchNameAll = []
    for (i = 0; i < healthData.length; i++) { //for 1
        if (healthData[i].risk_category != undefined) {
            searchNameAll[i] = {"business_name": healthData[i].business_name.toLowerCase(), "risk_level": healthData[i].risk_category, "address": healthData[i].business_address.toLowerCase() + ", " + healthData[i].business_city + ", " + healthData[i].business_state + ", " + healthData[i].business_postal_code, "inspection_date": new Date(healthData[i].inspection_date).toDateString(), "inspection_type": healthData[i].inspection_type, "violation_description": healthData[i].violation_description}
        }
        else {
            searchNameAll[i] = {"business_name": healthData[i].business_name.toLowerCase(), "risk_level": "N/A", "address": healthData[i].business_address.toLowerCase() + ", " + healthData[i].business_city + ", " + healthData[i].business_state + ", " + healthData[i].business_postal_code, "inspection_date": new Date(healthData[i].inspection_date).toDateString(), "inspection_type": healthData[i].inspection_type, "violation_description": healthData[i].violation_description}
        }
    }; //end for 1
        // console.log(searchNameAll)

        d3.select("tbody")
        .selectAll("tr")
        .data(searchNameAll)
        .enter()
        .append("tr")
        .html(function(d) {
            return `<td>${d.business_name}</td><td>${d.risk_level}</td><td>${d.address}</td><td>${d.inspection_date}</td><td>${d.inspection_type}</td><td>${d.violation_description}</td>`;
        });

}); //end d3

function nameSearchRun() {
    var inputValue = (document.getElementById("restaurant-name").value).toLowerCase();
    console.log(inputValue)

    d3.json(healthScoresUrl).then(function(searchData) {
        // console.log(searchData)
        
        var searchInput = []
        for (i=0; i < searchData.length; i++) {
            if (searchData[i].business_name.toLowerCase() === inputValue) {
                searchInput = {"business_name": searchData[i].business_name.toLowerCase(), "risk_level": searchData[i].risk_category, "address": searchData[i].business_address.toLowerCase() + ", " + searchData[i].business_city + ", " + searchData[i].business_state + ", " + searchData[i].business_postal_code, "inspection_date": new Date(searchData[i].inspection_date).toDateString(), "inspection_type": searchData[i].inspection_type, "violation_description": searchData[i].violation_description}      
            }   
        }
        d3.select("tbody")
        .selectAll("tr").remove();

        createSearchMoo(searchInput)

    });//end d3 for nameSearch 
}; //end function nameSearch

function createSearchMoo (searchInput) {
    console.log("searchInput")
    console.log(searchInput)

   

    console.log("after remove");

    d3.select("tbody")
    .selectAll("tr")
    .data(searchInput)
    .enter()
    .append("tr")
    .html(function(e)
        {`<td>${e.business_name}</td><td>${e.risk_level}</td><td>${e.address}</td><td>${e.inspection_date}</td><td>${e.inspection_type}</td><td>${e.violation_description}</td>`});
    console.log("after adding html");

};

// .html(`<td>${searchInput.business_name}</td><td>${searchInput.risk_level}</td><td>${searchInput.address}</td><td>${searchInput.inspection_date}</td><td>${searchInput.inspection_type}</td><td>${searchInput.violation_description}</td>`);

