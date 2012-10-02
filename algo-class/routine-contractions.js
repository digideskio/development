var nodes=d3.range(40);
var edges=[];
list.forEach(function(a,i) {a.forEach(function(b,j) {
	if(i<(b-1)) {edges.push([i,b-1]);}
});})

edges.sort(function() {return Math.random()-.5;})

reduceEdge(nodes,edges)

function reduceEdge() {
	var myEdge=edges[0].slice()
	console.log("removing edge "+myEdge[0]+"-"+myEdge[1]);
	
	//edges=edges.splice(1,edges.length);
	
	
	console.log(myEdge[0]+" goes.")
	nodes=nodes.filter(function(n) {return n!=myEdge[0];})
	console.log(JSON.stringify(nodes))
	console.log(nodes.length)
	
	console.log("now replacing "+myEdge[0]+" by "+myEdge[1]+" in all edges.")
	
	var updatedEdges=0;
	
	edges.forEach(function(d) {
		if(d[1]==myEdge[0]){
			d[1]=myEdge[1];
			updatedEdges++
		}
		if(d[0]==myEdge[0]){
			d[0]=myEdge[1];
			updatedEdges++
		}
	})
	
	console.log(updatedEdges+" updated.")
	l=edges.length;
	edges.filter(function(d) {return d[0]==d[1];}).forEach(function(d) {console.log(d[0]+"-"+d[1]+" removed.");})
	edges=edges.filter(function(d) {return d[0]!=d[1];});
	console.log((l-edges.length)+" self-loop"+((l-edges.length>1)?"s":"")+" removed.");
	console.log("nodes:"+nodes.length+" edges:"+edges.length)
	if(nodes.length>2){reduceEdge();}
	else{console.log(edges.length);}
}


