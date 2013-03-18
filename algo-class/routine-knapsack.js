var A,text,lastv,lastw,a;
var a=[];
d3.text("knapsack2.txt",function(error,raw) {
	text=raw.split("\n").slice(1,501);
	console.log(text.length);
	sack=[];
	WL=d3.range(2000001);
	b=WL.map(function() {return 0;})
	
	
	text.forEach(function (t,i) {
		var couple=t.split(" ");
		lastv=v=+couple[0];
		lastw=w=+couple[1];
		//console.log(v,w);
		a=[];
		WL.forEach(function(x) {
			if(x<w) {
				//console.log(i,x);
				a.push(b[x]);
			}
			else {
				a0=b[x];
				a1=b[x-w]+v;
				//if(a1>a0) {console.log(i,x,a1,A[i][x-w],v,w,a0)}
				a.push(d3.max([a0,a1]))
			}
		})
		b=a.slice(0);
		console.log(i);
	})
	console.log("result:",d3.max(a)); 
})