
var color = d3.scale.linear()
	.domain([0,.5, 1])//d3.max(data)])
	//.range(["#eee","#ECFAFE", "#066E88"]); 
	.range(["blue","#ffe", "pink"]); 

var force = d3.layout.force()
	.charge(0)
	.gravity(0)
	.size([960, 500]);

var svg = d3.select("#chart").append("svg")
	.attr("width", 960 + 100)
	.attr("height", 500 + 100)
	.append("g")
	.attr("transform", "translate(50,50)");
svg.append("rect").attr("x",-50).attr("y",-50).attr("width",1060).attr("height",500).style("fill","#C5F1FC");




var project = d3.geo.mercator()
	.scale(11794.153738328792)
	.translate([423.2540802357471, 1964.0133485087608]),//albers(),
idToNode = {},
links = [];
nodes=[];
d3.csv("pariteFM.csv",function(csv){
	console.log(csv.length);
	csv.forEach(function(c) {
		var xy=project([+c.lon,+c.lat]);
		
		idToNode[c.cir]={
			x:xy[0]+Math.random(),
			y:xy[1]+Math.random(),
			gravity:{x:xy[0],y:xy[1]},
			r: 8,
			value:c.chance,
			name:c.cir
		};
		nodes.push(idToNode[c.cir]);

	})
	svg.selectAll("circle")
		.data(nodes)
		.enter().append("circle")
		.style("fill", function(d) { return color(d.value || 0); })
		.attr("cx", function(d) { return d.x; })
		.attr("cy", function(d) { return d.y; })
		.attr("r", function(d, i) { return d.r; })
		.append("title").text(function(d) {return d.name;})
	force.start();

	force
		.nodes(nodes)
		.links(links)
		.start()
		.on("tick", function(e) {
			var k = e.alpha,
			kg = k * 0.01;
			nodes.forEach(function(a, i) {
				// Apply gravity forces.
				a.x += (a.gravity.x - a.x) * kg;
				a.y += (a.gravity.y - a.y) * kg;
				nodes.slice(i + 1).forEach(function(b) {
					// Check for collisions.
					var dx = a.x - b.x,
					dy = a.y - b.y,
					l = Math.sqrt(dx * dx + dy * dy),
					d = a.r + b.r;
					if (l < d) {
						l = (l - d) / l * k;
						dx *= l;
						dy *= l;
						a.x -= dx;
						a.y -= dy;
						b.x += dx;
						b.y += dy;
					}
				});
			});
			svg.selectAll("circle")
				.attr("cx", function(d) { return d.x; })
				.attr("cy", function(d) { return d.y; });
		});

//$('circle').tipsy({html: true, gravity: 's'});	
})

