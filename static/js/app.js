// Store in constant the URL of samples.json.
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Obtain and store in constant a Promise object from the samples.json URL.
const promiseObject = d3.json(url);

// Define an initiate function.
function init() {
    // 
    populateDropdown();
}

// Define a function to populate the test subject ID dropdown.
function populateDropdown() {
    // Fetch JSON results from the Promise.
    promiseObject.then(function(result) {
        // Store names array in variable.
        let names = result.names;

        // Loop through names array and append each ID to the dropdown.
        for (i = 0; i < names.length; i++) {
            // Select the dropdown and append an option tag with the ID.
            let dropdownOption = d3.select("#selDataset").append("option")
            // Assign the ID itself as the text to the appended option tag.
            dropdownOption.text(names[i])
        }
    })
}

init()