edges=[]
d3.text("SCC.txt", function(txt) { 
   edge=txt.split(" ");
   edge[0]=parseInt(edge[0]);
   edge[1]=parseInt(edge[1]);
   edges.push(edge);
 });
 
 console.log(edges.length);
 