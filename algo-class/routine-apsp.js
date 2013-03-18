var edges,nodes,lines,l1;
var n,m,l0;
init("g1.txt")
function init(filename) {
	d3.text(filename,function(error,txt) {
		lines=txt.split('\n');
		l0=lines[0].split(' ');
		n=+l0[0];m=+l0[1];
		l1=lines.splice(1);
		nodes=d3.range(n);
		edges=[];
		l1.forEach(function(l) {
			l=l.split(' ');
			if(!isNaN(l[1])) {
			var myEdge={start:(+l[0]-1),end:(+l[1]-1),length:+l[2]};
			edges.push(myEdge);}
		})
		//result=floydWarshall(nodes,edges);
	//console.log(result);
	})
	
}

function bellmanFord(nodes,edges,s) {
	var n=nodes.length;
	var a=d3.range(n).map(function() {return Infinity;});
	a[s]=0;
	b=a.slice(0);
	d3.range(1,n).forEach(function(i) {
		d3.range(0,n).forEach(function(v) {
			a[v]=b[v];
			edges[v].forEach(function(e) {
				if(b[e.start]+e.length<a[v]) {a[v]=b[e.start]+e.length}
			})
		})
		b=a.slice(0)
	})
	return a;
}
var j;
function floydWarshall(nodes,edges) {
	var a=[],b=[];

	//n=nodes.map(function(v) {return v.node;})
	console.log(nodes);
	// initializing the array
	nodes.forEach(function(i) {
		a.push(nodes.map(function(j) {return (i==j)?0:Infinity;}));
	})

	edges.forEach(function(e,i) {j=i;
		a[e.start][e.end]=e.length
	})
	console.log("array initialized.")
	nodes.slice(1,nodes.length).forEach(function(k) {
		b=a.slice(0);
		console.log(k);
		nodes.forEach(function(i) {
			nodes.forEach(function(j) {
				d3.select(".container").html(i+" "+j+" "+k)
				a[i][j]=d3.min([
					b[i][j], 
					b[i][k]+b[k][j]
				])
			})
		})
	})
	console.log("done")
	return a;
}