function show() {

    'use strict';

    // Generic setup
    var margin = {top: 20, bottom: 20, right: 20, left: 20},
        width = 1600 - margin.left - margin.right,
        height = 900 - margin.top - margin.bottom;

    var chart = d3.select(".chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + ","
            + margin.top + ")");

    // generate a population oriented tree.
    var properties = ['Population', 'Area', 'Density'];

    d3.text('./data/countries.csv', function(raw) {
        var data = d3.dsvFormat(";").parse(raw)

        // convert population and arrea to a number
        data = data.map(function(el) {
            el.Population = +el.Population;
            el.Area = +el.Area;
            el.Density = el.Population / el.Area;
            el.id = el['Country code'];
            el.name = el['Country (en)'];

            if (el.Density === Infinity) el.Density = 0;
            return el;
        });

        // group entries using nest and create hierarchy per continent
        var entries = d3.nest().key(function (d) {return d.Continent; }).entries(data);

        // simple colorscale
        var colorScale = d3.scaleOrdinal()
            .domain(entries.map(function(el) {return el.key}))
            .range(d3.range(0,entries.length + 1)
                .map(function(i) { return d3.interpolateWarm(i/entries.length);}))


        // Step 1. The first thing we need is a tree generator. For this example
        // we'll use a treemap.
        var tree = d3.treemap()
                      .size([width, height]).padding(2)
                      .tile(d3.treemapSquarify.ratio(1))


        // Our visualization will be interactive, and switch when onclick is called
        onclick();

        function update(property) {

            // convert the nested structure to a hierarchy.
            var root = d3.hierarchy({values: entries}, function(d) { return d.values; })
                .sum(function(data) { return data[property]; })
                .sort(function(a, b) { return b.value - a.value; });

            // Step 2. Do a console.log of the root, so you can see what the structure
            // looks like before passing it through the tree function.

            // Step 3. Pass the root variable through the created tree generator. This will
            // set the correct coordinates for the individual entries in the tree. Do another
            // console.log(root) to see that we now have coordinates
            tree(root);

            // Step 4. We only want to print out the leaves, the individual countries, not the continents
            // so as data pass in the. Select all the .node elements from the chart and assign the
            // root.leaves as a data property. Als provide an identity function, which d3.js will
            // use to determine which found node is bound to which data element.
            var countries = chart.selectAll(".node")
                .data(root.leaves(), function(d) {console.log(d); return d.data.id})

            // append a rectangle for each group and set the color
            var newCountries = countries.enter().append("rect")
                .style("fill", function(d) {return colorScale(d.parent.data.key)})
                .style("stroke", "black")
                .attr("class","node")
                .on("click", onclick)

            // Step 5. For all the newly created countries, add a svg 'title'
            // element and the set the text value to the name of the country
            newCountries.append("title").text(function(d) {return d.data.name})

            // we position the new and updated countries based on the calculated d.x0 and d.y0
            var allGroups = countries.merge(newCountries);

            // Step 6. Create a transition in which we update the x, y, widht and height
            // of the rectangles based on the d.x0, d.x1, d.y0 and d.y1 values.
            allGroups.transition().duration(2000)
                .attr("x", function(d) {return d.x0})
                .attr("y", function(d) {return d.y0})
                .attr("width", function(d) {return d.x1 - d.x0})
                .attr("height", function(d) {return d.y1 - d.y0});
        }


        // returns the next property to show
        function onclick(d) {
            var currentProp = properties.shift();
            properties.push(currentProp);
            update(currentProp);
        }
    });
}


