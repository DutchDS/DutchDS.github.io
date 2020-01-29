// Get a reference to the page tags
//##################################
var submit_all = d3.select("#submit-all");
// var get_date = d3.select("#submit-all");
var get_all = d3.select("#get-all");
var tableData = data;
var inputValue = d3.select("#selectDate")

// Load initial results
// ####################

load_all()

// Three functions that will be used on this page
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

  // Create empty arrays to store all date values
  var listDates = [];

  // Iterate through each Data record and fill LongLists
tableData.forEach((r) => {
  listDates.push(r.datetime);
});

// Function to go through each list and create a short list by removing duplicates
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

// Call functions and sort results
shortDates = uniqueValues(listDates);
console.log(shortDates);

// Fill dropdown boxes when page is refreshed
function loadDropDowns(myId, myshortList) {
  // var tbody = d3.select("tbody");
  var inputDate = d3.select(myId) 
 
  inputDate.html(" ");

  console.log(myshortList);
  
  myshortList.forEach((f) => {
    console.log(f);
    var cell = inputDate.append("option")
    cell.text(f);

    });
  };

  // Fill dropdowns with shortLists
  loadDropDowns("#selectDate",shortDates);

  function load_select() {
    d3.event.preventDefault();

    var inputElement = d3.select("#selectDate");
    console.log(inputElement);
  
    var inputValue = inputElement.property("value");
    console.log(inputValue);
  
    // if (!inputValue) {inputValue = '1/1/2010';}
  
  
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
get_all.on("click", function() {load_all()});

  
// Define what to do when 'search for specific date' is clicked
// #################################################################
submit_all.on("click", function() {load_select()});