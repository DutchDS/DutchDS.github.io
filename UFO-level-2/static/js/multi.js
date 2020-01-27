// Get a reference to the page tags
//##################################
var submit_all = d3.select("#submit-all");
var get_all = d3.select("#get-all");
var tableData = data;
var inputValue = d3.select("datetime-form-input")
var inputDate = d3.select("datetime-form-input")
var inputCity = d3.select("datetime-form-input")
var inputState = d3.select("datetime-form-input")
var inputCountry = d3.select("datetime-form-input")
var inputShape = d3.select("datetime-form-input")

// Load initial results
// ####################
load_all()

// Two functions that will be used on this page
// ############################################

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

  function load_select() {
    d3.event.preventDefault();

    var inputElement = d3.select("#datetime-form-input");
    console.log(inputElement);
  
    var inputValue = inputElement.property("value");
    console.log(inputValue);
  
    if (!inputValue) {inputValue = '1/1/2010';}
  
  
    var filteredData = tableData.filter(tableData => {
          return tableData.datetime == inputValue;
        });
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

// Define what to do when 'get all sightings' date is clicked
//###########################################################
// get_all.on("click", function() {load_all()});

  
// Define what to do when 'search for specific date' is clicked
// #################################################################
submit_all.on("click", function() {load_select()});

// Create empty arrays to store each list of values
var listDates = [];
var listCities = [];
var listStates = [];
var listCountries = [];
var listShapes = [];

// Iterate through each recipe object

tableData.forEach((r) => {
  listDates.push(r.datetime);
  listCities.push(r.city);
  listStates.push(r.state);
  listCountries.push(r.country);
  listShapes.push(r.shape)
})

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
