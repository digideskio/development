/*
Prime factorization diagram

Inspired by:
http://blog.jgc.org/2012/04/make-your-own-prime-factorization.html

LICENSE: GPLv2
*/
var factorize = _.memoize(function(number) {
  var factors = [],
      tested = 2;
  
  while (number > 1) {
    while (!(number % tested)) {
      factors.push(tested);
      number /= tested;
      // skip some steps here
      return factors.concat(factorize(number));
    }
    tested++;      
  }
  return factors;
})

var x=0,y=0,N=2000;
    matrix=[];
    var d=0;
    var step=0;
    var stepMax=1;
    var turn=0;
    var directions=[[1,0],[0,1],[-1,0],[0,-1]];
    d3.range(N).forEach(function(i) {
        matrix.push([x,y]);
        x+=directions[d][0];
        y+=directions[d][1];
        step++;
        if (step==stepMax){
           d++;
           step=0;
           if(d==4){d=0;}
           turn++;
           if(turn==2){
               turn=0;
               stepMax++;
           }
        }
    });
    var AllFactors=d3.range(N).map(factorize);
    
    
var nudge = 20,
    win_w = $(window).width() - nudge,
    win_h = $(window).height() - 3*nudge,
    
    // see below for scrolling stuff
    scroll = d3.select("#chart").append("svg").attr("transform","translate(0,100)")
        .attr("width", win_w)
        .attr("height", 40),
    
    svg = d3.select("#chart").append("svg").attr("transform","translate(40,100)")
        .attr("width", win_w)
        .attr("height", win_h),

    colors = d3.scale.category20(),

    max_n = 10,
    cols, cell_size, arc, rows,matrix,
        
    numbers = [];
    

function update_numbers(){   
    cols = Math.ceil(Math.sqrt(max_n-1));
    rows = Math.ceil((max_n-1)/cols);
    cell_size = Math.min(win_w, win_h) / cols;
            
    arc = d3.svg.arc()
        .outerRadius((cell_size / 2)-1)
        .innerRadius(0);
    numbers=AllFactors.slice(0,max_n);
}

function make_pie(factors, idx) {
    
    var $this = d3.select(this),
        pie = d3.layout.pie(factors),
        wedges = $this.selectAll(".arc")
            .data(pie),
        txt = $this.selectAll("text")
            .data([idx + 1]);

    wedges.enter().append("path")
        .attr("class", "arc")
        .style("opacity",function() {return factors.length>1?.2:1;})
        .style("fill", function(datum, idx){
            return colors(factors[idx]);
         })
        
    wedges.transition()
        .attr("d", arc);

   txt.enter().append("text")
        .text(idx+1)
       //.style("fill",function() {return factors.length>1?"white":"black";})
        .attr("dy", ".35em");
   
   txt.transition()
       .style("font-size", cell_size / 3);
}

function col_row_tx(datum, idx, x, y){
    //x = (x || ((idx % cols)+.5)) * cell_size;
    //y = (y || (Math.floor(idx / cols) + .5)) * cell_size;
    x=((x||matrix[idx][0])+~~(cols/2)-.5)*cell_size;
    y=((y||matrix[idx][1])+~~(cols/2)-.5)*cell_size;
    return "translate(" + x + "," + y + ")"; 
}
       
function update(){
    
    update_numbers();
    var pies = svg.selectAll(".number")
        .data(numbers);

    pies.enter().append("g")
        .attr("class", "number")
        .attr("transform", function(datum, idx) {
            return col_row_tx(datum, idx, win_w * 1.1);
        });

    pies.exit().transition()
        .duration(1000)
        .attr("transform", function(datum, idx) {
            return col_row_tx(datum, idx, 0, win_h * 1.1);
        })
        .remove()
    
    pies.transition()
        .duration(1000)
        .attr("transform", col_row_tx);
    
    pies.each(make_pie);
}

update_numbers();
update()

// install events    
$("#max_n").bind("blur", update);
$("#scroll").bind("scroll", update);

// silly scrollbar thing
var dragmove = function(datum, i) {
      datum.x += d3.event.dx;
      d3.select(this)
          .attr("transform", 
                "translate(" + datum.x + "," + datum.y + ")");

      scroll.selectAll("text")
          .text("Prime factorization of the first "+datum.x+" numbers")
    },
    
    dragend = function(datum, idx){
      max_n = datum.x
      update();
    },
    
    drag = d3.behavior.drag()
        .on("drag", dragmove)
        .on("dragend", dragend),
       
    scroller = scroll.selectAll("#scroll")
        .data([{x: 10, y: 0}])
      .enter().append("circle")
        .attr("id", "scroll")
        .attr("cy", 30)
        .attr("cx", 10)
        .attr("r", 10)
        .style("fill", "#ccc")
        .call(drag),
    
    label = scroll.selectAll("text")
          .data([1]);

    label.enter()
          .insert("text")
          .attr("class", "scroll")
          .attr("dy", "1em")
          .text("Prime factorization of the first "+max_n+" numbers");
