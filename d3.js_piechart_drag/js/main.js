const data = [
  { name: "外包", value: 3000 },
  { name: "金融", value: 4754 },
  { name: "制造", value: 1120 },
  { name: "咨询", value: 4032 }
];

var width = 450,
    height = 450,
    outRadius=100,
    outRadius1=60;

const svg=d3.select("#piechart")
.append("svg")
  .attr("width", width)
  .attr("height", height);

const pieData = d3.pie()
    .value((d) => d.value)
    .sort((a, b) => a.value - b.value)(data);

const arc = d3.arc().innerRadius(0).outerRadius(outRadius);
const arc1 = d3.arc().innerRadius(0).outerRadius(outRadius1);
const color = d3.scaleOrdinal(d3.schemeCategory10);
const color1 = d3.scaleLinear().domain([1,3])
.range(["green", "yellow"]);



const arcGroup = svg.append("g")
    .attr("id", "g1")
    .attr("transform", "translate(300, 300)")
    .selectAll("path")
    .data(pieData);


arcGroup.join("path")
    .attr("fill", (d, i) => color(i))
    .attr("d", arc);

const arcGroup1 = svg.append("g")
    .attr("id", "g2")
    .attr("transform", "translate(120, 100)")
    .call(
      d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended)
    )
    .selectAll("path")
    .data(pieData)
    ;
arcGroup1.join("path")
    .attr("fill", (d, i) => color1(i))
    .attr("d", arc1)
    ;

function update() {
  voronoi = d3.Delaunay.from(g, d => d.x, d => d.y).voronoi([0, 0, width, height]);
  circle.attr("transform", d => `translate(${d.x},${d.y})`);
  cell.attr("d", (d, i) => voronoi.renderCell(i));
}




function dragstarted(_event) {
    d3.select(this).raise().classed("active", true);
}

function dragged(event) {
    d3.select(this).attr("transform", "translate("+event.x+","+event.y+")");
    

}


function dragended(event) {
  const another_x= d3.select("#g1").attr("transform").match(/(?<=\()\d{1,}(?=\,)/);
  const another_y= d3.select("#g1").attr("transform").match(/\d{1,}(?=\))/);
  const a=another_x-event.x;
  const b=another_y-event.y;
  var distance=Math.sqrt( a*a + b*b );
  console.log(another_x);
  console.log(another_y);
  console.log(distance);
  if (distance<Math.abs(outRadius+outRadius1)){
    d3.select(this).attr("transform", "translate("+d3.select("#g1").attr("transform").match(/(?<=\()\d{1,}(?=\,)/)+","+d3.select("#g1").attr("transform").match(/\d{1,}(?=\))/)+")");
  }
  d3.select(this).classed("active", false);
}
