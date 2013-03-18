(function() {
	var width=960,height=800,padding=0;
	pan={}
	pan.data=[];
	pan.selection=[];
	pan.dhash={};
	
	var regions=["americas","europe","japan","asiapacific","global"];
	var regionHash={"Americas":"americas","Europe":"europe","Japan":"japan","Asia/Pacific":"asiapacific","Worldwide":"global"}
	var categories=["networking","media","general-internet","collaboration","business-systems"];
	var technologies=["client-server","browser-based","peer-to-peer","network-protocol"];
	var riskColors={"-":"#ccc",1:"#67A2B9",2:"#A7C439",3:"#FFC425",4:"#F6851F",5:"#CD383F"};
	var catxy={"networking":[354,136],"media":[620,136],"general-internet":[282,365],"collaboration":[506,375],"business-systems":[748,375]};
	var techxy={"client-server":[304,136],"browser-based":[570,136],"peer-to-peer":[304,375],"network-protocol":[570,375]};
	
	var p_rand=function(n) {return Math.floor(Math.random()*n);}
	
	var srsly=function(b) {return Math.floor(+b/1000000)} // the packing function is not good with very large numbers.
	pan.filter = function(criteria) {
		// criteria will be an object with keys as a subset of those of data.
		// to be kept in the selection, for every key of criteria, a record must have the value corresponding to that key.
		pan.dhash={};
		if(typeof(criteria)==="undefined") {pan.selection=pan.data.slice(0)} else {
		pan.selection=pan.data.filter(function(d) {
			var keep=true;
			d3.keys(criteria).some(function(k) {
				if (d[k]!=criteria[k]) {
					keep=false;
					return true; // exit loop
				}
			});
			return keep;
		})}
		pan.selection.forEach(function(d,i) {
			pan.dhash[d.id]=i;
		})
		pan.computePos();
	}

	var iPack = function (a,r,cx,cy) {
	// a is an array of numbers

	// this function is a trimmed down version of the packed circle layout algorithm. 
	// what it does is turn a set of numbers into a set of elements that determine a circle. 

	// optional: r radius of the packed circle,x-y its center

	var s=r||500;
	var x=cx||r/2;
	var y=cy||r/2
	var nodes=a.map(function(d,i) {return {value:+d};})
	var tree={name:"root",children:nodes};
	var pack=d3.layout.pack()
	.size([s,s])
	//.sort(d3.ascending)
	//.sort(function() {return Math.random()-.5})
	.sort(d3.descending)
	.value(function(d) {return d.value;})(tree);
	return pack.slice(1).map(function(d){return {d:d,r:d.r,k:(s/2)/d.r,x:d.x-s/2+x,y:d.y-s/2+y};})
	}

	pan.computePos=function() {

		// general case

		// we set aside the tiniest circles for now else they will upset the general layout greatly.

		// we give them a default value
		pan.selection.forEach(function(d,i) {
			d.pos=[{x:445,y:253,r:0,tx:445,ty:253},{x:445,y:253,r:0,tx:445,ty:253},{x:445,y:253,r:0,tx:445,ty:253},{x:445,y:253,r:0,tx:445,ty:253}];
		})

		// and calculate the position of the other. 100 is arbitrary large, we may try other values.
		// noting that there are 26 circles in the mockup, and circa 1300 data items in the dataset.

		var largeenough=pan.selection.slice(0);
		largeenough.sort(function(a,b) {return b.bandwidth-a.bandwidth}).slice(0,100);


		var c1=largeenough.map(function(d) {return srsly(d.bandwidth);})
		var pos1=iPack(c1,415,445,253);

		largeenough.forEach(function(d,i) {
			pan.selection[pan.dhash[d.id]].pos[0]=pos1[i];
			pan.selection[pan.dhash[d.id]].pos[0].tx=445,
			pan.selection[pan.dhash[d.id]].pos[0].ty=253;
		})

		// now by category

		// preliminary step: we compute sizes of the various category totals
		var catsum=d3.nest()	
			.key(function(d) {return d.category;})
			.rollup(function(d) {return d3.sum(d,function(e) {return srsly(d.bandwidth);})})
			.map(pan.selection);

		// {"Networking":10000, "Media":25000, "General Internet":5000, "Collaboration":100000, "Business system",50000}

		var catsum1=categories.map(function(c) {return catsum[c];})

		// [10000,25000,5000,100000,50000]
		var catsum2=iPack(catsum1,500,0,0)
		// [{r:50,k:...,x:...,y:...},{r:100,...}]
		var catsum3={};
		categories.forEach(function(c,i) {catsum3[c]=1*catsum2[i].r;})
		// {"Networking":50, "Media":100, ...}


		categories.forEach(function(cat) {
			var scat=pan.selection.filter(function(d) {return d.category==cat;})
			var scat_val=scat.map(function(d) {return srsly(d.bandwidth);})
			var pos_scat=iPack(scat_val,catsum3[cat],catxy[cat][0],catxy[cat][1]);
			scat.forEach(function(d,j) {
				var i=pan.dhash[d.id];
				pan.selection[i].pos[1]=(pos_scat[j])
				pan.selection[i].pos[1].r=pan.selection[i].pos[1].r/3
				pan.selection[i].pos[1].tx=catxy[cat][0]
				pan.selection[i].pos[1].ty=catxy[cat][1]
			})
		})

		// and by tech
		// similar first step
		var techsum=d3.nest()	
			.key(function(d) {return d.technology;})
			.rollup(function(d) {return d3.sum(d,function(e) {return srsly(e.bandwidth);})})
			.map(pan.selection);

		// {"Networking":10000, "Media":25000, "General Internet":5000, "Collaboration":100000, "Business system",50000}

		var techsum1=technologies.map(function(c) {return techsum[c];})

		// [10000,25000,5000,100000,50000]
		var techsum2=iPack(techsum1,500,0,0)
		// [{r:50,k:...,x:...,y:...},{r:100,...}]
		var techsum3={};
		technologies.forEach(function(t,i) {techsum3[t]=2*techsum2[i].r;})


		technologies.forEach(function(tech) {
			var stech=pan.selection.filter(function(d) {return d.technology==tech;})
			var stech_val=stech.map(function(d) {return srsly(d.bandwidth);})
			var pos_stech=iPack(stech_val,techsum3[tech],techxy[tech][0],techxy[tech][1]);
			stech.forEach(function(d,j) {
				var i=pan.dhash[d.id];
				pan.selection[i].pos[2]=(pos_stech[j])
				pan.selection[i].pos[2].tx=techxy[tech][0]
				pan.selection[i].pos[2].ty=techxy[tech][1]
			})
		})

		// finally, scatterplot category/frequency

		var rScale=d3.scale.linear().domain([0,1000000000]).range([1,20]);
		var xScale=d3.scale.linear().domain([0,1]).range([100,800]);
		var yScale={};
		categories.forEach(function(cat,i) {yScale[cat]=50+i*100;} );
		yScale["0"]=-200;yScale["unknown-tcp"]=-200,yScale["unknown-udp"]=-200;


		pan.selection.forEach(function(d) {
			d.pos[3]=({x:xScale(d.frequency), r:rScale(srsly(d.bandwidth)), y:yScale[d.category]})
		})

	}

	pan.gendata= function() {
		pan.data=d3.range(500).map(function(i) 
			{var d={id:i,
				region: regions[p_rand(5)],
				application: p_rand(5),
				category: categories[p_rand(5)],
				technology: technologies[p_rand(4)],
				frequency: 10+p_rand(80),
				bandwidth: (10+p_rand(900))*(10+p_rand(900)),
				risk:p_rand(5)+1
			};
			return d;
		})
		pan.filter();

	}

	pan.readdata=function(file) {
		d3.csv(file,function(error,csv) {
			pan.data=[];
			csv.forEach(function(d,i) {
				pan.data[i]=d;
				pan.data[i].id=i;
			})
			pan.filter(pan.criteria)
			pan.drawview1()	
		})
		
		
	}

	pan.drawview1 = function(m) {
		var mode=m||0;

		// we are going to store all the relevant information in the flat nodes variable
		// rather than look in the relevant node
		pan.force.stop();
		var nodes=pan.selection.slice(0)
		nodes.forEach(function(d,i) {
			var p=pan.selection[i].pos[mode];
			d3.keys(p).forEach(function(k) {
				nodes[i][k]=p[k];
			})
		})
		var psb=pan.svg.select("#back")
		psb.selectAll("*").remove();
		if(mode<3) {
			psb.append("text").text("Size of circle indicates").attr({x:100,y:250,"text-anchor":"middle"})
			psb.append("text").text("total bandwidth occupied").attr({x:100,y:262,"text-anchor":"middle"})
			psb.append("text").text("color indicates").attr({x:100,y:400,"text-anchor":"middle"})
			psb.append("text").text("application risk level").attr({x:100,y:412,"text-anchor":"middle"})
			psb.selectAll("rect").data(d3.range(5)).enter().append("rect")
				.attr({y:430,x:function(d,i) {return 25+30*i},
					rx:2,ry:2,width:28,height:20})
					.style("fill",function(d,i) {return riskColors[i+1]})
			psb.selectAll("circle").data([10,20,50]).enter().append("circle")
				.attr({cx:100,cy:function(d) {return 380-d},r:String})
				.style({fill:"none","stroke-width":2,stroke:"#ccc","stroke-dasharray":"2 2"})
			psb.append("text").text("Low risk").style("fill","#ccc").attr({x:25,y:480,"text-anchor":"middle"})
			psb.append("text").text("High risk").style("fill","#ccc").attr({x:173,y:480,"text-anchor":"middle"})
			
				
		}
		var circles=pan.svg.selectAll(".circles").data(nodes);
		circles.exit().transition().style("opacity",0).remove();
		circles.enter()
			.append("circle")
			.attr({
					cx:function(d) {return d.x},
					cy:function(d) {return d.y},
					 r:function(d) {return d.r},
					id:function(d) {return "c"+d.id},
				 class:function(d) {return "circles cat"+d.category+" tech"+d.technology}
			})
			.style({stroke:"none",fill:function(d) {return riskColors[d.risk]}})

		circles=pan.svg.selectAll(".circles").data(nodes);
		circles.transition().attr({
					cx:function(d) {return d.x},
					cy:function(d) {return d.y},
					 r:function(d) {return d.r}
			})
			.style({stroke:"none",fill:function(d) {return riskColors[d.risk]}})


		// if the mode is not 3, we are using a force layout to complement the initial packing algorithm
		if (mode<3) {
			pan.force
				.nodes(nodes)
				.on("tick",tick)
				.start();
			//circles=pan.svg.selectAll(".circles").data(nodes);
			function tick(e) {
				circles.each(gravity(e.alpha*.1))
					.each(collide(.5))
					.attr({cx:function(d) {return d.x;},cy:function(d) {return d.y;}})
			}

			function gravity(k) {
				return function(d) {
					if (typeof(d.tx)!=="undefined") {
						d.x=d.x+(d.tx-d.x)*k;
						d.y=d.y+(d.ty-d.y)*k;
					}
				};
			}

			function collide(k) {
				var q=d3.geom.quadtree(nodes);
				return function(node) {
					var nr= node.r+padding,
						nx1=node.x -nr,
						nx2=node.x +nr,
						ny1=node.y -nr,
						ny2=node.y +nr;
					q.visit(function(quad,x1,y1,x2,y2) {
						if (quad.point && (quad.point !== node )) {
							var x=node.x-quad.point.x,
								y=node.y-quad.point.y,
								l=x*x+y*y,
								r=nr+quad.point.r;

							if (l<r*r) {
								l = ((l = Math.sqrt(l)) - r) / l * k;
					            node.x -= x *= l;
					            node.y -= y *= l;
					            quad.point.x += x;
					            quad.point.y += y;
							}
						}
						return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
					});
				};
			}

		}

	}

	pan.view1 = function(id,file) {
		if(!id) {id="#chart"}
		pan.id=id;
		if(!file) {file="includes/data.csv"}
	
		pan.svg=d3.select(id).selectAll("svg").data([0]).enter()
			.append("svg").attr({width:pan.width,height:pan.height})
		pan.svg.selectAll("*").remove();
		pan.svg.append("g").attr("id","back");
		pan.force = d3.layout.force()
			    .charge(0)
			    .gravity(0)
			    .size([pan.width, pan.height]);
		//pan.gendata(); // will be replaced by pan.readdata(file) when data will be provided
		pan.criteria={region:"global"}
		pan.readdata(file)
		pan.mode=0;
		d3.select("#all").on("click",function() {
			d3.select("#view_selection").selectAll("a").classed("active",0);
			d3.select(this).classed("active",1);
			pan.mode=0;
			pan.drawview1(pan.mode);
		})

		d3.select("#category").on("click",function() {
			d3.select("#view_selection").selectAll("a").classed("active",0);
			d3.select(this).classed("active",1);
			pan.mode=1;
			pan.drawview1(pan.mode);
		})

		d3.select("#technology").on("click",function() {
			d3.select("#view_selection").selectAll("a").classed("active",0);
			d3.select(this).classed("active",1);
			pan.mode=2
			pan.drawview1(pan.mode);
		})

		d3.select("#frequency").on("click",function() {
			d3.select("#view_selection").selectAll("a").classed("active",0);
			d3.select(this).classed("active",1);
			pan.mode=3
			pan.drawview1(pan.mode);
		})

		d3.select("#select_region").on("change",function() {
			var v=d3.select(this).property("selectedIndex");
			pan.criteria["region"]=["global","americas","europe","asiapacific","japan"][v];
			pan.filter(pan.criteria);
			pan.drawview1(pan.mode);
		})

		d3.selectAll(".risk").on("click",function(d,i) {
			console.log(i);
			
			if(i==5) {
				delete pan.criteria["risk"]
			}
			else {
				pan.criteria["risk"]=(i+1);
			}
			pan.filter(pan.criteria);
			pan.drawview1(pan.mode);
		})

		pan.drawview1();
	}



})();