function show() {
    'use strict';

    var margin = { top: 20, bottom: 20, right: 40, left: 40 },
        width = 800 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var chart = d3.select(".chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + ","
                                        + margin.top + ")");

    function update() {

        // Step 1. Select all the current circles in the chart
        // and bind the data. Use: chart.selectAll(...).data(...)
        // use getRandomData() as parameter for the data function

        // var circles = chart.selectAll(...).data(...)

        // Step 2. Use the enter() function to append a circle at a specific
        // position, based on their index, with r set to the value of the data.

        // circles.enter().append(...)
        //     .attr("r", function(d) { return ... })
        //     .attr("cx", function(d, i) { return ...})
        //     .attr("class", "added")
        //     .attr("cy", "50")

        // Step 3. the circles variable can already contain a selection. For
        // this selection, reset the radius, and change the class to updated'.

        // circles
        //     .attr(...)  // set the class to updated
        //     .attr("r", function(d) { return ... })

        // Step 4. if on an update, there is too little data, we can remove the
        // elements which are left over. use the exit() function and call remove()
        // on the elements for which we don't have data.

        // circles...

        // Step 5. As a preview for animations, we can create a transition
        // between two values. So instead of removing an element, we can
        // shrink and fade it out of view. Replace the previous exit command
        // with a transition:

        // circles.exit().transition().duration(2000)
        //     .attr("r", 0)
        //     .style("opacity", 0)
        //     .on('end', function(d) {
        //         this.remove()
        //     });

        // Optional: you can use a transition, pretty much everywhere you
        // set or change or property. You can also for instance set a transition
        // when a circle is updated or added, by just first calling transition()
    }

    // run the update function every couple of seconds
    update();
    d3.interval(function() { update(); }, 3000);

    function getRandomData() {
        var radius = 40;
        var numCircles = Math.ceil(Math.random() * 10);

        var data = [];
        for (var i = 0 ; i < numCircles ; i++) {
            data.push((Math.random() * radius / 2)
                + radius / 2);
        }

        return data;
    }
}


