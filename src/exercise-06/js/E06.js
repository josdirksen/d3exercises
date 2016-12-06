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

        // Step 1. Add the links as path elements but don't specify a d property yet. Note that it
        // is important to first add the links, to have the circles render on top. also set
        // the class of the added elements to 'link'

        // chart.selectAll(".link").data(links).enter().append(...).attr(...);

        // Step 2. Add the nodes as well. Specify an "r" attribute of 10, and
        // add a node class. Make sure to also add the drag event handlers shown
        // in the commented code below

        // chart.selectAll('.node').data(nodes).enter()
        //     .append(...).attr(...).classed(...)
        //     .call(d3.drag()
        //         .on("start", dragstarted)
        //         .on("drag", dragged)
        //         .on("end", dragended));

        // Step 3. Configure the simulation. You can play around with
        // the various forces specified here, and see the result.
        //   - forceCollide: argument is the radius of each node, and when set
        //     simulation tries to avoid overlapping nodes. Good value is 20
        //   - link: the distance is the preferred length of the links. Good value is 75
        //   - charge: the amount at which nodes attract or propel one another. Good value is -45

        // var simulation = d3.forceSimulation()
        //     .force("collide", d3.forceCollide(...))
        //     .force("link", d3.forceLink().distance(...).id(function(d) { return d.id; }))
        //     .force("charge", d3.forceManyBody().strength(...))
        //     .force("center", d3.forceCenter(width / 2, height / 2))

        // run the simulation
        simulation.nodes(nodes).on("tick", ticked);
        simulation.force("link").links(links);

        function ticked() {

            // Step 4. update the "d" attribute of the links. To do this pass
            // the bound data value to the linkArc function.

            // chart.selectAll('.link').attr("d", ...);

            // Step 5. update the cx, cy attributes of the node. Set the
            // cx value to the x property of the bound data, and the cy
            // property to the y property of the bound data.

            // chart.selectAll('.node')
            //     .attr("cx", ...)
            //     .attr("cy", ...);
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
