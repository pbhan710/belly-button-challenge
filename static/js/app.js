const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

const promiseSamples = d3.json(url);

promiseSamples.then(function(data) {
    console.log(data);
})