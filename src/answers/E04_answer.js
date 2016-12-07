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

    var color = d3.scaleSequential(d3.interpolateOranges)
        .domain([
            d3.min(data, function (d) {return d.value}),
            d3.max(data, function (d) {return d.value})
        ]);
    var arc = d3.arc().innerRadius(width * 0.4).outerRadius(width * 0.5)
    var pie = d3.pie()
        .padAngle(0.01)
        .value(function(d) { return d.value });

    var arcs = pie(data);

    pieGroup.selectAll('path').data(arcs).enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", function(d) {return color(d.data.value)});

    pieGroup.selectAll('text').data(arcs).enter()
        .append('text')
        .attr("x", function(d) { return arc.centroid(d)[0]})
        .attr("y", function(d) { return arc.centroid(d)[1]})
        .text(function(d) {return d.data.id})

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

