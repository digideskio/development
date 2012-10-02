debug=true;
function sortAndCount(A) {
	var n=A.length;
	if(debug){console.log("sortAndCount - "+A);}
	if (n<=1) {if(debug){console.log("too short - returning 0");}
		   return {array:A,inversions:0};}
	else
		{
			var m=~~(n/2);
			var B=sortAndCount(A.slice(0,m));
			var C=sortAndCount(A.slice(m,n));
			var D=countSplitInv(B.array,C.array);
			var x=B.inversions,y=C.inversions,z=D.inversions;
			if(debug){console.log("sortAndCount on "+A+" returned "+(x+y+z)+" inversions.");}
			return {array:D.array,inversions:x+y+z};
		}
}

function countSplitInv(B,C) {
	if(debug){console.log("countSplitInv "+B+" "+C);}
	var m=B.length;
	var n=m+C.length;
	
 	if(debug){console.log("this splits A in "+B+" and "+C);}
	
	var i=0;
	var j=0;
	var s=0;
	var D = [], k = n;
	while (k--) {
	  D[k] = 0;
	}
	D.forEach(function(d,k) {
		if ((i<m)&&((B[i]<C[j])||(j>=(n-k))))
			{D[k]=B[i];
			 if(debug){console.log("here "+B[i]+" was the smallest. Only "+(m-i)+" elements left in B.");}
			 i++;
			 }
		else
			{D[k]=C[j];
			 if(i<m){
			 	if(debug){console.log("here "+C[j]+" is smaller than "+B[i]+". There remains "+(m-i)+" elements in B. so s increases by "+(m-i)+".");}
			 	s+=(m-i);
			 } else {if(debug){console.log("No more elements in B. We're adding an element from C:"+C[j]);}
			 }
			 j++;
			}
	})
	if(debug){console.log("found "+s+" split inversions.");}
	return {array:D,inversions:s};
}

function bruteInversions(A) {
  var inv_count = 0;
  var n=A.length;
  var i, j;
 
  for(i = 0; i < n - 1; i++)
    for(j = i+1; j < n; j++)
      if(A[i] > A[j])
        inv_count++;
 
  return inv_count;
}
