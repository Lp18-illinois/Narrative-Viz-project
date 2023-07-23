<script>
// set the dimensions and margins of the graph
var margin = {top: 50, right: 50, bottom: 50, left: 100},
     width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
  d3.csv("https://raw.githubusercontent.com/Lp18-illinois/Narrative-Viz-project/main/us-states.csv", 

  function(data) {  
    data.forEach(function(d) {
       d.date = d3.timeParse("%Y-%m-%d")(d.date);
       d.cases = new Number(d.cases);});
  
// List of unique states
//    var allStates = d3.map(data, function(d){return(d.state);}).keys().sort()
      var allStates = ["California","New York","Florida","Texas"]

// Define scales 
    const xScale = d3.scaleTime().domain(d3.extent(data, function(d) {return d.date;})).range([0,width]);
    const yScale = d3.scaleLinear().domain(d3.extent(data, function(d) {return d.cases;})).range([height,0]);
    const stColor = d3.scaleOrdinal().domain(allStates).range(d3.schemeSet2);
    
    const lineGen = d3.line()
                      .x(d => xScale(d.date))
                      .y(d => yScale(d.cases));

// xAxis and yAxis 
    xAxis = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));
 
    yAxis = svg.append("g")
        .call(d3.axisLeft(yScale));

    var dataFilter = data.filter(function(d){return d.state==allStates[0];})

 // Add a line variable
    var line = svg.append("path");

    line
       .datum(dataFilter)
       .attr("fill", "none")
       .attr("stroke", function(d){return stColor(allStates);})
       .attr("stroke-width", 3)
       .transition()
       .duration(1000)
       .attr("d", lineGen);

})

</script>
