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

  // 1. Create the buildCharts function.
  function buildCharts(sample) {
    // 2. Use d3.json to load and retrieve the samples.json file 
    d3.json("samples.json").then((data) => {
      // 3. Create a variable that holds the samples array. 
      var sampleData = data.metadata;
      // 4. Create a variable that filters the samples for the object with the desired sample number.
      var sampleArray = metadata.filter(sampleObj => sampleObj.id == sample);
      //  5. Create a variable that holds the first sample in the array.
      var sampleResult = sampleArray[0];
      // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
      var sampleValues = (sampleResult.sample_values);
      var otuId = (sampleResult.otu_ids);
      var otuLabels = (sampleResult.otu_labels);
      console.log(sample_values);

    });


      // 7. Create the yticks for the bar chart.
      // Hint: Get the the top 10 otu_ids and map them in descending order  
      //  so the otu_ids with the most bacteria are last. 
      var yticks = otuId.map(number => "OTU" + number).slice(0,10).reverse();
      // 8. Create the trace for the bar chart. 
      var barData = [{
        x: sampleValues,
        y: yticks,
        type: "bar",
        orientation: "h"
      }];
      // 9. Create the layout for the bar chart. 
      var barLayout = {
       title: "Top 10 Bacteria Cultures Found",
       yaxis: {autorange: 'reversed'}
      };
      // 10. Use Plotly to plot the data with the layout. 
      Plotly.newPlot("bar", barData, barLayout)

  //DELIVERABLE 2
  // 1. Create the trace for the bubble chart.
  var trace1 = [{
    x: 'otuIds',
    y: 'sampleLabels',
    text: ['otuLabels'],
    mode: 'markers',
    marker: {
      size: [400, 600, 800, 1000],
      sizemode: 'area'
    }
  }];

  var bubbleData = [trace1];

  // 2. Create the layout for the bubble chart.
  var bubbleLayout = { 
  title: 'Top 10 Bacteria Cultures Found',
  showlegend: false,
  height: 600,
  width: 600
  };

  // 3. Use Plotly to plot the data with the layout.
  Plotly.newPlot(bubble , bubbleData, bubbleLayout); 

 // };

  //DELIVERABLE 3

    // 3. Create a variable that holds the washing frequency.
   var washFreq = ()
    // Create the yticks for the bar chart.

    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot();
    
    // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot();
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
     
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
     
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot();

};
});   
};
} 