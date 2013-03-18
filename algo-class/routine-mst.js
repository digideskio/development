var nbPoints=3,dim=300,steps=0;vertices={},edges=[];spannedV=[];OV=[];
var w=960,h=600,svg=d3.select("#chart").append("svg").attr({width:w,height:h}).append("g").attr("transform","translate(500,350)");
var alpha=Math.PI/4,beta=0,cab,sab,cb,sb;
var ca=Math.cos(alpha),sa=Math.sin(alpha);
var theta=0,psi=0,phi=0,ct,st,cs,ss,ch,sh;
var step=0;

init();
function init() {
	updateAngle();
	var x=0,y=0,z=0;
	if(dim>1){
		d3.range(nbPoints-1).forEach(function(i) {
			var myX=Math.random()*dim,myY=Math.random()*dim,myZ=Math.random()*dim;
			x=x+myX;y=y+myY;z=z+myZ;
			OV.push({i:i,x:myX,y:myY,z:myZ});
			vertices[i]={i:i,x:myX,y:myY,z:myZ};
		})

		spannedV=[{i:nbPoints,x:x/dim,y:y/dim,z:z/dim}]; // with should be suspiciously close to (dim/2,dim/2,dim/2)
		OV.push({i:nbPoints-1,x:x/dim,y:y/dim,z:z/dim});
		
		d3.range(nbPoints-1).forEach(function(i) {
			var min=2000,edge=[0,1],selected=-1;
			spannedV.forEach(function(s) {
				d3.keys(vertices).forEach(function(k) {
					v=vertices[k];
					//steps=steps+1 n*(n-1)*(2n+2)/12 ~ n^3. sucks
					if(dist(v,s)<min) {
						selected=k;
						min=dist(v,s);
						edge=[v,s,min];
					}
				})
			});

			edges.push(edge);
			spannedV.push(vertices[selected]);
			delete vertices[selected];
			//console.log(selected,d3.keys(vertices));
		})
	}
	console.log("done.",steps)
	svg.selectAll("axis").data([[{x:0,y:0,z:0},{x:1000,y:0,z:0}],
		[{x:0,y:0,z:0},{y:1000,x:0,z:0}],
		[{x:0,y:0,z:0},{z:1000,x:0,y:0}]]).enter().append("path").style({stroke:"black",fill:"none"}).attr("d",path).classed("axis",1)
	svg.selectAll("circle").data(OV).enter().append("circle").style({"fill":"black","opacity":.2}).classed("dots",1).attr("cx",function(d) {return proj(d).x;}).attr("cy",function(d) {return proj(d).y;}).attr("r",function(d) {return (1+cab)*d.z/100;})
	svg.selectAll("edges").data(edges).enter().append("path").style({stroke:"black",fill:"none"}).attr("d",path2).style("opacity",0.2).classed("edges",1);
	timer=setInterval(update, 100);


	//.transition().delay(function(d,i) {return i*20;}).style("opacity",.5);
	//	svg.selectAll("edges").data(edges).enter().append("path").style({stroke:"black",fill:"none"}).attr("d",path).style("opacity",0).transition().delay(function(d,i) {return i*20;}).style("opacity",.1);

}

function update() {
	theta=theta+.1;
	updateAngle();
	svg.selectAll(".axis").attr("d",path);
	svg.selectAll(".edges").attr("d",path2);
	svg.selectAll(".dots").attr("cx",function(d) {return proj(d).x;}).attr("cy",function(d) {return proj(d).y;}).attr("r",function(d) {return (1+cab)*d.z/100;})

}

function dist(a,b) {
	//console.log(a,b);
	return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y)+(a.z-b.z)*(a.z-b.z));
}

function rot(a) {
	var x,y,z;
	x=ct*cs*a.x+(-ch*ss+sh*st*cs)*a.y+(sh*ss+ch*st*cs)*a.z;
	y=ct*ss*a.x+(ch*cs+sh*st*ss)*a.y+(-cs*sh+ch*st*ss)*a.z;
	z=-st*a.x+sh*ct*a.y+ch*ct*a.z;
	return {x:x,y:y,z:z};
}

function proj(a) {
	var r=rot(a);
	var myX=r.x-ca*r.z;
	var myY=-r.y+sa*r.z;

	myX=Math.floor(myX*100)/100;
	myY=Math.floor(myY*100)/100;
	return {x:myX,y:myY};
}
function line(a,b) {
	var pa=proj(a),pb=proj(b);
	return "M"+pa.x+","+pa.y+" L "+pb.x+","+pb.y;
}

function diag(a,b) {
	var pa=proj(a),pb=proj(b);
	var p2={x:(pa.x+pb.x)/2,y:(pa.y+pb.y)/2}
	var p2=proj({x:(a.x+b.x)/2,y:(a.y+b.y)/2+10,z:(a.z+b.z)/2});
	//	return "M"+pa.x+","+pa.y+" Q"+pa.x+","+p2.y+" "+p2.x+","+p2.y+" T"+pb.x+","+pb.y
	return "M"+pa.x+","+pa.y+" Q"+p2.x+","+p2.y+" "+pb.x+","+pb.y;
//	return "M"+pa.x+","+pa.y+" Q"+pa.x+","+pb.y+" "+pb.x+","+pb.y;
//	return "M"+pa.x+","+pa.y+" Q"+pa.x+","+p2.y+" "+p2.x+","+p2.y+" "+pb.x+","+pb.y;
}
function updateAngle() {
	cab=Math.cos(alpha+beta);
	cb=Math.cos(beta);
	sab=Math.sin(alpha+beta);
	sb=Math.sin(beta);
	ct=Math.cos(theta);cs=Math.cos(psi);ch=Math.cos(phi);
	st=Math.sin(theta);ss=Math.sin(psi);sh=Math.sin(phi);
}
function path(d) {return line(d[0],d[1]);}
function path2(d) {return diag(d[0],d[1]);}