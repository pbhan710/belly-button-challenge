// Store in constant the URL of samples.json.
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Obtain and store in constant a Promise object from the samples.json URL.
const promiseObject = d3.json(url);

// Define an initiate function.
function init() {
    // Populate the test subject ID dropdown
    populateDropdown();

    // Fetch JSON results from the Promise object.
    promiseObject.then(function(result) {
        // Store arrays in variables.
        let names = result.names;
        let samples = result.samples;

        // Plot top 10 OTUs horizontal bar chart from first test subject ID.
        plotTop10OTUs(0);
    })
}

// Define a function to plot the top 10 OTUs horizontal bar chart.
function plotTop10OTUs (index) {
    // Fetch JSON results from the Promise object.
    promiseObject.then(function(result) {
        // Store the index's sample array and its keys for plotting in variables.
        let sample = result.samples[index];
        let otuIDs = sample.otu_ids;
        let values = sample.sample_values;
        let otuLabels = sample.otu_labels;

        // Store Plotly objects for plotting.
        let data = [{
            type: "bar",
            x: sample.sample_values,
            y: sample.otu_ids,
            orientation: "h"
        }];

        // Plot the horizontal bar chart.
        Plotly.newPlot("bar", data);
    })
}

// Define a function to populate the test subject ID dropdown.
function populateDropdown() {
    // Fetch JSON results from the Promise object.
    promiseObject.then(function(result) {
        // Store names array in a variable.
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