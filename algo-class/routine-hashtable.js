var targets=[231552,234756,596873,648219,726312,981237,988331,1277361,1283379];
targets.forEach(function(t) {
	var hash={};
	//insert
	var found=ints.some(function(i) {
		if (!(i in hash)) {
			hash[i]=0;
			if ((t-i) in hash) {
				console.log(t+"= "+i+"+"+(t-i));
				return true;
			}
		}
	})
	if (!found) {console.log("no sum found for "+t);}
})
