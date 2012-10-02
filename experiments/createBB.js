var margin = {top: 0, right: 0, bottom: 0, left: 0},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var projection = d3.geo.mercator()
    .scale(width)
    .translate([width / 2, height / 2]);

var mode=0;

var path = d3.geo.path()
    .projection(projection);

var zoom = d3.behavior.zoom()
    .translate(projection.translate())
    .scale(projection.scale())
    .scaleExtent([height, 8 * height])
    .on("zoom", move);

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(zoom);

var g = svg.append("g");
var perimeter=g.append("path").style("stroke","black").style("stroke-width",2).attr("id","perimeter");

svg.append("rect")
    .attr("class", "frame").style("fill","white").style("opacity","0.001")
    .attr("width", width)
    .attr("height", height);

var perimeterCoords=[];
d3.csv("parisLimits.csv",function(c) {
  perimeterCoords=c;
  perimeter.attr("d",function() {return myPerimeter();})
});

function myPerimeter() {
  var projectedCoords=[];
  perimeterCoords.forEach(function(c) {
    projectedCoords.push(projection([+c.lon,+c.lat]));
  })
  return "M" + projectedCoords.join("L") + "Z";
}

function move() {
  var t = projection.translate,
      s = projection.scale;
      console.log(s);

      var tx = t[0] * d3.event.scale + d3.event.translate[0];
      var ty = t[1] * d3.event.scale + d3.event.translate[1];
      projection.translate([tx, ty]);

      // now we determine the projection's new scale, but there's a problem:
      // the map doesn't 'zoom onto the mouse point'
      projection.scale(s * d3.event.scale);
  //t[0] = s;//Math.max(-s / 2, Math.min(width + s / 2, t[0]));
  //t[1] = s;//Math.max(-s / 2, Math.min(height + s / 2, t[1]));
  //zoom.translate(t);
  //projection.translate(t).scale(s);
  perimeter.attr("d", myPerimeter);
  
}
/*minPX=d3.min(perimeterCoords,function(d) {return projection([+d.lon,+d.lat])[0];});
maxPX=d3.max(perimeterCoords,function(d) {return projection([+d.lon,+d.lat])[0];});
minPY=d3.min(perimeterCoords,function(d) {return projection([+d.lon,+d.lat])[1];});
maxPY=d3.max(perimeterCoords,function(d) {return projection([+d.lon,+d.lat])[1];});
box=[[minPX,minPY],[maxPX,maxPY]];
getScaleTranslate(projection,box,0,0,450,500);


function getScaleTranslate(projection,box,left,top,right,bottom)
{
  projection.scale(1).translate([0,0]);
  var startbox=[[left,top],[right,bottom]];
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
*/