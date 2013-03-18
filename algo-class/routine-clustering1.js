nodes=d3.range(501).map(function(d) {return {node:d,cluster:d};});
clusters=d3.range(501).map(function(d) {return [d];})
edges=[];
nbClusters=500;
maxLength=Infinity;
var edge;
d3.text("clustering1.txt",function(error,text) {
	text=text.split("\n");
	text.forEach(function(t,i) {
		if(i) {
			var edge=t.split(" ");
			edges.push(edge);
		}
	})
	edges.sort(function(a,b) {return a[2]-b[2];})
	maxLength=edges
	console.log("ready.")
	var i=0;
	while (nbClusters>4&&i<edges.length)
		{
			var edge=edges[i];
			e0=edge[0],e1=edge[1];
			c0=find(e0),c1=find(e1);

			if(c0===c1) 
				{i=i+1}
			else {
				console.log("found edge between",e0," (in cluster ",c0," (",clusters[c0].length,")) and ",edge[1]," (in cluster "+find(edge[1])+" (",clusters[c1].length+"))")
				console.log("merging clusters ",find(edge[0])," and ",find(edge[1]));
				var large=union(find(edge[0]),find(edge[1]));
				console.log("cluster ",large," has now ",clusters[large].length," nodes.")
				console.log("...")
				nbClusters=nbClusters-1;
				i=i+1;
			}
		}

			var edge=edges[i];
			e0=edge[0],e1=edge[1];
			c0=find(e0),c1=find(e1);
			console.log(i,e0,e1,c0,c1);
			if(c0!==c1){console.log(c0,c1,edge[2])}
			else {
				while (c0==c1) {
					i=i+1;console.log(i);
					var edge=edges[i];
					e0=edge[0],e1=edge[1];
					c0=find(e0),c1=find(e1);
					if(c0!==c1){console.log(c0,c1,edge[2])}
				}
			}
	

})

function find(node) {
	return nodes[node].cluster;
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
