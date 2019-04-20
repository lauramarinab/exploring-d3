const divRectSvg = document.getElementById("rectSvg");
const divCirclevg = document.getElementById("circleSvg");
const dataArray = [28, 35, 55, 24, 13, 65];

const editedDataArray = [{ value: 28, color: "purple" }, { value: 35, color: "green" }, { value: 55, color: "purple" }];

// Rectangle SVG
const rectSvg = d3
  .select(divRectSvg)
  .append("svg")
  .attr("height", () => {
    return Math.max(...dataArray) * 2 + 70;
  })
  .attr("width", "100%");

rectSvg
  .selectAll("rect")
  .data(dataArray)
  .enter()
  .append("rect")
  .attr("height", (d, i) => d * 2)
  .attr("width", 80)
  .attr("x", (d, i) => 90 * i)
  .attr("y", (d, i) => 200 - d * 2)
  .attr("fill", "purple");

// Circle SVG
const circleSvg = d3
  .select(divCirclevg)
  .append("svg")
  .attr("height", () => {
    return Math.max(...dataArray) * 2 + 70;
  })
  .attr("width", "100%");
