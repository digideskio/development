var width = 960,
    height = 960;
    
var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height);
var defs=svg.append("defs");
var vis=svg
    .append("g");
tick=0;
var maxTick;


π=Math.PI;
var mydata;

d3.tsv("data.tsv",function(error,data) {
	data.forEach(function(d) {
		d.correspondent=+d.correspondent;
		d.length=+d.length;
		d.message=+d.message;
		d.thread=+d.thread;
		d.date=new Date(+d.time*1000);
	})
	data=d3.nest().key(function(d) {return d.correspondent;}).key(function(d) {return d.thread;}).map(data);
	mydata=data;
	init(48);
})
var myhue,mycolor,g,t,words,threads;
var hScale=d3.scale.linear().range([0,height]);
var rScale=d3.scale.sqrt().range([0,20])

function init(corr) {
	tick=0;
	var dataCorr=mydata[corr];
	keys=d3.keys(dataCorr);
	threads=keys.map(function(k) {return {
		key:k,
		hue:Math.random()*360,
		values:dataCorr[k],
		time:+dataCorr[k][0].time,
		tick:Math.floor(d3.scale.linear().domain([1328050800,1356908400]).range([0,1000])(+dataCorr[k][0].time)),
		total:d3.sum(dataCorr[k],function(t) {return t.length;})
	};});

	var maxHeight=d3.max(threads, function(t) {return t.total;})
	var maxSize=d3.max(threads,function(t) {return d3.max(t.values,function(v) {return v.length;})})
	
	hScale.domain([0,maxHeight]);
	rScale.domain([0,maxSize]);


	threads.forEach(function(t) {
		l=t.values.length;
		t.values.forEach(function(v,i) {
			v.hue=t.hue; // by convenience
			v.words=[[v.word1,v.hue],[v.word2,v.hue],[v.word3,v.hue]]; // easier also

			/* then, we'll stock the equation of the fireball's trajectory. 
			   they will all follow an equation y=ax²+bx+c

			   but there are 3 cases:

			   single message:
			      __
			   _--  --_

			   arc, from me to them:
 				   _____
			   _--

			   arc, from them to me:

			   ____
			   		--_
			*/

			v.h=hScale(+v.length);
				
			if(l==1) {
				// single message, parabol, start and end from bottom;
				v.b=4*v.h/width;
				v.a=-v.b/width;
				v.c=0;
			}
			else {
				v.c=hScale(d3.sum(t.values.slice(0,i-1),function(w) {return w.length;}));
				// sum of previous lengths
				// height of this arc
				if(v.direction=="to") {
					v.a=v.h/width*width;
					v.b=2*v.h/width;
				} else {
					v.c=v.c+v.h;
					v.b=0;
					v.a=-v.h/width*width;
				}
			}
			v.tick=t.tick+100*i;
		})
	})

	
	//var minTime=d3.min(threads,function(t) {return t.time;}) // useful?
	//var maxTime=d3.max(threads,function(t) {return t+600000*t.values.length;}) // useful?

	maxTick=d3.max(threads,function(t) {return d3.max(t.values,function(v) {return v.tick;})})


	//var minTime=d3.max(threads,function(t) {return d3.max(t.values,function(v) {return +v.time;})}) // useful?
	//var maxTime=d3.max(threads,function(t) {return d3.max(t.values,function(v) {return +v.time;})}) // useful?

	// needed?
	//var minSize=d3.min(threads,function(t) {return d3.max(t.values,function(v) {return v.length;})})

	
	myhue=Math.random()*360;
	mycolor=color(myhue,.25,.5);

	vis.selectAll(".arc").data(threads).enter().append("g").classed("arc",1);
	vis.selectAll(".arc").selectAll(".fireball").data(function(d) {return d.values;}).enter().append("g").classed("fireball",1);
	vis.selectAll(".tracks")  .data(threads).enter().append("g").classed("tracks",1);
	
	vis.selectAll(".fireball").attr("transform",function(d) {return d.direction=="to"?"translate(0,"+height+")":"translate("+width+","+height+")";})
	vis.selectAll(".fireball").append("circle").classed("core",1).attr({r:function(d) {return rScale(d.length);}}).style({fill:function(d) {return color(d.hue);},stroke:"none"});
	vis.selectAll(".fireball").append("circle").classed("rim",1).attr({r:function(d) {return rScale(d.length)+3;}}).style({stroke:function(d) {return color(d.hue);},fill:"none"});
	vis.selectAll(".fireball").selectAll(".trail").data(function(d) {return d.words;}).enter().append("text").classed("trails",1).text(function(d) {return d[0];})
		.attr({"text-anchor":"end",x:-25})
	vis.selectAll(".fireball").style("visibility","hidden");

	start();

//	g=vis.append("g").attr("transform","translate(0,500)")
//	g.append("circle").attr({r:20}).style({fill:"none",stroke:mycolor});
//	g.append("circle").attr({r:17}).style({fill:mycolor,stroke:"none"});
//	t=vis.append("g");
	//vis.append("path").attr("d","M 0,500 Q 480,0 960,500").style("stroke","black").style("fill","none")

//	words=["Marion","rang","partant"];
	

}

function color(hue) {return d3.hsl(hue,.25,.5);}


function play() {
		if(tick===maxTick) {tick=-1;if(running) {stop();}}
		if(tick<maxTick){tick=tick+1;running=1;
		//d3.select("#stop").html("Pause&nbsp;<i class='icon-pause'>").on("click",stop);
	//	slider.property("value",day);
		
		update(tick);
	} else {stop();}	
	}

	function start() {
		timer=setInterval("play()", 10);
	}

	function stop() {
		clearInterval(timer);
		running=0;
	//	d3.select("#stop").html("Play&nbsp;<i class='icon-play'>").on("click",start);
	}

	function myangle(angle) {
		return Math.sin(angle)/Math.sqrt((2*2+Math.sin(angle)*Math.sin(angle)))
	}

	function update(n) {
		var angle=(π*n/50)%(2*π); // in radians
		var α=myangle(angle)*180/π; // in degrees
		var β=myangle(angle+π/3)*180/π; // in degrees
		var ɣ=myangle(angle+2*π/3)*180/π; // in degrees

		var angles=[
			[α,angle],
			[β,angle+π/3],
			[ɣ,angle+2*π/3]
		]

		var moving=vis.selectAll(".fireball").filter(function(d) {return (n>=d.tick && n<d.tick+100);});
		moving.style("visibility","visible");
		moving.attr("transform",function(d) {
			var x,y;
			if (d.direction=="to") {
				x=width*(n-d.tick)/100;
			}
			else {
				x=width-width*(n-d.tick)/100;
			}
			//y=500;//
			y=height-d.a*x*x+d.b*x+d.c;
			rot=0 // we'll get to that;

			return "translate("+x+","+y+") rotate("+rot+")";
		})

		moving.selectAll("text")
			.attr("transform",function(d,i) {
				return "rotate ("+angles[i][0]+")";
			})
			.style("fill",function(d,i) {return d3.hsl(d[1],.25,Math.cos(angles[i][1])/4+.25)})

		var tracks=vis.selectAll(".tracks").filter(function(d) {return (n>=d.tick && n<d.tick+100);});
		// we'll see the end later
	}

	function updatePoC(n) {
		angle=(π*n/50)%(2*π);

		var x=width*((n%1000)/1000);
		var h=250;
		var b=4*h/width;
		var a=-b/width;

		var y=height-(a*x*x+b*x)
		slope=-8*h/(width*width)*x+4*h/width;
		rot=-Math.atan(slope)*180/π;

		g.attr("transform","translate("+x+","+y+") rotate("+rot+")");
		
		α=myangle(angle);
		β=myangle(angle+π/3);
		ɣ=myangle(angle+2*π/3);
		//console.log(α,β,ɣ);
		
		data=[
			[words[0],α,angle],
			[words[1],β,angle+π/3],
			[words[2],ɣ,angle+2*π/3]
		];

		
		g.selectAll("text").data(data).enter().append("text");

		g.selectAll("text")
			.text(function(d) {return d[0]})
			.attr("transform",function(d) {return "rotate ("+(d[1]*180/π)+")";})
			.attr("text-anchor","end")
			.attr("x",-25)
			.style("fill",function(d) {return d3.hsl(myhue,.25,Math.cos(d[2])/4+.25)})
			
		if (Math.random()>.95) {
			t.append("circle").data([n]).attr({cx:x-5+10*Math.random(),cy:y-5+10*Math.random(),r:1+Math.random()*4}).style("fill",mycolor).style("opacity",.5);
		}
		t.selectAll("circle").filter(function(d) {return n-d>500;}).remove();
			t.selectAll("circle").style("opacity",function(d) {return .5-(n-d)/1000;})	
	}