// footvis

w=800;
h=600;
m=50;
var chart=d3.select("#chart").attr("width",w).attr("height",h);
var svg=chart.append("svg");

// data

players=d3.range(10).map(function(d) {return {x:m+~~(Math.random()*(w-m)),y:m+~~(Math.random()*(h-m))}})
ball=[~~(Math.random()*5)]

players.forEach(function(d) {d.angle=180*Math.atan2(players[ball[0]].y-d.y,players[ball[0]].x-d.x)/Math.PI;})
players.forEach(function(d) {d.rad=30+~~(50*Math.random());})

attackers=[];
d3.range(4).forEach(function(a) {
	return d3.range(a+1,5).forEach(function(b) {attackers.push({line:[a,b]});})})

attackers.forEach(function(l) {
	var blocked=false; 
	d3.range(5,10).forEach(function(i) {
		if (isBlocked(l.line[0],l.line[1],i)) {
			blocked=true;
		}
	})
	l.blocked=blocked;
})

// functions

function shieldPath(d) {
	var r=d.rad;var mr=-r,dmr=-2*r,hr=r/2,mhr=-r/2;
	var path="M "+mr+" "+r+" C "+mhr+" "+mr+", "+hr+" "+mr+", "+r+" "+r+" Z";
	return path;
}

function shieldTransform(d) {
	var a=d.angle,x=d.x,y=d.y;
	return "translate("+x+","+y+") rotate("+(a+90)+")";
}


function blocked(A,B,C) {
	A=players[A],B=players[B],C=players[C];
	var d;
	if(A.x==B.x){
		d=Math.abs(C.x-A.x);
	} else {
		m=(B.y-A.y)/(B.x-A.x);
		b=A.y-A.x*m;
		d=Math.abs(A.y-m*A.x-b)/Math.sqrt(m*m+1);
	}
	if(d<C.rad) {
		if((C.y>A.y&&C.y<B.y)||(C.y>B.y&&C.y<A.y)) {return true;}
	}
	return false;
}
		

// layout

// network of attackers

network=svg.selectAll(".network").data(attackers).enter().append("line")
	.attr("x1",function(d) {return players[d.line[0]].x;})
	.attr("x2",function(d) {return players[d.line[1]].x;})
	.attr("y1",function(d) {return players[d.line[0]].y;})
	.attr("y2",function(d) {return players[d.line[1]].y;})
	.style("stroke",function(d) {return (d.line[0]==ball[0])||(d.line[1]==ball[0])?(d.blocked?"red":"steelblue"):"silver";})
	.style("stroke-dasharray","4 4")

gPlayers=svg.selectAll(".players").data(players).enter().append("g");
gPlayers.append("title").text(function(d,i) {return i;});	
gPlayers.append("circle")
	.attr("cx",function(d) {return d.x;})
	.attr("cy",function(d) {return d.y;})
	.attr("r",10)
	.style("fill",function(d,i) {return i<5?"steelblue":"green";})
	.classed("players",1)
	

gPlayers.append("path")
	.attr("d",shieldPath)
	.attr("transform",shieldTransform)
	.style("fill","green")
	.style("opacity",.2)
	.attr("visibility",function(d,i) {return i>4?"visible":"hidden";})
	
	
gBall=svg.selectAll(".ball").data(ball).enter().append("g");
gBall.append("circle")
	.attr("cx",function(d) {return players[d].x;})
	.attr("cy",function(d) {return players[d].y;})
	.attr("r",15)
	.style("stroke","red").style("fill","none")
	.classed("ball",1);

