const divNetworkChart = document.getElementById("networkchart");

const nodes = [
  { id: "Myriel", group: 1 },
  { id: "Napoleon", group: 1 },
  { id: "Mlle.Baptistine", group: 1 },
  { id: "Mme.Magloire", group: 1 },
  { id: "CountessdeLo", group: 1 },
  { id: "Geborand", group: 1 },
  { id: "Champtercier", group: 1 },
  { id: "Cravatte", group: 1 },
  { id: "Count", group: 1 },
  { id: "OldMan", group: 1 },
  { id: "Labarre", group: 2 },
  { id: "Valjean", group: 2 },
  { id: "Marguerite", group: 3 },
  { id: "Mme.deR", group: 2 },
  { id: "Isabeau", group: 2 },
  { id: "Gervais", group: 2 },
  { id: "Tholomyes", group: 3 },
  { id: "Listolier", group: 3 },
  { id: "Fameuil", group: 3 }
];

const links = [
  { source: "Napoleon", target: "Myriel", value: 1 },
  { source: "Mlle.Baptistine", target: "Myriel", value: 8 },
  { source: "Mme.Magloire", target: "Myriel", value: 10 },
  { source: "Mme.Magloire", target: "Mlle.Baptistine", value: 6 },
  { source: "CountessdeLo", target: "Myriel", value: 1 },
  { source: "Geborand", target: "Myriel", value: 1 },
  { source: "Champtercier", target: "Myriel", value: 1 },
  { source: "Cravatte", target: "Myriel", value: 1 },
  { source: "Count", target: "Myriel", value: 2 },
  { source: "OldMan", target: "Myriel", value: 1 },
  { source: "Valjean", target: "Labarre", value: 1 },
  { source: "Valjean", target: "Mme.Magloire", value: 3 },
  { source: "Valjean", target: "Mlle.Baptistine", value: 3 },
  { source: "Valjean", target: "Myriel", value: 5 },
  { source: "Marguerite", target: "Valjean", value: 1 },
  { source: "Mme.deR", target: "Valjean", value: 1 },
  { source: "Isabeau", target: "Valjean", value: 1 },
  { source: "Gervais", target: "Valjean", value: 1 },
  { source: "Valjean", target: "Napoleon", value: 1 }
];

const data = {
  nodes: nodes,
  links: links
};

const drag = simulation => {
  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  return d3
    .drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
};

const simulation = d3.forceSimulation(nodes).nodes(nodes);

const linkForce = d3.forceLink(links).id(d => d.id); // "link", d3.forceLink() unisce i nodi

simulation
  .force("link", linkForce)
  .force("charge_force", d3.forceManyBody().strength(-100))
  .force("center_force", d3.forceCenter(500 / 2, 500 / 2));

const networkSvg = d3
  .select(divNetworkChart)
  .append("svg")
  .attr("height", "100%")
  .attr("width", "100%");

const link = networkSvg
  .append("g")
  .attr("stroke", "#999")
  .attr("stroke-opacity", 0.4)
  .selectAll("line")
  .data(links)
  .enter()
  .append("line")
  .attr("stroke-width", d => Math.sqrt(d.value));

const node = networkSvg
  .append("g")
  .attr("stroke", "#fff")
  .attr("stroke-width", 1.5)
  .selectAll("circle")
  .data(nodes)
  .enter()
  .append("circle")
  .attr("r", 5)
  .attr("fill", "red")
  .call(drag(simulation))
  .on("click", (d, i) => {
    console.log(d);
  });

node
  .append("p")
  .attr("font-size", 12)
  .attr("fill", "green")
  .text(d => d.id);

simulation.on("tick", () => {
  link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

  node.attr("cx", d => d.x).attr("cy", d => d.y);
});

const zoomActions = () => {
  networkSvg.attr("transform", d3.event.transform);
};

const zoomHandler = d3.zoom().on("zoom", zoomActions);

zoomHandler(networkSvg);
