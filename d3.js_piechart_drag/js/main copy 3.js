const data = [
  { name: "外包", value: 3000 },
  { name: "金融", value: 4754 },
  { name: "制造", value: 1120 },
  { name: "咨询", value: 4032 }
];

var width = 450,
    height = 450,
    margin = 40;
const svg=d3.select("#piechart")
.append("svg")
  .attr("width", width)
  .attr("height", height);

const pieData = d3.pie()
    .value((d) => d.value)
    .sort((a, b) => a.value - b.value)(data);

const arc = d3.arc().innerRadius(0).outerRadius(100);
const color = d3.scaleOrdinal(d3.schemeCategory10);


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
    .attr("transform", "translate(100, 100)")
    .selectAll("path")
    .data(pieData)
    .call(
      d3.drag()
        .on("drag", (event, d) => (d.x = event.x, d.y = event.y))
    );
function update() {
  voronoi = d3.Delaunay.from(g, d => d.x, d => d.y).voronoi([0, 0, width, height]);
  circle.attr("transform", d => `translate(${d.x},${d.y})`);
  cell.attr("d", (d, i) => voronoi.renderCell(i));
}
arcGroup1.join("path")
    .attr("fill", (d, i) => color(i))
    .attr("d", arc);
