const divLinechart = document.getElementById("linechart");

const data = [
  { nameTick: "Frame 1", valueY: 100 },
  { nameTick: "Frame 2", valueY: 120 },
  { nameTick: "Frame 3", valueY: 70 },
  { nameTick: "Frame 4", valueY: 40 },
  { nameTick: "Frame 5", valueY: 130 },
  { nameTick: "Frame 6", valueY: 180 }
];

const linechartSvg = d3
  .select(divLinechart)
  .append("svg")
  .attr("height", "100%")
  .attr("width", "100%");

const linechartGrp = linechartSvg.append("g").attr("transform", "translate(40,20)");
const circleGrp2 = linechartSvg.append("g").attr("transform", "translate(40,20)");

const allValue = data.map(d => d.valueY);
const allName = data.map(d => d.nameTick);

let h = 400;
let w = 500;

const yLine = d3
  .scaleLinear()
  .domain([0, 200])
  .range([h, 0]);

const yAxisLine = d3
  .axisLeft(yLine)
  .tickSize(10)
  .ticks(10);

const maxRange = (allName.length - 1) * 70;

const xLine = d3
  .scalePoint()
  .domain(allName)
  .range([0, maxRange]);

const xAxisLine = d3.axisBottom(xLine);

const color = d3.scaleSequential(d3.interpolateRainbow).domain([0, 10]);

const divTooltip = d3
  .select(divLinechart)
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

const initialArea = d3
  .area()
  .x((d, i) => i * 70)
  .y0(d => yLine(d.valueY))
  .y1(h)
  .curve(d3.curveNatural);

const area = d3
  .area()
  .x((d, i) => i * 70)
  .y0(h)
  .y1(d => yLine(d.valueY))
  .curve(d3.curveNatural);

const initialiLine = d3
  .line()
  .x((d, i) => i * 70)
  .y(h)
  .curve(d3.curveNatural);

const linePath = d3
  .line()
  .x((d, i) => i * 70)
  .y(d => yLine(d.valueY))
  .curve(d3.curveNatural);

linechartGrp
  .append("path")
  .attr("d", area(data))
  .attr("fill", "#b8c79860")
  .transition()
  .duration(2000)
  .attr("d", initialArea(data));

linechartGrp
  .append("path")
  .attr("d", initialiLine(data))
  .attr("fill", "none")
  .attr("stroke", "#97A676")
  .attr("stroke-width", 3)
  .transition()
  .duration(2000)
  .attr("d", linePath(data));

circleGrp2
  .selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", (d, i) => i * 70)
  .attr("cy", h)
  .attr("r", 4)
  .attr("fill", (d, i) => color(i))
  .on("mouseover", (d, i) => {
    divTooltip
      .style("opacity", 0)
      .style("background", (d, i) => color(i))
      .transition()
      .duration(200)
      .style("opacity", 1);
    divTooltip
      .html("value:" + "<br/>" + d.valueY)
      .style("left", d3.event.pageX + 10 + "px")
      .style("top", d3.event.pageY - 15 + "px");
  })
  .on("mouseout", (d, i) => {
    divTooltip
      .transition()
      .duration(500)
      .style("opacity", 0);
  })
  .transition()
  .duration(2000)
  .attr("cy", d => yLine(d.valueY));

linechartGrp
  .append("g")
  .attr("class", "yAxisLine")
  .call(yAxisLine);

linechartGrp
  .append("g")
  .attr("class", "xAxisLine")
  .call(xAxisLine)
  .attr("transform", `translate(0,${h})`);
