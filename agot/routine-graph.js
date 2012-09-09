var json={nodes:nodes,links:links};
var width = 960,
    height = 500;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-120)
    .linkDistance(15)  
    .gravity(.2)
    .size([width, height]);

var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height);

var cScale=d3.scale.linear().domain([0,343]).range([0,940]);
svg2=d3.select("#legend").append("svg:svg").attr("width",940).attr("height",30);
svg2.selectAll("rect").data(books).enter().append("svg:rect")
	.attr("x",function(d) {return cScale(d.first);}) 
	.attr("width",function(d) {return cScale(d.last)-cScale(d.first);})
	.attr("y",0)
	.attr("height",30)
	.style("stroke","#fafafb")
	.style("fill",function(d,i) {return i%2?"white":"#fafafb";})
;
svg2.selectAll("text").data(books).enter().append("svg:text")
	.attr("x",function(d) {return cScale((d.first+d.last)/2);})
	.attr("y",20)
	.style("font-style","italic")
	.attr("text-anchor","middle")
	.text(function(d) {return d.title;})
;


var i=0;
var slider=d3.select("#slider");
init();


var timer=setInterval("play()", 50);
d3.select("#slider").on("change",function() {clearInterval(timer);i=this.value;start(i);})




function init() {
	force
		.nodes(json.nodes)
		.links(json.links)
		.start();
	
	var link = svg.selectAll("line.link")
		.data(json.links)
		.enter().append("line")
		.attr("class", "link")
		.style("stroke",function(d) {return (d.mode?(d.mode==1?"blue":"orange"):"brown");})
		.style("stroke-width", function(d) { return Math.sqrt(d.value); })
		.style("visibility", "hidden")
		//.style("stroke-opacity",.1)
		;
	link.append("title")
		.text(function(d) {return d.source.name+"->"+d.target.name+" ("+d.chapterId+")";});
			
	var node = svg.selectAll("circle.node")
		.data(json.nodes)
		.enter().append("circle")
		.attr("class", "node")
		.attr("r", 0)
		.style("fill", function(d) { return color(d.region); })
		.style("visibility", "hidden")
		.call(force.drag);
	
	node.append("title")
		.text(function(d) { return d.name; });
	
	force.on("tick", function() {
		link.attr("x1", function(d) { return d.source.x; })
		    .attr("y1", function(d) { return d.source.y; })
		    .attr("x2", function(d) { return d.target.x; })
	  	    .attr("y2", function(d) { return d.target.y; });
	
		node.attr("cx", function(d) { return d.x; })
		    .attr("cy", function(d) { return d.y; });
	  });

	
	start(0);
}
function start(i) {
	var link = svg.selectAll("line.link")
 	     .style("visibility", function(d) {return d.chapterId<=i?"visible":"hidden";})
 	var node = svg.selectAll("circle.node")
 	     .attr("r", function(d) {return 3*Math.sqrt(d.visits.filter(function(v) {return v<=i;}).length);})
 	     .style("opacity", function(d) {return d3.max([.25,1-.02*(i-d.lastSeen)]);})
 	     .style("stroke",function(d) {return d.lastSeen==i?"black":"white";})
 	     .style("visibility", function(d) {return d.firstSeen<=i?"visible":"hidden";})
}


function play() {
	if(i<343){i++;
	slider.property("value",i);
	start(i);}	
}
