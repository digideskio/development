line2points=function(a,b) {
	var x1=a.x,x2=b.x;
	if (x1==x2) {x2+=.00001} // avoid div/0
	var m=(b.y-a.y)/(x2-x1);
		
	return [m,a.y-x1*m]
}

distPointLine=function(a,l) {
	var m=l[0],b=l[1];
	return Math.abs(a.y-m*a.x-b)/Math.sqrt(m*m+1);
}

dist3points=function(a,b,c) {
	var CH=distPointLine(c,line2points(a,b))
	var AC=Math.sqrt((c.x-a.x)*(c.x-a.x)+(c.y-a.y)*(c.y-a.y))
	var BC=Math.sqrt((c.x-b.x)*(c.x-b.x)+(c.y-b.y)*(c.y-b.y))
	return d3.min([AC,BC,CH]);
	
}

isBlocked=function(A,B,C) {
	A=players[A],B=players[B],C=players[C];
	var d;
	if(A.x==B.x){
		d=Math.abs(C.x-A.x);
	} else {
		m=(B.y-A.y)/(B.x-A.x);
		b=A.y-A.x*m;
		d=Math.abs(C.y-m*C.x-b)/Math.sqrt(m*m+1);
	}
	if(d<C.rad) {
		if((C.y>A.y&&C.y<B.y)||(C.y>B.y&&C.y<A.y)) {return true;}
	}
	return false;
}
		
