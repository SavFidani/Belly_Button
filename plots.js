//console.log(cityGrowths);

//Sort the cities in descending order of pop. growth
//var sortedCities = cityGrowths.sort((a,b) => a.Increase_from_2016 - b.Increase_from_2016).reverse();
//console.log(sortedCities);
//Select top 5 cities for growth
//var topFiveCities = sortedCities.slice(0,5);
//console.log(topFiveCities);
//Create separate arrays for names and growth
// parseInt converts strings into integers
//var topFiveCityNames = topFiveCities.map(city => city.City);
//var topFiveCityGrowths = topFiveCities.map(city => parseInt(city.Increase_from_2016));
//Create bar charts with these arrays 
//var trace = {
  //  x: topFiveCityNames,
  //  y: topFiveCityGrowths,
  //  type: "bar"
  //};
  //var data = [trace];
  //var layout = {
    //title: "Most Rapidly Growing Cities",
    //xaxis: {title: "City" },
    //yaxis: {title: "Population Growth, 2016-2017"}
  //};
  //Plotly.newPlot("bar-plot", data, layout);

  //function init() {
    //data = [{
      //x: [1, 2, 3, 4, 5],
      //y: [1, 2, 4, 8, 16] 
    //}];
    //Plotly.newPlot("plot", data);
  //};
  
  //d3.selectAll("#dropdownMenu").on("change", updatePlotly);
  //function updatePlotly() {
    //var dropdownMenu = d3.select("#dropdownMenu");
    //var dataset = dropdownMenu.property("value");
  
    //var xData = [1, 2, 3, 4, 5];
    //var yData = [];
  
    //if (dataset === 'dataset1') {
      //yData = [1, 2, 4, 8, 16];
    //};
  
    //if (dataset === 'dataset2') {
      //yData = [1, 10, 100, 1000, 10000];
    //};
  
    //var trace = {
      //x: [xData],
      //y: [yData],
    //};
    //Plotly.restyle("plot", trace);
  //};
  
  //init();
 
  function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
  
  init();
  
  function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
  }

  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(key + ': ' + value);
      });

    });
  }
