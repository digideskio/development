nodes=d3.range(20000).map(function(d) {return {node:d,cluster:d};});
clusters=d3.range(20000).map(function(d) {return [d];})
edges=[];
nbClusters=20000;
//maxLength=Infinity;
var edge;
d3.text("clustering2.txt",function(error,text) {
	//text="0 1 0 0 1 1 1 1 0 0 0 0 1 0 1 1 0 0 0 0 0 0 0 1;0 0 0 1 1 1 1 1 0 0 1 1 0 1 1 0 0 0 0 0 1 1 0 1;1 0 1 1 0 1 0 1 1 0 1 1 1 0 1 0 1 0 1 1 0 1 1 1;0 0 0 0 1 0 1 0 0 0 1 1 0 1 1 1 1 1 1 0 1 1 1 0;1 0 0 1 0 0 0 0 0 0 1 1 0 0 1 1 1 1 0 1 0 0 1 1;0 0 0 1 1 1 0 0 1 1 1 1 1 1 0 0 0 0 0 1 0 1 1 0;0 1 1 0 0 0 0 0 0 0 1 1 1 0 0 1 0 0 1 1 1 1 1 1;1 0 1 0 0 0 0 0 0 0 1 0 0 1 1 1 0 1 1 0 0 0 0 1;0 0 1 0 1 1 0 0 1 1 1 1 1 1 1 1 1 0 1 0 1 0 0 1;1 0 0 1 0 1 1 1 0 1 1 0 1 1 1 1 0 0 1 0 1 0 1 1;1 1 1 0 1 1 1 0 1 1 1 0 1 1 1 1 0 0 0 1 0 0 0 0;0 1 0 0 0 0 0 1 1 1 1 1 0 1 1 1 1 0 1 1 0 0 1 0;1 1 0 0 0 1 0 1 0 1 1 1 0 0 1 1 0 0 0 1 1 0 1 0;1 1 0 0 0 0 1 0 0 1 1 0 1 1 0 1 0 0 1 1 0 0 1 1;0 1 1 1 1 0 1 0 1 0 0 1 1 1 1 0 0 1 0 0 1 0 1 0;1 1 1 0 1 1 0 1 1 0 1 1 0 1 0 0 1 0 0 1 1 0 1 1;1 1 0 0 0 1 1 1 0 1 0 1 0 1 0 0 1 0 1 0 0 1 1 1;1 1 0 1 1 1 0 1 0 1 0 1 1 1 1 1 1 0 0 1 1 1 1 1;1 0 0 0 1 1 1 0 0 0 0 1 0 0 1 1 0 0 0 1 0 1 1 1;1 1 1 0 0 1 0 0 1 0 1 0 1 1 1 0 0 0 1 1 1 0 1 0;1 0 0 1 0 0 1 0 1 1 0 0 1 1 1 1 0 0 1 1 0 0 1 0;0 1 0 0 0 0 0 1 1 1 1 1 0 1 1 1 1 0 1 1 0 0 1 0;0 0 1 1 0 1 0 1 0 0 1 1 1 0 0 1 0 1 1 0 1 1 0 1;1 0 1 1 0 0 0 0 0 0 0 0 0 1 1 0 0 1 1 0 1 1 0 0;0 1 1 1 0 0 1 0 0 1 1 0 0 0 1 0 1 0 0 0 0 0 1 1;0 1 1 1 0 1 1 0 0 0 1 0 1 1 1 1 0 0 0 1 1 0 0 0;1 1 1 1 1 1 0 1 1 0 1 0 1 0 0 1 0 1 0 1 1 0 0 0;0 1 1 0 1 1 0 1 1 0 0 0 0 1 1 1 1 1 1 0 1 1 0 1;1 0 1 0 1 1 0 1 0 0 0 0 0 1 0 0 1 0 0 0 1 1 0 1;0 0 0 1 0 1 0 0 1 1 0 1 0 0 1 1 0 1 0 0 1 0 1 1;0 0 0 0 1 0 1 1 1 0 1 0 1 0 0 0 1 1 0 0 0 1 1 0;0 0 0 0 1 0 1 1 1 0 1 0 1 0 0 0 0 1 0 0 0 1 1 0;0 0 0 0 1 0 1 1 1 0 1 0 1 0 0 0 0 0 0 0 0 1 1 0;0 0 0 1 0 1 1 1 0 0 0 0 1 0 0 1 1 0 1 0 0 0 0 0;1 1 0 1 0 0 1 0 1 0 0 0 1 1 0 0 1 0 1 0 0 1 0 1;0 1 0 1 1 0 0 1 1 1 1 0 0 1 0 0 0 0 1 1 0 1 0 1;1 1 0 0 1 0 1 0 1 0 1 1 1 0 0 0 0 0 1 0 0 1 1 0;0 1 0 0 1 1 0 1 1 0 1 1 1 0 1 1 0 0 0 0 1 0 0 0;1 1 0 0 1 1 0 0 1 0 0 0 1 0 1 1 0 0 0 1 0 0 1 1;0 0 0 0 0 1 0 1 1 1 1 0 1 0 1 1 1 1 1 1 0 1 1 0;0 0 0 1 0 1 0 0 0 1 0 1 1 1 1 0 1 0 1 0 0 1 0 0;0 1 1 1 0 0 0 0 1 1 0 0 1 1 1 1 0 1 0 0 0 1 0 1;1 0 0 0 1 1 1 1 1 0 0 1 1 0 1 1 0 0 0 1 1 0 1 1;0 0 0 1 1 0 1 0 0 0 0 0 0 0 1 1 0 0 0 0 1 0 0 0;0 0 1 1 1 1 0 1 1 1 1 1 1 0 1 0 1 1 1 1 0 0 1 0;0 0 0 0 1 1 1 1 1 1 1 0 0 1 1 0 1 1 0 0 0 1 0 0;1 0 1 1 0 0 0 1 0 1 1 1 0 1 0 0 0 0 1 1 0 1 0 1;1 1 1 1 0 1 1 1 1 0 0 0 0 0 0 1 0 1 1 0 0 0 1 1"
	text=text.split("\n").slice(1,20001);
	text.forEach(function(t,i) {
		
			nodes[i].bits=t.split(" ");
		
	})

	nodes.forEach(function(n1,i) {
		nodes.slice(i+1,20001).forEach(function(n2) {
			if(n1!=n2&&n1.bits&&n2.bits) {
				var maxBits=0;
				n1.bits.some(function(b,i) {
					if(b!=n2.bits[i]) {maxBits=maxBits+1};
					if(maxBits>2) {//console.log(n1.node,n2.node,maxBits);
						return true;}
				})
				if(maxBits<3) {edges.push({start:n1.node,end:n2.node,cost:maxBits})}
			}
		})
	})
	console.log("graph drawn.")
	//console.log(edges.length);
	edges.sort(function(a,b) {return a.cost-b.cost;})
	console.log("edges sorted.")
	/*
	d3.csv("edges-clustering2.txt",function (error, myedges) {
		edges=myedges;*/
		console.log("ready.")
		edges=edges.filter(function(d) {return +d.cost<3;})
	var i=0,j=0;
	while (i<edges.length)
		{
			var edge=edges[i];
			e0=edge.start,e1=edge.end;

			c0=find(e0),c1=find(e1);

			if(c0===c1) 
				{j=j+1;i=i+1}
			else {
				//console.log("found edge between",e0," (in cluster ",c0," (",clusters[c0].length,")) and ",edge[1]," (in cluster "+find(edge[1])+" (",clusters[c1].length+"))")
				//console.log("merging clusters ",c0," and ",c1);
				var large=union(c0,c1);
				//console.log("cluster ",large," has now ",clusters[large].length," nodes.")
				//console.log("...")
				nbClusters=nbClusters-1;
				i=i+1;
				if(!(i%100)) {console.log(i,nbClusters)}
			}
		}
		console.log("clusters left:",nbClusters);	
	//console.log(j);
	//});
	
	
})

function find(node) {
	if(typeof(nodes[node])==="undefined") {console.log("No node #"+node)} else {
	return nodes[node].cluster;}
}

function union(c1,c2) {
	var small,large;
	if (clusters[c1].length<clusters[c2].length) {small=c1;large=c2} else {small=c2;large=c1;}
	clusters[small].forEach(function(node) {
		nodes[node].cluster=large;
		clusters[large].push(node);
	})
	clusters[small]=[];
	return large;
}
