const divRectSvg = document.getElementById("rectSvg");
const divCircleSvg = document.getElementById("circleSvg");
const divEllipseSvg = document.getElementById("ellipseSvg");
const divLinesSvg = document.getElementById("linesSvg");
const divTextSvg = document.getElementById("textSvg");
const divTextArraySvg = document.getElementById("textArraySvg");

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
  .attr("width", 80)
  .attr("x", (d, i) => 90 * i)
  .attr("y", (d, i) => 200 - d * 2)
  .attr("fill", "#97A676")
  .attr("height", (d, i) => d * 2);

// Circle SVG
const circleSvg = d3
  .select(divCircleSvg)
  .append("svg")
  .attr("height", () => {
    return Math.max(...dataArray) * 2 + 50;
  })
  .attr("width", "100%");

let circleFixedX = 50;
circleSvg
  .selectAll("circle")
  .data(dataArray)
  .enter()
  .append("circle")
  .attr("cx", (d, i) => {
    const firstCx = dataArray[0];
    const otherCx = circleFixedX;
    if (i === 0) {
      return firstCx;
    } else {
      circleFixedX += 2 * d + 25;
      return otherCx + d + 25;
    }
  })
  .attr("cy", (d, i) => Math.max(...dataArray) + 25)
  .attr("r", (d, i) => d)
  .attr("fill", "#BF5967");

// Ellipse SVG
const ellipseSvg = d3
  .select(divEllipseSvg)
  .append("svg")
  .attr("height", () => {
    return Math.max(...dataArray) * 2 + 50;
  })
  .attr("width", "100%");

let ellipseFixedX = 50;
ellipseSvg
  .selectAll("ellipse")
  .data(dataArray)
  .enter()
  .append("ellipse")
  .attr("cx", (d, i) => {
    const firstCx = dataArray[0];
    const otherCx = ellipseFixedX;
    if (i === 0) {
      return firstCx;
    } else {
      ellipseFixedX += 2 * d + 25;
      return otherCx + d + 25;
    }
  })
  .attr("cy", (d, i) => Math.max(...dataArray) + 25)
  .attr("rx", (d, i) => d)
  .attr("ry", 20)
  .attr("fill", "#FFD7D6");

// Lines SVG
const linesSvg = d3
  .select(divLinesSvg)
  .append("svg")
  .attr("height", () => {
    return Math.max(...dataArray) * 2 + 30;
  })
  .attr("width", "100%");

let linesFixedX = 0;
linesSvg
  .selectAll("line")
  .data(dataArray)
  .enter()
  .append("line")
  .attr("x1", linesFixedX)
  .attr("y1", (d, i) => 30 + i * 20)
  .attr("x2", (d, i) => d * 3)
  .attr("y2", (d, i) => 30 + i * 20)
  .style("stroke", "#703121") // style win to .attr
  .style("stroke-width", 4);

// Text SVG
const textSvg = d3
  .select(divTextSvg)
  .append("svg")
  .attr("height", () => {
    return Math.max(...dataArray) + 100;
  })
  .attr("width", "100%");

textSvg
  .append("text")
  .attr("class", "textA")
  .attr("x", 100)
  .attr("y", () => Math.max(...dataArray))
  .attr("font-size", 30)
  .attr("stroke", "#ED4057")
  .attr("stroke-width", "1")
  .attr("fill", "none")
  .attr("text-anchor", "start")
  .attr("dominant-baseline", "start")
  .text("trying");

textSvg
  .append("text")
  .attr("class", "textB")
  .attr("x", 100)
  .attr("y", () => Math.max(...dataArray) + 32)
  .attr("fill", "#C20033")
  .attr("text-anchor", "middle")
  .attr("font-size", 30)
  .text("text");

textSvg
  .append("text")
  .attr("class", "textC")
  .attr("x", 100)
  .attr("y", () => Math.max(...dataArray) + 60)
  .attr("fill", "#821B36")
  .attr("stroke", "#821B36")
  .attr("stroke-width", 1)
  .attr("text-anchor", "start")
  .attr("font-size", 40)
  .text("svg");

const textArray = ["text", "array", "svg"];
// Text Array SVG
const textArraySvg = d3
  .select(divTextArraySvg)
  .append("svg")
  .attr("height", () => {
    return Math.max(...dataArray) + 100;
  })
  .attr("width", "100%");

textArraySvg
  .append("text")
  .selectAll("tspan")
  .data(textArray)
  .enter()
  .append("tspan")
  .attr("x", 30)
  .attr("y", (d, i) => 50 + i * 50)
  .attr("fill", "#ED4057")
  .attr("text-anchor", "start")
  .attr("font-size", 40)
  .text(d => d);
