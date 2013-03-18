var width = 960,
    height = 500,
    
var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height);
var defs=svg.append("defs");
var vis=svg
    .append("g");

init();


function init() {
}

vis.append("circle").attr({x:100,y:100,r:20}).style({fill:"none",stroke:"black"});
vis.append("circle").attr({x:100,y:100,r:17}).style({fill:"black",stroke:"none"});