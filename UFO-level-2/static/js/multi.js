// Get a reference to the page tags
//##################################
var submit_all = d3.select("#submit-all");
var get_all = d3.select("#get-all");
var get_state = d3.select("#selectState");
var get_city = d3.select("#selectCity");
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

// Lastly Filter result set when a filter is chosen from the dropdownboxes
  function load_select(myId,myField) {
    d3.event.preventDefault();

    var inputElement = d3.select(myId);
    console.log(inputElement);
  
    var inputValue = inputElement.property("value");
    console.log(inputValue);
  
    // if (!inputValue) {inputValue = '1/1/2010';}
  
  
    var filteredData = tableData.filter(tableData => {
          // if (myField = "State") {
          // return tableData.state == inputValue};
          if (myField = "City") {
          return tableData.city == inputValue};  
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

get_state.on("click", function() {load_select("#selectState", "State")});
get_city.on("click", function() {load_select("#selectCity", "City")});

  // Define what to do when 'get all sightings' date is clicked
//###########################################################
// get_all.on("click", function() {load_all()});

  
// Define what to do when 'search for specific date' is clicked
// #################################################################
// submit_all.on("click", function() {load_select()});