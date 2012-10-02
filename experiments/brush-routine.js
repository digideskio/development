var width=960,height=500;
var svg=d3.select("#chart")
	.append("svg")
	.attr("width",width)
	.attr("height",height);


var cScale=d3.scale.linear().domain([0,.5,1]).range(["blue","#eee","red"]);
var brush;
var circScale=d3.scale.category20b();
var oScale=d3.scale.linear().domain([0,2000]).range([0.5,.8]);

var x=d3.scale.ordinal().rangeBands([530,960],.15).domain(d3.range(18));
var y=d3.scale.linear().domain([0,100000]).range([270,0]).clamp([true]);

//var projection = d3.geo.mercator()
//    .scale(110000)
//    .translate([-200, 17400]);
var projection=d3.geo.mercator()
	//.translate([-9114.322572985684,227140.78962627475])
	//.scale(1454593.7112207392);
	//.translate([-6167.819406313944,154185.0588010463])
	//.scale(986851.1050102309);
	.translate([-5500, 139300])
	.scale(891443.7768152277)
	//.translate([-6300,158000])
	//.scale(1011000);


//var perimeterPath="M298.87119225475,80.26790228424943L308.87119225475,80.26790228424943L353.7842937329533,89.9330208277679L366.89241766055875,97.29211270748056L407.31260535789625,133.94797828787705L437.6094825323253,179.0998433305649L446.11010830076066,198.85306725106784L447.22442767350094,283.6191850731848L447.22442767350094,293.6191850731848L444.70041890978337,326.2178940521553L437.18088761491344,367.07327545117005L313.2260839435685,429.5705343884474L303.2260839435685,429.5705343884474L256.33557956369987,425.7258006327029L183.46567159382266,410.35614977264777L158.9846369315892,404.0507515357749L60.950436971912495,377.6013106436003L-0.9415748306464593,341.42360612677294L-33.536444453212425,231.1568109932996L-33.536444453212425,221.1568109932996L164.85078143760893,88.28908370211138L216.60632470252403,81.15631044717156L235.6393930144868,80.38090817959164Z"


// precomputed. 
// here's how: 
/*
myHull=[];
positions.forEach(function(p) {var x=p[0],y=p[1];myHull.push([x-5,y-5]);myHull.push([x+5,y-5]);myHull.push([x-5,y+5]);myHull.push([x+5,y+5]);})
computedHull=d3.geom.hull(myHull);
"M" + computedHull.join("L") + "Z";
*/

var defs=svg.append("defs");

//defs.append("clipPath").attr("id","Paris")
//	.append("path").attr("d",perimeterPath)

d3.csv("parisLimits.csv",function(coordinates) {
	var perimeter=[];
	coordinates.forEach(function(c) {
		perimeter.push(projection([+c.lon,+c.lat]));
	})
	perimeterPath="M" + perimeter.join("L") + "Z";
	defs.append("clipPath").attr("id","Paris")
		.append("path").attr("d",perimeterPath);

});



svg.append("rect").style("fill","white").style("stroke","none").attr("width",width).attr("height",height).attr("id","bkgd");

var selected=null;
var selectedBV=null;

var cells = svg.append("svg:g").attr("width",520).attr("height",500)
    .attr("id", "cells").style("clip-path", "url(#Paris)");
var max=0,flipped=[];
var positions;
var data;



d3.csv("parisBV.csv", function(bv){
	d3.select("#bkgd").on("click", function() {selectCir();})
	positions = [];
	data=bv;
	bv.forEach(function(b) {
	    //positions.push(projection([+b.lon+Math.random()/1000-.0005, +b.lat+Math.random()/1000-.0005]));
	    positions.push(projection([+b.clon, +b.clat]));
	});
	
	// Compute the Voronoi diagram of airports' projected positions.
	var polygons = d3.geom.voronoi(positions);
	
	var g = cells.selectAll("g").data(bv).enter()
		.append("svg:g")
		.attr("class",function(d) {return "C"+d.cir;});
	
	g
		.append("svg:path")
		.attr("class","bkg")
		.style("fill","#eee")
		.style("stroke","#ccc")//.style("stroke-width",1)
		.attr("d", function(d, i) { return "M" + polygons[i].join("L") + "Z"; })

	g
		.append("svg:circle")
		//.style("fill",function(d) {return circScale(d.cir);}).style("opacity",.5)
		.style("fill","black").style("visibility","hidden")
		.attr("cx", function(d, i) { return positions[i][0]; })
		.attr("cy", function(d, i) { return positions[i][1]; })
		.attr("r", 1);
	
	g
		.append("svg:path")
		.attr("class", "cell")
		.attr("id",function(d) {return "b"+d.code;})
		.style("fill",function(d) {max=d;return cScale(+d.holT2/((+d.holT2)+(+d.sarT2)));})
		.style("stroke",function(d) {max=d;return cScale(+d.holT2/((+d.holT2)+(+d.sarT2)));}).style("stroke-width",1)
		//.style("fill",function(d) {return circScale(d.cir);})
		.style("opacity",function(d) {return oScale(+d.insT2);})
		.attr("d", function(d, i) { return "M" + polygons[i].join("L") + "Z"; })
		
		.append("title").text(function(d) {return d.code;})
		;
	
	g.append("line")
		.attr("x1",function(d) {return projection([+d.clon,+d.clat])[0];})
		.attr("y1",function(d) {return projection([+d.clon,+d.clat])[1];})
		.attr("x2",function(d) {return projection([+d.lon,+d.lat])[0];})
		.attr("y2",function(d) {return projection([+d.lon,+d.lat])[1];})
		

	g
		.on("mouseover", highlightBV)
		.on("mouseout", un_highlightBV)
		.on("click", selectBV)
		

	var tally=[];
	bv.forEach(function(d) {d.ocir=d.cir;d.tcir=d.cir;})
	function recompute(key) {
			if(typeof(key)==="undefined"){key="cir";}
			tally=d3.nest().key(function(d) {return d[key];}).rollup(function(d) {
			var insT1=0,blaT1=0,jolT1=0,sarT1=0,lepT1=0,sarT1=0,melT1=0,pouT1=0,artT1=0,cheT1=0,bayT1=0,dupT1=0,holT1=0,insT2=0,blaT2=0,sarT2=0,holT2=0;
			d.forEach(function(l) {
				insT1+=+l.insT1;
				sarT1+=+l.sarT1;
				blaT1+=+l.blaT1;
				jolT1+=+l.jolT1;
				lepT1+=+l.lepT1;
				melT1+=+l.melT1;
				pouT1+=+l.pouT1;
				artT1+=+l.artT1;
				cheT1+=+l.cheT1;
				bayT1+=+l.bayT1;
				dupT1+=+l.dupT1;
				holT1+=+l.holT1;
				insT2+=+l.insT2;
				blaT2+=+l.blaT2;
				sarT2+=+l.sarT2;
				holT2+=+l.holT2;});
			return {
					insT1:insT1,	blaT1:blaT2,	jolT1:jolT1,
					lepT1:lepT1,	sarT1:sarT1,	melT1:melT1,
					pouT1:pouT1,	artT1:artT1,	cheT1:cheT1,
					bayT1:bayT1,	dupT1:dupT1,	holT1:holT1,
					insT2:insT2,	blaT2:blaT2,	sarT2:sarT2,
					holT2:holT2,	sarT1:sarT1};}).entries(data);
		}
	recompute();

	var barChart=svg.append("g").attr("id","barChart");
	barChart.selectAll("rect").data(tally).enter()
		.append("rect")
		.attr("x",function(d,i) {return x(i);})
		.attr("y",function(d) {return y(d.values.insT2);})
		.attr("width",x.rangeBand())
		.attr("height",function(d) {return 270-y(d.values.insT2);})
		.style("fill",function(d) {max=d;return cScale(+d.values.holT2/((+d.values.holT2)+(+d.values.sarT2)));})
		.on("mouseover",highlightCir)
		.on("mouseout",un_highlightCir)
		.on("click",function(d,i) {
			cells.selectAll(".cell").style("visibility","visible");
			cells.selectAll("circle").style("visibility","hidden");
			d3.select("#barChart").selectAll("rect").style("stroke","none");
			cells.selectAll(":not(.C"+d.key+")").select(".cell").style("visibility","hidden");
			cells.selectAll(":not(.C"+d.key+")").select("circle").style("visibility","visible");
			d3.select(this).style("stroke","black");selectCir(i);})
		;

	var infoPanel=svg.append("g").attr("id","infoPanel").attr("transform","translate(530,330)");
	infoPanel.append("rect").attr("width",430).attr("height",170).style("fill","#eee").attr("rx",5).attr("ry",5);
	infoPanel.append("text").attr("id","infoTitle").attr("x",10).attr("y",23).text("title")
	infoPanel.append("g").attr("id","infoBC").attr("transform","translate(10,60)")
		.append("rect").attr("width",410).attr("height",100).style("fill","#ddd");
	infoPanel.selectAll("line").data(d3.range(10)).enter().append("line")
			.attr("x1",25)
			.attr("x2",16*25+10)
			.attr("y1",function(d){return 70+d*10;})
			.attr("y2",function(d){return 70+d*10;})
			.style("stroke","#ccc").style("stroke-width",1).style("opacity",.5);
	
	myBC=[0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		/*(+d.insT1-((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)))/(+d.insT1),
		(d.holT1)/((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)),
		(d.sarT1)/((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)),
		(d.lepT1)/((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)),
		(d.melT1)/((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)),
		(d.bayT1)/((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)),
		(d.jolT1)/((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)),
		(d.artT1)/((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)),
		(d.pouT1)/((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)),
		(d.dupT1)/((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)),
		(d.cheT1)/((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)),
		(+d.insT2-((+d.holT2)+(+d.sarT2)))/(+d.insT2),
		(+d.holT2)/((+d.holT2)+(+d.sarT2)),
		(+d.sarT2)/((+d.holT2)+(+d.sarT2))];*/

	var series=["Abs./blancs/nuls T1","Hollande T1","Sarkozy T1","Le Pen T1","Mélenchon T1", "Bayrou T1","Joly T1","Arthaud T1","Poutou T1","Dupont-Aignan T1","Cheminade T1","Abs./blancs/nuls T2","Hollande T2","Sarkozy T2"];

	var infoBars=infoPanel.select("#infoBC").selectAll("g").data(myBC).enter().append("g")
		.attr("transform",function(d,i) {return "translate("+(27*i+20)+",0)";});
		infoBars.append("rect")
			.attr("width",25)
			.attr("y",function(d) {return 100*(1-d);})
			.attr("height", function(d) {return 100*d;})
		infoBars.append("text").attr("transform","rotate(-90)")
			.text(function(d,i) {return series[i];}).attr("y","15").attr("x",-95)
			.style("font-size",10).style("fill","white").style("opacity",.8);

	function highlightCir (d,i){
		if(selected===null){
			selectedBV=null;un_highlightBV();
			cells.selectAll(":not(.C"+d.key+")").select(".cell").style("visibility","hidden");
			cells.selectAll(":not(.C"+d.key+")").select("circle").style("visibility","visible");
			myBC=[
				(+d.values.insT1-((+d.values.artT1)+(+d.values.jolT1)+(+d.values.lepT1)+(+d.values.holT1)+(+d.values.pouT1)+(+d.values.sarT1)+(+d.values.cheT1)+(+d.values.dupT1)+(+d.values.melT1)+(+d.values.bayT1)))/(+d.values.insT1),
				(d.values.holT1)/((+d.values.artT1)+(+d.values.jolT1)+(+d.values.lepT1)+(+d.values.holT1)+(+d.values.pouT1)+(+d.values.sarT1)+(+d.values.cheT1)+(+d.values.dupT1)+(+d.values.melT1)+(+d.values.bayT1)),
				(d.values.sarT1)/((+d.values.artT1)+(+d.values.jolT1)+(+d.values.lepT1)+(+d.values.holT1)+(+d.values.pouT1)+(+d.values.sarT1)+(+d.values.cheT1)+(+d.values.dupT1)+(+d.values.melT1)+(+d.values.bayT1)),
				(d.values.lepT1)/((+d.values.artT1)+(+d.values.jolT1)+(+d.values.lepT1)+(+d.values.holT1)+(+d.values.pouT1)+(+d.values.sarT1)+(+d.values.cheT1)+(+d.values.dupT1)+(+d.values.melT1)+(+d.values.bayT1)),
				(d.values.melT1)/((+d.values.artT1)+(+d.values.jolT1)+(+d.values.lepT1)+(+d.values.holT1)+(+d.values.pouT1)+(+d.values.sarT1)+(+d.values.cheT1)+(+d.values.dupT1)+(+d.values.melT1)+(+d.values.bayT1)),
				(d.values.bayT1)/((+d.values.artT1)+(+d.values.jolT1)+(+d.values.lepT1)+(+d.values.holT1)+(+d.values.pouT1)+(+d.values.sarT1)+(+d.values.cheT1)+(+d.values.dupT1)+(+d.values.melT1)+(+d.values.bayT1)),
				(d.values.jolT1)/((+d.values.artT1)+(+d.values.jolT1)+(+d.values.lepT1)+(+d.values.holT1)+(+d.values.pouT1)+(+d.values.sarT1)+(+d.values.cheT1)+(+d.values.dupT1)+(+d.values.melT1)+(+d.values.bayT1)),
				(d.values.artT1)/((+d.values.artT1)+(+d.values.jolT1)+(+d.values.lepT1)+(+d.values.holT1)+(+d.values.pouT1)+(+d.values.sarT1)+(+d.values.cheT1)+(+d.values.dupT1)+(+d.values.melT1)+(+d.values.bayT1)),
				(d.values.pouT1)/((+d.values.artT1)+(+d.values.jolT1)+(+d.values.lepT1)+(+d.values.holT1)+(+d.values.pouT1)+(+d.values.sarT1)+(+d.values.cheT1)+(+d.values.dupT1)+(+d.values.melT1)+(+d.values.bayT1)),
				(d.values.dupT1)/((+d.values.artT1)+(+d.values.jolT1)+(+d.values.lepT1)+(+d.values.holT1)+(+d.values.pouT1)+(+d.values.sarT1)+(+d.values.cheT1)+(+d.values.dupT1)+(+d.values.melT1)+(+d.values.bayT1)),
				(d.values.cheT1)/((+d.values.artT1)+(+d.values.jolT1)+(+d.values.lepT1)+(+d.values.holT1)+(+d.values.pouT1)+(+d.values.sarT1)+(+d.values.cheT1)+(+d.values.dupT1)+(+d.values.melT1)+(+d.values.bayT1)),
				(+d.values.insT2-((+d.values.holT2)+(+d.values.sarT2)))/(+d.values.insT2),
				(+d.values.holT2)/((+d.values.holT2)+(+d.values.sarT2)),
				(+d.values.sarT2)/((+d.values.holT2)+(+d.values.sarT2))
			];

			infoBars.data(myBC).select("rect")
				.transition()
				.attr("y",function(d) {return 100*(1-d);})
				.attr("height",function(d) {return 100*d;})

			infoPanel.select("#infoTitle").text(d.key+(+d.key==1?"ère":"ème")+" circonscription");
		}
	}

	function un_highlightCir(d,i) {
		if (selected===null){
			cells.selectAll(":not(.C"+d.key+")").select(".cell").style("visibility","visible");
			cells.selectAll(":not(.C"+d.key+")").select("circle").style("visibility","hidden");
		}
	}

	function highlightBV(d, i) {if(selectedBV===null){
			d3.select(this).select(".cell").style("opacity",1).style("fill","darkorange");
			d3.selectAll(":not(.C"+d.cir+")").select(".cell").style("opacity",.1);
			myBC=[
				(+d.insT1-((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)))/(+d.insT1),
				(d.holT1)/((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)),
				(d.sarT1)/((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)),
				(d.lepT1)/((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)),
				(d.melT1)/((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)),
				(d.bayT1)/((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)),
				(d.jolT1)/((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)),
				(d.artT1)/((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)),
				(d.pouT1)/((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)),
				(d.dupT1)/((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)),
				(d.cheT1)/((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)),
				(+d.insT2-((+d.holT2)+(+d.sarT2)))/(+d.insT2),
				(+d.holT2)/((+d.holT2)+(+d.sarT2)),
				(+d.sarT2)/((+d.holT2)+(+d.sarT2))
			];

			infoBars.data(myBC).select("rect")
				.transition()
				.attr("y",function(d) {return 100*(1-d);})
				.attr("height",function(d) {return 100*d;})

			infoPanel.select("#infoTitle").text(d.bda+(+d.bda==1?"er":"ème")+" bureau du "+d.arr+(+d.arr==1?"er":"ème")+" arrondissement");}
		}
	function un_highlightBV(d,i) {if(selectedBV==null){
			d3.selectAll(".cell").style("opacity",function(c) {return oScale(+c.insT2);})
			.style("fill",function(d) {max=d;return cScale(+d.holT2/((+d.holT2)+(+d.sarT2)));})
		}
	}
	function selectBV(d,i) {
		selectedBV=i;
		d3.selectAll(".cell").style("opacity",function(c) {return oScale(+c.insT2);})
		.style("fill",function(d) {max=d;return cScale(+d.holT2/((+d.holT2)+(+d.sarT2)));})
		d3.select(this).select(".cell").style("opacity",1).style("fill","darkorange");
		d3.selectAll(":not(.C"+d.cir+")").select(".cell").style("opacity",.1);
		myBC=[
				(+d.insT1-((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)))/(+d.insT1),
				(d.holT1)/((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)),
				(d.sarT1)/((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)),
				(d.lepT1)/((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)),
				(d.melT1)/((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)),
				(d.bayT1)/((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)),
				(d.jolT1)/((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)),
				(d.artT1)/((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)),
				(d.pouT1)/((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)),
				(d.dupT1)/((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)),
				(d.cheT1)/((+d.artT1)+(+d.jolT1)+(+d.lepT1)+(+d.holT1)+(+d.pouT1)+(+d.sarT1)+(+d.cheT1)+(+d.dupT1)+(+d.melT1)+(+d.bayT1)),
				(+d.insT2-((+d.holT2)+(+d.sarT2)))/(+d.insT2),
				(+d.holT2)/((+d.holT2)+(+d.sarT2)),
				(+d.sarT2)/((+d.holT2)+(+d.sarT2))
			];
		infoBars.data(myBC).select("rect")
				.transition()
				.attr("y",function(d) {return 100*(1-d);})
				.attr("height",function(d) {return 100*d;})

		infoPanel.select("#infoTitle").text(d.bda+(+d.bda==1?"er":"ème")+" bureau du "+d.arr+(+d.arr==1?"er":"ème")+" arrondissement");

	}

	function selectCir(myCir) {
		if (typeof(myCir)!=="undefined") {
				selected=myCir;
				cells.call(brush);
			}else{
				d3.selectAll("#cells").style("pointer-events",null)
				selected=null;
				cells.selectAll(".cell").style("visibility","visible");
				cells.selectAll("circle").style("visibility","hidden");
				d3.select("#barChart").selectAll("rect").style("stroke","none");
				selectedBV=null;
			}
	}

	var xb=d3.scale.linear().domain([0,450]).range([0,450]);
	var yb=d3.scale.linear().domain([0,500]).range([0,500]);
	brush = d3.svg.brush().x(xb).y(yb)	
	      .on("brushstart", brushstart)
	      .on("brush", brush)
	      .on("brushend", brushend);



	function brushstart(p) {
	    cells.call(brush.clear());
	}


	// Highlight the selected circles.
	function brush(p) {
		if(selected!==null){
			var e = brush.extent();
			max=e;flipped=[];
			positions.forEach(function(d,i) {
				if(d[0]>=e[0][0] && d[0]<=e[1][0] && d[1]>=e[0][1] && d[1]<=e[1][1]||bv[i].cir==(selected+1)) {
					bv[i].tcir=(selected+1);
					flipped.push(i);
					cells.selectAll("#b"+bv[i].code).style("visibility","visible");
					//console.log("#b"+bv[i].code);
				} else {
					bv[i].tcir=bv[i].cir;
					cells.selectAll("#b"+bv[i].code).style("visibility","hidden");
				}
			});
		}
	}


	function brushend() { 
		
		bv.forEach(function(d,i) {d.cir=d.tcir;})
		recompute();
		cells.selectAll("g").attr("class",function(d) {return "C"+d.cir;})
		barChart.selectAll("rect").data(tally)
			.transition()
			.attr("height",function(d) {return 270-y(d.values.insT2);})
			.style("fill",function(d) {max=d;return cScale(+d.values.holT2/((+d.values.holT2)+(+d.values.sarT2)));})
			.attr("y",function(d) {return y(d.values.insT2);})

		cells.call(brush.clear());
	}
});
	
	
	//var xy = projection([bv.lon,bv.lat]);
	
//})
/*
var data=d3.range(200).map(function(d) {return {x:Math.random(),y:Math.random(),r:2+Math.random()*5,c:0};})

var x=d3.scale.linear().domain([0,1]).range([0,width]);
var y=d3.scale.linear().domain([0,1]).range([0,height]);


var brush = d3.svg.brush().x(x).y(y)	
      .on("brushstart", brushstart)
      .on("brush", brush)
      .on("brushend", brushend);

var circles=svg.selectAll("circle").data(data).enter()
	.append("circle")
	.attr("cx",function(d) {return x(d.x);})
	.attr("cy",function(d) {return y(d.y);})
	.attr("r",function(d) {return d.r;})
	;
	
function brushstart(c) {};
function brush(c) {};
function brushend(c) {};

svg.call(brush);


function brushstart(p) {
    svg.call(brush.clear());
}


// Highlight the selected circles.
function brush(p) {
	var e = brush.extent();
	data.forEach(function(d,i) {
		
		if(d.x>=e[0][0] && d.x<=e[1][0] && d.y>=e[0][1] && d.y<=e[1][1]) {
		d.c=1;}
	})
	
	svg.selectAll("circle").classed("orange",function(d) {return d.c;})
}


function brushend() { 
	svg.call(brush.clear());
}*/