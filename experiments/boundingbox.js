function getScaleTranslate(projection,box,left,top,right,bottom)
{
	projection.scale(1).translate([0,0]);
	var startBox=[[left,top],[right,bottom]];
	function width(bb) {
	        return (bb[1][0] - bb[0][0])
	}
	function height(bb) {
	        return (bb[1][1] - bb[0][1]);
	}
	function aspect(bb) {
		return width(bb) / height(bb);
    	}
	a1 = aspect(startbox),
	        a2 = aspect(box),
	        widthDetermined = a1 > a2,
	        scale = widthDetermined ?
	            // scale determined by width
	            width(box) / width(startbox) :
	            // scale determined by height
	            height(box) / height(startbox),
	        // set x translation
	        transX = box[0][0] - startbox[0][0] * scale,
	        // set y translation
        transY = box[0][1] - startbox[0][1] * scale;
        console.log([scale,transX,transY])
        return projection.scale(scale).translate([transX,transY]);
}