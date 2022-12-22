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
        // Store the first array's ID.
        let firstID = result.names[0];

        // Populate Demographic Info of first test subject ID.
        populateDemographics(firstID);
        // Plot top 10 OTUs horizontal bar chart from first test subject ID.
        plotTop10OTUs(firstID);
        // Plot bubble chart that displays each sample of first test subject ID.
        plotSamplesBubbleChart(firstID);
    });
};

// Define a function to populate the test subject ID dropdown.
function populateDropdown() {
    // Fetch JSON results from the Promise object.
    promiseObject.then(function(result) {
        // Store names array in a variable.
        let names = result.names;

        // Loop through names array and append each ID to the dropdown.
        for (let i = 0; i < names.length; i++) {
            // Select the dropdown with the ID and append an option tag.
            let dropdownOption = d3.select("#selDataset").append("option");
            // Assign the ID itself as the text to the appended option tag.
            dropdownOption.text(names[i]);
        };
    });
};

// Define a function to populate the Demographic Info card.
function populateDemographics(ID) {
    // Fetch JSON results from the Promise object.
    promiseObject.then(function(result) {
        // Find the index of the ID.
        let indexID = result.names.findIndex(x => x === ID);
        // Store the ID's metadata field in a variable.
        let metadata = result.metadata[indexID];

        // Loop through each key in the sample's metadata to add to the Demographic Info card.
        for (let key in metadata) {
            // Select the card with the ID and append a <p> tag.
            let demographicInfo = d3.select("#sample-metadata").append("p");
            // Assign the key and value to the appended <p> tag.
            demographicInfo.text(`${key}: ${metadata[key]}`);
        };
    });
};

// Define a function to plot the top 10 OTUs horizontal bar chart.
function plotTop10OTUs(ID) {
    // Fetch JSON results from the Promise object.
    promiseObject.then(function(result) {
        // Find the index of the ID.
        let indexID = result.names.findIndex(x => x === ID);
        // Store the ID's sample array and its keys for plotting in variables, 10 top only.
        let sample = result.samples[indexID];
        let otuIDs = sample.otu_ids.slice(0, 10).map(item => `OTU ${item}`);
        let values = sample.sample_values.slice(0, 10);
        let otuLabels = sample.otu_labels.slice(0, 10);

        // Store Plotly objects for plotting.
        let data = [{
            type: "bar",
            x: values,
            y: otuIDs,
            text: otuLabels,
            orientation: "h",
            transforms: [{
                type: "sort",
                target: "x",
                order: "ascending"
            }]
        }];

        let layout = {
            title: `Top 10 OTUs for Test Subject ID ${sample.id}`   // Add title to chart.
        };

        // Plot the horizontal bar chart.
        Plotly.newPlot("bar", data, layout);
    });
};

// Define a function to plot each sample in a bubble chart.
function plotSamplesBubbleChart (ID) {
    promiseObject.then(function(result) {
        // Find the index of the ID.
        let indexID = result.names.findIndex(x => x === ID);
        // Store the ID's sample array and its keys for plotting in variables.
        let sample = result.samples[indexID];
        let otuIDs = sample.otu_ids;
        let values = sample.sample_values;
        let otuLabels = sample.otu_labels;

        // Store Plotly objects for plotting.
        let data = [{
            x: otuIDs,
            y: values,
            text: otuLabels,
            mode: "markers",
            marker: {
                color: otuIDs,
                colorscale: "Earth",
                size: values,
                sizeref: 1.5,
                sizemin: 2
            }
        }];

        let layout = {
            title: `Test Subject ID ${sample.id}'s Samples`   // Add title to chart.
        };

        // Plot the bubble chart.
        Plotly.newPlot("bubble", data, layout);
    });
};

// Define a function to update the Demographic Info and charts when choosing another sample through the dropdown. 
function optionChanged(ID) {
    // Update the Demographic Info card.
    d3.selectAll("p").remove(); // Delete existing <p> tags within the card.
    populateDemographics(ID);   // Update the Demographic Info card with ID.

    // Update charts.
    plotTop10OTUs(ID);
    plotSamplesBubbleChart(ID);
};

// Initialize upon launching.
init();