function show() {
    'use strict';

    var margin = { top: 20, bottom: 20, right: 40, left: 40 },
        width = 500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var chart = d3.select(".chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + ","
                                        + margin.top + ")");

    var pieGroup = chart.append("g").attr("transform", "translate(" + width/2 + " " + height/2 + ")")
    var data = getRandomData();

    // Step 1. Setup a d3.scaleSequential to assign colors based on
    // the value of the provided random data. E.g use a d3.interpolateBlues
    // or d3.interpolateOranges as argument to the sequentialScale

    // var color = d3.scaleSequential(...)
    //     .domain([
    //         d3.min(..., ...),
    //         d3.max(..., ...)
    //     ]);

    // Step 2. Setup the d3.arc d3.pie generators

    // var arc = d3.arc().innerRadius(...).outerRadius(...)
    // var pie = d3.pie()
    //     .padAngle(0.01)
    //     .value(function(d) { return d.value });

    // Step 3. Pass the data through the pie function and create the
    // path elements. Also set the fill of the created 'path' based on the value
    // of the data using the color scale created earlier. The value can be found
    // in d.data.value, after the random data is converted to the arcs.

    // var arcs = pie(...);

    // pieGroup.selectAll('path').data(...).enter()
    //     .append("...")
    //     .attr("d", ...)
    //     .attr("fill", function(d) {return color(...)});


    // Step 4. Use the arc.centroid() function to determine the
    // center of each pie segment, and add the 'id' of the data
    // element as text to the pie chart. The arc.centroid(d)
    // function returns an array like this [x][y]

    // pieGroup.selectAll('text').data(arcs).enter()
    //     .append('...')
    //     .attr("x", function(d) { ... })
    //     .attr("y", function(d) { ... })
    //     .text(function(d) {return ...})


    function getRandomData() {
        var range = 100;
        var numCircles = 10;

        var data = [];
        for (var i = 0 ; i < numCircles ; i++) {
            data.push({
                id: i,
                value: (Math.random() * range)
            });
        }

        return data;
    }
}

