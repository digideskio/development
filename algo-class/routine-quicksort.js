debug=false;
if(debug) {A=[3,8,2,5,1,4,7,6];}

var comparisons;

function quicksort1(A) {
	comparisons=0;
	quicksort(A,0,A.length-1,0);
	console.log(comparisons);
}

function quicksort2(A) {
	comparisons=0;
	quicksort(A,0,A.length-1,1);
	console.log(comparisons);
}

function quicksort3(A) {
	comparisons=0;
	quicksort(A,0,A.length-1,2);
	console.log(comparisons);
}


function quicksort(A,l,r,method) {
 if (r-l<1) {if(debug){console.log("nothing to sort.");};return;}
 var newP=partition(A,l,r,method);
 if(debug){console.log("the pivot is now on position "+newP+" (starting from 0) ->"+A[newP]);}
 if(debug){console.log("calling quicksort for the left-most part of the subarray ["+l+","+r+"]: ["+l+","+(newP-1)+"]");}
 quicksort(A,l,newP-1,method);
 if(debug){console.log("calling quicksort for the right-most part of the subarray ["+l+","+r+"]: ["+(newP+1)+","+r+"]");}
 quicksort(A,newP+1,r,method);
}


function partition(A,l,r,method) {
	if(debug) {console.log("Partitioning: ["+l+","+r+"] ("+JSON.stringify(A.slice(l,r+1))+")");console.log("adding "+(r-l)+" comparisons for a total of "+(comparisons+(r-l)));}
	comparisons+=(r-l);
	var p;
	if(method==0){	// pivot is always first element
		p=A[l];
	} else if(method==1) { // pivot is always last element
		p=A[r];
		A=swap(A,l,r);
	} else if(method==2) {	// pivot is chosen using median-of-three method
		var m=l+~~((r-l)/2);
		if(debug){console.log("median of three. we choose among the elements in the "+l+", "+m+", and "+r+"-th position ("+A[l]+", "+A[m]+", "+A[r]+")");}
		if(A[l]<A[r])	{
			if(A[m]>A[r]) {
				p=A[r];A=swap(A,l,r);
			} else {
				if(A[m]>A[l]) {
					p=A[m];A=swap(A,l,m);
				} else {
					p=A[l];
				}
			}	
		} else {
			if(A[m]>A[l]) {
				p=A[l];
			} else {
				if(A[m]>A[r]) {
					p=A[m];A=swap(A,l,m);
				} else {
					p=A[r];A=swap(A,l,r);
				}
			}	
		}
		
		if(debug){console.log("median is "+p+".");}
	}
		
	var i=l+1;
	for (j=l+1;j<=r;j++) {
		if(A[j]<p) {
			A=swap(A,i,j);
			i++;
		}
	}
	A=swap(A,l,i-1);
	if(debug){console.log("The array now looks like: "+JSON.stringify(A));}
	return i-1;
}

function swap(A,i,j) {
	var dummy=A[j];
	A[j]=A[i];
	A[i]=dummy;
	return A;}
	
	
	
/*Array.prototype.swap=function(a, b)
	{
		var tmp=this[a];
		this[a]=this[b];
		this[b]=tmp;
	}

function quick_sort(array)
{	var comparisons=0;
	qsort(array, 0, array.length);
	
	function partition(array, begin, end, pivot)
	{
		var piv=array[pivot];
		array.swap(pivot, end-1);
		var store=begin;
		var ix;
		for(ix=begin; ix<end-1; ++ix) {
			if(array[ix]<=piv) {
				array.swap(store, ix);
				++store;
			}
		}
		array.swap(end-1, store);
	
		return store;
	}
	
	
	function qsort(array, begin, end)
	{	comparisons+=(end-begin);
		if(end-1>begin) {
			var pivot=begin;//+Math.floor(Math.random()*(end-begin));
	
			pivot=partition(array, begin, end, pivot);
	
			qsort(array, begin, pivot);
			qsort(array, pivot+1, end);
		}
	}
	console.log(comparisons);

}*/