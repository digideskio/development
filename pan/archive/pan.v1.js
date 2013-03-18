(function() {
	var width=960,height=800;
	pan={}
	pan.data=[];
	pan.selection=[];
	pan.dhash={};
	
	var regions=["americas","europe","japan","asiapacific","global"];
	var regionHash={"Americas":"americas","Europe":"europe","Japan":"japan","Asia/Pacific":"asiapacific","Worldwide":"global"}
	var categories=["networking","media","general-internet","collaboration","business-systems"];
	var technologies=["client-server","browser-based","peer-to-peer","network-protocol"];
	var riskColors={"-":"#ccc",1:"#67A2B9",2:"#A7C439",3:"#FFC425",4:"#F6851F",5:"#CD383F"};
	var catxy={"networking":[304,136],"media":[570,136],"general-internet":[232,365],"collaboration":[456,375],"business-systems":[698,375]};
	var techxy={"client-server":[125,125],"browser-based":[375,125],"peer-to-peer":[125,375],"network-protocol":[375,375]};
	
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
	.sort(function() {return Math.random()-.5})
	.value(function(d) {return d.value;})(tree);
	return pack.slice(1).map(function(d){return {d:d,r:d.r,k:(s/2)/d.r,x:d.x-s/2+x,y:d.y-s/2+y};})
	}

	pan.computePos=function() {

		// general case

		// we set aside the tiniest circles for now else they will upset the general layout greatly.

		// we give them a default value
		pan.selection.forEach(function(d,i) {
			d.pos=[{x:445,y:253,r:0},{x:445,y:253,r:0},{x:445,y:253,r:0},{x:445,y:253,r:0}];
		})

		// and calculate the position of the other. 100 is arbitrary large, we may try other values.
		// noting that there are 26 circles in the mockup, and circa 1300 data items in the dataset.

		var largeenough=pan.selection.slice(0);
		largeenough.sort(function(a,b) {return b.bandwidth-a.bandwidth}).slice(0,100);


		var c1=largeenough.map(function(d) {return srsly(d.bandwidth);})
		var pos1=iPack(c1,415,445,253);

		largeenough.forEach(function(d,i) {
			pan.selection[pan.dhash[d.id]].pos[0]=pos1[i];
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
			})
		})

		// finally, scatterplot category/frequency

		var rScale=d3.scale.linear().domain([0,1000000000]).range([0,20]);
		var xScale=d3.scale.linear().domain([0,1]).range([0,500]);
		var yScale={};
		categories.forEach(function(cat,i) {yScale[cat]=50+i*100;} );


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
			pan.filter({region:"global"})
			pan.drawview1(svg,0)	
		})
		
		
	}

	pan.drawview1 = function(svg,m) {
		var mode=m||0;
		var nodes=svg.selectAll("circle").data(pan.selection);
		nodes.exit().transition().style("opacity",0).remove();
		nodes.enter()
			.append("circle")
			.attr({
					cx:function(d) {return d.pos[m].x},
					cy:function(d) {return d.pos[m].y},
					 r:function(d) {return .95*d.pos[m].r},
					id:function(d) {return "c"+d.id},
				 class:function(d) {return "cat"+d.category+" tech"+d.technology}
			})
			.style({stroke:"none",fill:function(d) {return riskColors[d.risk]}})

		nodes=svg.selectAll("circle").data(pan.selection);
		nodes.transition().attr({
					cx:function(d) {return d.pos[m].x},
					cy:function(d) {return d.pos[m].y},
					 r:function(d) {return .95*d.pos[m].r}
			})

	}

	pan.view1 = function(id) {
		if(!id) {id="#chart"}
		pan.id=id;
	
		svg=d3.select(id).selectAll("svg").data([0]).enter()
			.append("svg").attr({width:width,height:height})
		svg.selectAll("*").remove();
		//pan.gendata(); // will be replaced by pan.readdata(file) when data will be provided
		pan.readdata("includes/data.csv")
		pan.drawview1(svg);
	}



})();