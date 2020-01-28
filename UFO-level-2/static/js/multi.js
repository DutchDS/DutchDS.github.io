// Get a reference to the page tags
//##################################
var submit_all = d3.select("#submit-all");
var get_all = d3.select("#get-all");
var get_date = d3.select("#selectDate");
var get_city = d3.select("#selectCity");
var get_state = d3.select("#selectState");
var get_country = d3.select("#selectCountry");
var get_shape = d3.select("#selectShape");
var tableData = data;

// Load initial results
// ####################
load_all()
function load_all() {
    var tbody = d3.select("tbody");
    
    tbody.html(" ");
  
    console.log(tableData);
  
    tableData.forEach((f) => {
      console.log(f);
      var row = tbody.append("tr");
      Object.entries(f).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
      });
    });
  }

// Create empty arrays to store each list of values
var listDates = [];
var listCities = [];
var listStates = [];
var listCountries = [];
var listShapes = [];

// Iterate through each Data record and fill LongLists
tableData.forEach((r) => {
  listDates.push(r.datetime);
  listCities.push(r.city);
  listStates.push(r.state);
  listCountries.push(r.country);
  listShapes.push(r.shape)
})

// Go through each list and create a short list by removing duplicates
function uniqueValues(myList) {
    var longList = myList;
    var shortList = [];
  
    // Iterate through the array
    for (var i = 0; i < longList.length; i++) {
        var currentWord = longList[i];
        if (shortList.indexOf(currentWord) == -1) {
            shortList.push(currentWord);
            } 
        }  
    // console.log(shortList);
    return shortList;
  }

shortDates = uniqueValues(listDates);
shortCities = uniqueValues(listCities);
shortStates = uniqueValues(listStates);
shortCountries = uniqueValues(listCountries);
shortShapes = uniqueValues(listShapes);

console.log(shortDates);
console.log(shortCities);
console.log(shortStates);
console.log(shortCountries);
console.log(shortShapes);

// Fill dropdown boxes when page is refreshed
function loadDropDowns(myId, myshortList, myText) {
    // var tbody = d3.select("tbody");
    var inputDate = d3.select(myId) 
   
    inputDate.html(" ");
  
    console.log(myshortList);
    var cell = inputDate.append("option").text(myText);
    
    myshortList.forEach((f) => {
      console.log(f);
      var cell = inputDate.append("option")
      cell.text(f);
  
      });
    };
loadDropDowns("#selectDate",shortDates,"Select Date");
loadDropDowns("#selectCity",shortCities,"Select City");
loadDropDowns("#selectState",shortStates,"Select State");
loadDropDowns("#selectCountry",shortCountries,"Select Country");
loadDropDowns("#selectShape",shortShapes,"Select Shape");


get_date.on("click", function() {load_select("#selectDate", "Date")});
get_city.on("click", function() {load_select("#selectCity", "City")});
get_state.on("click", function() {load_select("#selectState", "State")});
get_country.on("click", function() {load_select("#selectCountry", "Country")});
get_shape.on("click", function() {load_select("#selectShape", "Shape")});


// Lastly Filter result set when a filter is chosen from the dropdownboxes
function load_select(myId, myField) {
      // d3.event.preventDefault();

      var inputElement = d3.select(myId);
      console.log(inputElement);
    
      var inputValue = inputElement.property("value");
      console.log(inputValue);
  
    if (myField == "Date") {var filteredData = tableData.filter(tableData => {return tableData.datetime == inputValue});};
    if (myField == "City") {var filteredData = tableData.filter(tableData => {return tableData.city == inputValue});};
    if (myField == "State") {var filteredData = tableData.filter(tableData => {return tableData.state == inputValue});}
    if (myField == "Country") {var filteredData = tableData.filter(tableData => {return tableData.country == inputValue});};
    if (myField == "Shape") {var filteredData = tableData.filter(tableData => {return tableData.shape == inputValue});};

    console.log("CHECK" + myField);
    console.log(filteredData);
  
    // Fill tbody with filteredData
    //###############################################################
    var tbody = d3.select("tbody");
    
    tbody.html(" ");
    
    filteredData.forEach((f) => {
        console.log(f);
        var row = tbody.append("tr");
        Object.entries(f).forEach(([key, value]) => {
          var cell = row.append("td");
          cell.text(value);
        });
      });

  }