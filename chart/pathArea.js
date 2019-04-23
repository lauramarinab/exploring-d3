const divPathAreaSvg = document.getElementById("pathAreaSvg");

const pathAreaDataArray = [14, 35, 56, 67, 99, 122, 150, 160, 200, 350, 120, 50];
const dataMonths = d3.range(1, 13);

const curveTypes = [d3.curveCardinal, d3.curveBasis, d3.curveLinear, d3.curveStep, d3.curveNatural, d3.curveBundle];

let height = 400;
let width = 800;

const pathAreaSvg = d3
  .select(divPathAreaSvg)
  .append("svg")
  .attr("height", "100%")
  .attr("width", "100%");

const parseMonth = d3.timeParse("%m");

const y = d3
  .scaleLinear()
  .domain([0, 400])
  .range([height, 0]);

const x = d3
  .scaleTime()
  .domain([d3.min(dataMonths, d => parseMonth(d)), d3.max(dataMonths, d => parseMonth(d))])
  .range([0, width]);

const yAxis = d3
  .axisLeft(y)
  .ticks(4)
  .tickSize(10)
  .tickPadding(5);

const xAxis = d3
  .axisBottom(x)
  .tickSize(10)
  .tickPadding(5);

const areaPath = d3
  .area()
  .x((d, i) => x(parseMonth(dataMonths[i])))
  .y0(height)
  .y1(d => y(d))
  .curve(curveTypes[4]);

const chartAndLinesGrp = pathAreaSvg.append("g").attr("transform", "translate(40,30)");
const circleGrp = pathAreaSvg.append("g").attr("transform", "translate(40,30)");

chartAndLinesGrp
  .append("path")
  .attr("d", areaPath(pathAreaDataArray))
  .attr("fill", "none")
  .attr("stroke", "#97A676")
  .attr("stroke-width", 3);

chartAndLinesGrp
  .append("g")
  .attr("class", "yAxis")
  .call(yAxis);

chartAndLinesGrp
  .append("g")
  .attr("class", "xAxis")
  .call(xAxis)
  .attr("transform", `translate(0,${height})`)
  .selectAll(".tick text")
  .attr("x", -18)
  .attr("dy", -13);

circleGrp
  .selectAll("circle")
  .data(pathAreaDataArray)
  .enter()
  .append("circle")
  .attr("cx", (d, i) => x(parseMonth(dataMonths[i])))
  .attr("cy", d => y(d))
  .attr("r", 5)
  .attr("fill", "#5c6d39");
