d3.csv("edges.txt",function(edges) {
	edges.forEach(function(e,i) {e.id=i;e.length=+e.length;})
	edges.sort(function(a,b) {return a.length-b.length;}) // ascending order
	var X=[edges[0].start,edges[0].end];
	var E=[edges[0]];
	var L=edges[0].length;
	while (X.length<500) {
		edges.some(function(e) {
			if (X.indexOf(e.start)>-1&&X.indexOf(e.end)<0) { // tail in MST, not head
				X.push(e.end);
				E.push(e);
				L=L+e.length;
				console.log("Adding ",e.end," - link of length ",e.length," (",L,")")
				return true // no need to scan through the other edges
			}
		})
	}



	})