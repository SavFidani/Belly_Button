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
  })} // init function end

  init();

  function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);

  }; // optionChanged end

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
    }) // close d3.json 
} // build Metadata ends

  // 1. Create the buildCharts function.
  function buildCharts(sample) {
    // 2. Use d3.json to load and retrieve the samples.json file 
    d3.json("samples.json").then((data) => {
        console.log(data)
      // 3. Create a variable that holds the samples array. 
      var samples = data.samples;
      var metadata = data.metadata;
      //console.log(samples);
      
      // 4. Create a variable that filters the samples for the object with the desired sample number.
      var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
      
      // 1. Create a variable that filters the metadata array for the object with the desired sample number.
      var metadataArray = metadata.filter(sampleObj => sampleObj.id == sample);

      //  5. Create a variable that holds the first sample in the array.
      var result = resultArray[0];

      //2. Create a variable that holds the first sample in the metadata array.
      var metadata = metadataArray[0];

      // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
      var otu_ids = result.otu_ids;
      var otu_labels = result.otu_labels;
      var sample_values = result.sample_values;


  // 7. Create the yticks for the bar chart.
      // Hint: Get the the top 10 otu_ids and map them in descending order  
      //  so the otu_ids with the most bacteria are last. 
      var yticks = otu_ids.map(number => "OTU" + number).slice(0,10).reverse();
      // 8. Create the trace for the bar chart. 
      var barData = [{
        x: sample_values,
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
  var trace = [{
    x: otu_ids,
    y: sample_values,
    text: [otu_labels],
    mode: 'markers',
    marker: {
      size: [400, 600, 800, 1000],
      sizemode: 'area'
    }
  }];

  var bubbleData = [trace];

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
   var wfreq = result.wfreq;
   var wfreq_transformed = parseFloat(wfreq);

    // 4. Create the trace for the gauge chart.
    var gaugeData = [ 
        {
    type: "indicator",
    mode: "gauge+number",
    value: 2,
    title: { text: "Belly Button Washing Frequency", font: { size: 24 } },
    delta: { reference: 0, increasing: { color: "black" } },
    gauge: {
      axis: { range: [null, 10], tickwidth: 1, tickcolor: "black" },
      bar: { color: "black" },
      bgcolor: "white",
      borderwidth: 2,
      bordercolor: "white",
      steps: [
        { range: [0, 2], color: "red" },
        { range: [2, 4], color: "orange" },
        { range: [4, 6], color: "yellow"},
        { range: [6, 8], color: "lightGreen"},
        { range: [8, 10], color: "green"},
      ],
      threshold: {
        line: { color: "black", width: 4 },
        thickness: 0.75,
        value: 490
      }
    }
  }

     
   ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
        width: 500,
        height: 400,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        paper_bgcolor: "white",
        font: { color: "black", family: "Arial" }
    };

    // 6. Use Plotly to plot the gauge data and layout.
   Plotly.newPlot(gauge, gaugeData, gaugeLayout);


    });


    

};

