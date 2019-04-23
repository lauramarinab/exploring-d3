const divPathLineSvg = document.getElementById("pathLineSvg");

const pathLineDataArray = [
  { x: 10, y: 200 },
  { x: 50, y: 40 },
  { x: 90, y: 60 },
  { x: 120, y: 140 },
  { x: 180, y: 120 },
  { x: 220, y: 200 }
];

const pathLineSvg = d3
  .select(divPathLineSvg)
  .append("svg")
  .attr("height", "100%")
  .attr("width", "100%");

const linePathA = d3
  .line()
  .x((d, i) => d.x)
  .y((d, i) => d.y)
  .curve(d3.curveNatural);

pathLineSvg
  .append("path")
  .attr("d", linePathA(pathLineDataArray))
  .attr("fill", "none")
  .attr("stroke", "#BF5967")
  .attr("stroke-width", "2");

pathLineSvg
  .selectAll("circle")
  .data(pathLineDataArray)
  .enter()
  .append("circle")
  .attr("cx", (d, i) => d.x)
  .attr("cy", (d, i) => d.y)
  .attr("r", 4)
  .attr("fill", "#BF5967");
