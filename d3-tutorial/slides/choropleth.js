var data; // loaded asynchronously

var projection = d3.geo.azimuthal()
    .mode("equidistant")
    .origin([-98, 38])
    .scale(1300)
    .translate([450, 300]);

//var path = d3.geo.path();
var path = d3.geo.path().projection(projection);

var svg = d3.select("#chart")
  .append("svg");

var counties = svg.append("g")
    .attr("id", "counties")
    .attr("class", "Blues");

var states = svg.append("g")
    .attr("id", "states");

d3.json("data/us-counties.json", function(json) {
  counties.selectAll("path")
      .data(json.features)
    .enter().append("path")
      .attr("class", data ? quantize : null)
      .attr("d", path)
      .on("mouseover", function() {
          d3.select(this).style("fill", "red");
      })
      .on("mouseout", function() {
          d3.select(this).style("fill", null);
      });
});

d3.json("data/us-states.json", function(json) {
  states.selectAll("path")
      .data(json.features)
    .enter().append("path")
      .attr("d", path);
});

d3.json("unemployment.json", function(json) {
  data = json;
  counties.selectAll("path")
      .attr("class", quantize);
});

function quantize(d) {
  return "q" + Math.min(8, ~~(data[d.id] * 9 / 12)) + "-9";
}
