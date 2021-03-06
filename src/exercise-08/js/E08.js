function show() {

    'use strict';

    // Step 1. You can change the initial point seed, to create more or
    // less initial voronois.
    var pointSeed = 8;

    // Generic setup
    var margin = {top: 50, bottom: 20, right: 20, left: 20},
        width = 1200 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    // create the standard chart
    var svg = d3.select(".chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height+ margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var defs = d3.select(".chart").append("defs");

    // Step 2. You can experiment with the color interpolate function.
    var color = function() {return d3.interpolateRainbow(Math.random())};

    // render the first set of elements
    var voronoi = d3.voronoi().extent([[-1, -1], [width + 1, height + 1]]);
    var points = generateRandomPoints(pointSeed, 0, width, 0, height);
    var polygons = voronoi.polygons(points);
    drawVoronoi(svg, polygons, undefined, 0);

    // generate random points
    var subPolygons = drawSubPolygons(svg, polygons, 1);
    subPolygons = drawSubPolygons(svg, subPolygons, 2);
    subPolygons = drawSubPolygons(svg, subPolygons, 3);

    function drawSubPolygons(parent, parentPols, level) {

        var parentLevel = level-1;

        // we process each of the parent polygons
        var i = 0;
        var selection = d3.selectAll('path[data-level="' + parentLevel +'"]');

        var totalPolygons = [];
        selection.each(function(d, i) {
            var box = this.getBBox();

            var points20 = generateRandomPoints(pointSeed * level, box.x, box.x + box.width, box.y, box.y + box.height);

            // use the extent to define where the new voronoi needs to be rendered.
            var voronoi2 = d3.voronoi().extent([[box.x, box.y], [box.x + box.width, box.y+box.height]]);
            var polygons2 = voronoi2.polygons(points20)

            // draw the new voronois
            if (polygons2.length > 0) {
                // the new voronois need to be added in the group with the parent clippath
                drawVoronoi(d3.select(this.parentNode), polygons2,"cp-" + parentLevel + "-" + i, level);
                addClipPath(d, "cp-" + parentLevel + "-" + i);
            }

            totalPolygons = totalPolygons.concat(polygons2)
        });

        return _.flatten(totalPolygons)
    }

    function drawVoronoi(parent, polygons, clipArea, level) {
        var polygon = parent.insert("g",":first-child")
            .attr("clip-path", function(d) { return clipArea ? "url(#" + clipArea+ ")" : ""})
            .attr("class", "polygons")
            .selectAll("path")
            .data(polygons)
            .enter().insert("path")
            .attr("data-level",level)
            .attr("stroke-width", function() {return 6 / ((level+1)*2) })
            .attr("stroke", function() {d3.hsl("#000").brighter(level)})
            .attr("fill", function() {return level === 0 ? "" : color()})
            .attr("fill-opacity", "0.3")
            .attr("d", polyToPath)
    }

    function polyToPath(polygon) {
        return polygon ? "M" + polygon.join("L") + "Z" : null;
    }

    function generateRandomPoints(nPoints, minX, maxX, minY, maxY) {
        return d3.range(0, nPoints).map( function(i) {
            return [Math.floor(Math.random() * (maxX-minX)) + minX, Math.floor(Math.random() * (maxY-minY)) + minY]
        })
    }

    function addClipPath(outline, pathId) {
        defs.append("clipPath")
            .attr("id",pathId)
            .append("path").attr("d", polyToPath(outline));

    }
}


