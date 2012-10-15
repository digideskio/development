var width = 960,
    height = 700;

var color = d3.scale.category20();

var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height);

var i=0;
var slider=d3.select("#slider");

var r=300;
var play=function() {};
var rScale=d3.scale.linear();

svg.append("text").attr({x:20,y:20,id:"chapter"}).style("font-weight","bold");
svg.append("text").attr({x:20,y:40,id:"POV"}).style("font-style","italic");
var chp,chr,eve,charHash;
d3.csv("chapters.csv",function(chapters) {
	console.log("chapters loaded");
	chp=chapters;
	d3.csv("characters.csv",function(characters) {
		console.log("characters loaded");

		chr=characters;
		charHash={};

		characters.forEach(function(d) {
			charHash[d.characterID]=d;
		})

		d3.csv("events.csv",function(events) {
			console.log("events loaded");
			eve=d3.nest().key(function(d) {return d.chapterID;}).entries(events);
			var timer;
			var ticked=0;

			d3.select("#slider").on("change",function() {clearInterval(timer);i=this.value;start(i);})

			d3.select("#free").on("change",function() {ticked=!ticked;})

			var totalMentions=0;
			var totalChars=0;
			var maxMentions=1;
			var charCircle=[];
			var charShown={};
			init();
			
			function init() {
				svg.append("text").attr({x:20,y:20,id:"chapter"}).style("font-weight","bold");
				svg.append("text").attr({x:20,y:40,id:"POV"}).style("font-style","italic");

				start(0);
			}

			function start() {	
				svg.select("#chapter").text(chapters[i].title);
				svg.select("#POV").text(charHash[chapters[i].povID].Name);

				var myEvents=eve[i].values;

				myEvents.forEach(function(e) {
					if(e.event==="mentionned") {
						totalMentions=totalMentions+1;
						if (e.characterID in charShown) {
							var m=charShown[e.characterID].mentions=charShown[e.characterID].mentions+1;
							if(m>maxMentions){
								maxMentions=m;
							}
							charShown[e.characterID].chapters.push(e.chapterID);
						} else {
							totalChars=totalChars+1;
							charCircle.push({id:e.characterID});
							charShown[e.characterID]={mentions:1,chapters:[e.chapterID]};
						}
					}
				})

				rScale
					.domain([0,maxMentions])
					//.range([0,10]);
					.range([0,d3.min([20,100*r/totalMentions])]);


				runningPos=0;
				charCircle.forEach(function(c) {
					c.pos=runningPos;
					c.mentions=charShown[c.id].mentions;
					runningPos=runningPos+charShown[c.id].mentions/totalMentions;
				})

				var newChars=svg.selectAll(".characters").data(charCircle).enter()
					.append("g").classed("characters",1);
				newChars.append("circle")
							.attr("cx",function(d) {return posx(d.pos);})
							.attr("cy",function(d) {return posy(d.pos);})
							.attr("r",function(d) {return rScale(d.mentions);} )
				newChars.append("text")
						.attr("x",function(d) {return posx(d.pos);})
						.attr("y",function(d) {return posy(d.pos);})
						.attr("text-anchor","middle")
						.text(function(d) {return charHash[d.id].Name})
						.transition()
						.style("opacity",0)
						.each("end",function() {d3.select(this).remove();})
				svg.selectAll(".characters").select("circle")
					.transition()
					.attr("cx",function(d) {return posx(d.pos);})
					.attr("cy",function(d) {return posy(d.pos);})
					.attr("r",function(d) {return rScale(d.mentions);} )

			}

			function posx(pos) {
				return width/2+r*Math.cos(2*Math.PI*pos);
			}

			function posy(pos) {
				return height/2+r*Math.sin(2*Math.PI*pos);
			}


			play=function() {
				if(i<343){i++;
				slider.property("value",i);
				start(i);}	
			}

			timer=setInterval("play()", 250);
			
			
		})
	})
})

