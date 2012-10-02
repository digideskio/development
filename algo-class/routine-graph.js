
function DFS_init(nodes,edges,startVertex) {	
	var explored={};
	nodes.forEach(function(d) {explored[d]={explored:false};});
	DFS(nodes,edges,startVertex);
	
	function DFS(nodes,edges,startVertex) {
		console.log(startVertex);
		explored[startVertex].explored=true;
		edges.filter(function(d) {return d[0]==startVertex&&(!explored[d[1]].explored);}).forEach(function(d) {DFS(nodes,edges,d[1]);});
	}
}
var explored={};
var finishingTime={};
var finishingHash={};
var leaders=[]
function kosaraju(debug) {
	var t=0;
	var s=undefined;
	explored={};finishingTime={};finishingHash={};leaders=[];
	//var finishingTime={};
	
	// Pass 1
	
	//var explored={};
	nodes.forEach(function(d) {explored[d]={explored:false};});
	
	nodes.reverse().forEach(function(n) {
		if (!explored[n].explored)	{
			s=n;
			if(debug){console.log("leader: "+s);}
			DFSr(n);}
	})		
	console.log("pass 1 complete.")
	// Pass 2
	nodes.forEach(function(d) {explored[d]={explored:false};});
	//var leaders=[]
	
	// note: nodes are still in reverse order. reverse() changed their order.
	
	nodes.forEach(function(n) {
		if (!explored[finishingHash[n]].explored)	{
			if(debug){console.log("node "+finishingHash[n]+" (finishing time: "+n+") unexplored.");}
			s=finishingHash[n];
			leaders.push(s);
			DFS(finishingHash[n]);}
	})
	
	leaders.forEach(function(l) {
		console.log("leader: "+l);
		var SCC=d3.keys(explored).filter(function(d) {return explored[d].leader==l;})
		if(debug){SCC.forEach(function(d) {console.log(d);})}
		console.log(SCC.length);
	})
	
	function DFSr(startVertex) {
		if(debug){console.log("Running DFS for "+startVertex);}
		explored[startVertex].explored=true;
		//explored[startVertex].leader=s;
		edges.filter(function(d) {return d[1]==startVertex&&(!explored[d[0]].explored);}).forEach(function(d) {DFSr(d[0]);});
		t++;
		//explored[startVertex].f=t;
		finishingTime[startVertex]=t;
		finishingHash[t]=startVertex;
		if(debug){console.log(startVertex+" gets running time "+t);}
	}
	
	function DFS(startVertex) {
		if(debug){console.log(" node "+startVertex+" (finishing time: "+finishingTime[startVertex]+" has leader "+s);}
		explored[startVertex].explored=true;
		explored[startVertex].leader=s;
		edges.filter(function(d) {
			return d[0]==startVertex&&(!explored[d[1]].explored);
		}).forEach(function(d) {
			if(debug){console.log(" >from there, we explore node "+d[1]+" (finishing time: "+finishingTime[d[1]]+")");}
			DFS(d[1]);
		});
		if(debug){console.log("done for node "+startVertex+" (finishing time: "+finishingTime[startVertex]+".");}
		
	}
}