// this is the example model: 
// initially, 42% countries of the world are not free, 32% are partly free, 26% are free
// at the end of each decade, 
// 5% not free and 10% partly free become free
// 5% free and 15% not free become partly free
// 10% partly free become not free

w=960,h=500,svg=d3.select("#chart").append("svg").attr({width:w,height:h}).append("g").attr("transform","translate(20,0)");

var matrix=[
[.95,.1,.05],
[.05,.8,.15],
[  0,.1, .8]];
var vector=//[1,0,0];			
[.32,.26,.42];
var prevVector=[0,0,0];
function mult(matrix,vector) {
	v0=matrix[0][0]*vector[0]+matrix[0][1]*vector[1]+matrix[0][2]*vector[2];
	v1=matrix[1][0]*vector[0]+matrix[1][1]*vector[1]+matrix[1][2]*vector[2];
	v2=matrix[2][0]*vector[0]+matrix[2][1]*vector[1]+matrix[2][2]*vector[2];
	return [v0,v1,v2];
}

var rSize=400,rWidth=50, rSpace=128, N=6;
var color=["gold","steelblue","firebrick"];

var gradients=[];
color.forEach(function(c1,i) {
	color.forEach(function(c2,j) {
		gradients.push({
			name:"G"+i+"-"+j,
			stops:[
				{offset:"0%",color:c1},
				{offset:"100%",color:c2}
			]
		})
	})
})

var defs=svg.append("defs");
defs.selectAll("LinearGradient").data(gradients).enter()
		.append("linearGradient")
		.attr("id",function(d) {return d.name;})
		.selectAll("stop").data(function(d) {return d.stops;}).enter()
			.append("stop")
			.attr("stop-color",function(d) {return d.color;})
			.attr("offset",function(d) {return d.offset;});

expl=svg.append("text").attr("y",480);
var key = function(d) {
	return d.index;
};

var _id_ =0;
function generate() {
	_id_=_id_+1;
	prevVector=vector.slice();
	vector=mult(matrix,vector);
	
	var values=[];
	var runningY_p=[];
	var runningY=[];
	var rp=0,r=0;

	d3.range(prevVector.length).forEach(function(d,i) {
		runningY_p.push(rp);
		runningY.push(r);
		rp=rp+prevVector[i];
		r=r+vector[i];
	})	

	var counter=0;
	prevVector.forEach(function(v1,i) {
		vector.forEach(function(v2,j) {
			var width=v1*matrix[j][i];
			var y1=runningY_p[i];
			var y2=runningY[j];
			
			var dest=j;
			var source=i;
			var visible=!(i===j);
			values.push({width:width,y1:y1,y2:y2,dest:dest,source:source,visible:visible,index:_id_});

			runningY_p[i]=y1+width;
			runningY[j]=y2+width;
			counter=counter+1;
			

		})
	})
	return {index:_id_,state:prevVector,values:values};
}

function diag(y1,y2,sWidth,init) {
	
	var w=sWidth,W=sWidth*rSize;
	var Y1=rSize*(y1+w/2);
	var Y2=rSize*(y2+w/2);
	var Y11=Y1-W/2,Y12=Y1+W/2,Y21=Y2-W/2,Y22=Y2+W/2;
	var YM=(Y1+Y2)/2,YM1=(Y11+Y21)/2,YM2=(Y12+Y22)/2;
	var X1=rWidth;
	var X2=X1+(init?0:rSpace);
	var XM=(X1+X2)/2,XM1=XM+((Y1<Y2)?W/2:-W/2),XM2=XM-((Y1<Y2)?W/2:-W/2);
	var XA=X2-(init?0:10);

	var path="M"+X1+","+Y11+" Q "+XM1+","+Y11+" "+XM1+","+YM1+" "+XM1+","+Y21+" "+XA+","+Y21+ // top curve
		   " L "+X2+","+Y2+" L "+XA+","+Y22+	// arrow
		   " Q "+XM2+","+Y22+" "+XM2+","+YM2	+" "+XM2+","+Y12+" "+X1+","+Y12+	// bottom curve
		   "Z"; 																	// closed shape version
	return path;
}

var data,timer, running;

function make(groups) {
		groups.append("g").attr("transform", "translate("+rWidth+","+(rSize+30)+")").selectAll("text").data(function(d) {return d.state}).enter().append("text")
			.text(function(d) {return (Math.round(d*1000)/10)+"%";})
			.style("fill",function(d,i) {return color[i];})
			.attr({"text-anchor":"end","y":function(d,i){return i*15;}})
			groups.append("text").attr({x:rWidth,y:rSize+15,"text-anchor":"end"}).text(function(d) {return d.index;})
		var group=groups.selectAll(".group").data(function(d) {return d.values;}).enter().append("g").classed("group",1)

		group.append("rect")
			.attr({y:function(d) {return rSize*d.y1;}, height:function(d) {return rSize*d.width;}, width:rWidth,
			 rx:5,rY:5
			})
			.style({"fill":function(d) {return color[d.source];}, "stroke": "white"});
		group.append("path")
			.style({"fill":function(d) {
				return "url(#G"+d.source+"-"+d.dest+")";
			}, "stroke":"none","fill-opacity":function(d) {return d.visible?.5:0.1;},
			})
			.attr("d", function(d) {return diag(d.y1,d.y2,d.width,true);})
			.transition()
			.attr("d", function(d) {return diag(d.y1,d.y2,d.width,false);})
		group.selectAll("path")
			.on("mouseover",function(d) {
				d3.select(this).transition()
				.attr("d",function(d) {return diag(d.y1,d.y2,d.width,false);})
				.style("fill-opacity",1);
				expl.text(function() {
					var text="At the end of period "+d.index+", "+Math.round(d.width*100)+"% of the elements "
					if(d.source==d.dest) {
						text=text+"stay in state "+(d.source+1)+". "
					}
					else {
						text=text+"change from state "+(d.source+1)+" to state "+(d.dest+1)+"."
					}
					return text;})
			})
			.on("mouseout",function(d) {d3.select(this).transition()
				//.style("stroke","#ccc")
				.attr("d",function(d) {return diag(d.y1,d.y2,d.width,false);})
				.style("fill-opacity",function(d) {return d.visible?0.5:0.1;})
			})
	}

function update() {
	data.shift();
	data.push(generate());

	svg.selectAll(".groups").transition().attr("transform",function(d,i) {return "translate("+((rWidth+rSpace)*(i-1))+",0)";});
	var newGroup=svg.selectAll(".groups").data(data,key).enter().append("g").attr("transform",function(d,i) {return "translate("+((rWidth+rSpace)*6)+",0)";}).attr("id",function(d) {return "g"+d.index;}).classed("groups",1)
	.call(make);
	
	newGroup.transition().attr("transform",function(d,i) {return "translate("+((rWidth+rSpace)*5)+",0)";})
	svg.selectAll(".groups").data(data,key).exit().transition().attr("transform",function(d,i) {return "translate("+(-(rWidth+rSpace))+",0)";}).remove();
}

function init() {
	_id_=0;
	expl.text("");
	d3.selectAll(".groups").remove();	

	data=d3.range(6).map(generate);

	var groups=svg.selectAll(".groups")
		.data(data,key).enter().append("g").attr("transform",function(d,i) {return "translate("+((rWidth+rSpace)*i)+",0)";})
		.attr("id",function(d) {return "g"+d.index;}).classed("groups",1).call(make)
	
	d3.select("#button").property("value","stop").on("click",function() {console.log("clc");stop()});

	timer=setInterval(update, 2000);

}

function stop() {
	clearInterval(timer);
	timer = undefined;
	d3.select("#button").property("value","launch model").on("click",init);
}

function form() {
	doLegendState();
	doLegend(0);
	doLegend(1);
	doLegend(2);

	function doLegendState() {
		spans=[
				["Initially, ","black"],
				[Math.round(100*vector[0])+"%", color[0]],
				[" of the elements are in ","black"],
				[" state 1", color[0]],
				[", ","black"],
				[Math.round(100*vector[1])+"%", color[1]],
				[" are in ", "black"],
				[" state 2", color[1]],
				[", ", "black"],
				[Math.round(100*vector[2])+"%", color[2]],
				[" in ", "black"],
				[" state 3", color[2]],
				[".", "black"]
			];

			d3.select("#legendState").selectAll("span").data(spans).enter().append("span");
			d3.select("#legendState").selectAll("span").html(function(d) {return d[0];}).style("color",function(d) {return d[1];})
	}

	function doLegend(col) {
		spans=[
			["At the end of each period, ", "black"],
			[Math.round(100*matrix[0][col])+"%", color[0]],
			[" of the elements in ", "black"],
			[" state "+(col+1), color[col]],
			[" will "+((col===0)?"stay in ":"turn to "), "black"],
			[" state 1", color[0]],
			[", ", "black"],
			[Math.round(100*matrix[1][col])+"%",color[1]],
			[" will "+((col===1)?"stay in ":"turn to "), "black"],
			[" state 2", color[1]],
			[", and ", "black"],
			[Math.round(100*matrix[2][col])+"%",color[2]],
			[" will "+((col===2)?"stay in ":"turn to "), "black"],
			[" state 3", color[2]],
			[". ", "black"]
		];
		d3.select("#legendT"+(col+1)).selectAll("span").data(spans).enter().append("span");
		d3.select("#legendT"+(col+1)).selectAll("span").html(function(d) {return d[0];}).style("color",function(d) {return d[1];});

	}

	$("#sliderState").slider({
		range:true,
		min:0,
		max:100,
		values:[32,58],
		slide:function(event,ui) {
			stop();
			vector=[ui.values[0]/100,(ui.values[1]-ui.values[0])/100,(100-ui.values[1])/100];
			doLegendState();
		}
	})

	$("#sliderT1").slider({
		range:true,
		min:0,
		max:100,
		values:[95,100],
		slide:function(event,ui) {
			stop();
			matrix[0][0]=ui.values[0]/100;
			matrix[1][0]=(ui.values[1]-ui.values[0])/100;
			matrix[2][0]=(100-ui.values[1])/100;
			doLegend(0);
		}
	})

	$("#sliderT2").slider({
		range:true,
		min:0,
		max:100,
		values:[10,90],
		slide:function(event,ui) {
			stop();
			matrix[1][1]=ui.values[0]/100;
			matrix[2][1]=(ui.values[1]-ui.values[0])/100;
			matrix[3][1]=(100-ui.values[1])/100;
			doLegend(1);
		}
	})

	$("#sliderT3").slider({
		range:true,
		min:0,
		max:100,
		values:[5,20],
		slide:function(event,ui) {
			stop();
			matrix[0][2]=ui.values[0]/100;
			matrix[1][2]=(ui.values[1]-ui.values[0])/100;
			matrix[2][2]=(100-ui.values[1])/100;
			doLegend(2);
		}
	})

}			

var settingsVisible=0;
form();
init();

d3.select("h4").on("click",function() {
	if (settingsVisible) {
		d3.select("#settings").style("display","none");
		d3.select("h4").html("Click to change model settings");
	} else {
		d3.select("#settings").style("display","block");
		d3.select("h4").html("Hide settings");
	}
	settingsVisible=1-settingsVisible;
})
