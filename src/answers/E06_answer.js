function show() {
    'use strict';

    var margin = {top: 20, bottom: 20, right: 40, left: 40},
        width = 800 - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom;

    var chart = d3.select(".chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + ","
            + margin.top + ")");

    // Data contains links from a node id to another node id. The
    // value contains the strength of the link.
    //
    // from,to,value
    // 1,2,104
    // 1,8,47
    //
    d3.csv("./data/appear_together.csv", function (data) {

        // Lets determine all the unique nodes first.
        // the result is an array of [{id: 1}, {id: 2}] etc. nodes
        var nodes = _.uniqBy(data.reduce(function(res, d) {
            res.push({id: d.from}); res.push({id: d.to}) ; return res
        }, []), 'id');

        // besides the nodes we also need links in a specific format
        var links = data.map(function(d) {
            return  { "source": d.from, "target": d.to, "value": +d.value }
        });

        // Step 1. Add the links but don't specify a path yet. Note that it
        // is important to first add the links, to have the circles
        // render on top.
        chart.selectAll(".link")
            .data(links).enter().append("path")
                .attr("class", "link");

        // Step 2. Add the nodes as well.
        chart.selectAll('.node').data(nodes).enter()
            .append('circle').attr("r", 10).classed("node", true)
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        // Step 3. Configure the simulation
        var simulation = d3.forceSimulation()
            .force("collide", d3.forceCollide(20))
            .force("link", d3.forceLink().distance(100).id(function(d) { return d.id; }))
            .force("charge", d3.forceManyBody().strength(-45))
            .force("center", d3.forceCenter(width / 2, height / 2))

        // run the simulation
        simulation.nodes(nodes).on("tick", ticked);
        simulation.force("link").links(links);

        function ticked() {

            // Step 4. update the "d" attribute of the links
            chart.selectAll('.link').attr("d", linkArc);

            // Step 5. update the cx, cy attributes of the node
            chart.selectAll('.node')
                .attr("cx", function(d) {return d.x})
                .attr("cy", function(d) {return d.y});
        }

        function linkArc(d) {
            var dx = d.target.x - d.source.x,
                dy = d.target.y - d.source.y,
                dr = Math.sqrt(dx * dx + dy * dy);
            return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
        }

        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.8).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);

            if (!d3.event.sourceEvent.shiftKey) {
                d.fx = null;
                d.fy = null;
            }
        }
    })
}
