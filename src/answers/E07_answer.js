function show() {
    'use strict';

    var margin = {top: 20, bottom: 20, right: 40, left: 40},
        width = 900 - margin.left - margin.right,
        height = 550 - margin.top - margin.bottom;

    var chart = d3.select(".chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + ","
            + margin.top + ")");

    // Step 1. Create a projection (d3.geoAlbersUsa()), and pass in
    // the just created d3.geoAlbersUsa() projection to the projection()
    // function.
    var projection = d3.geoAlbersUsa();
    var path = d3.geoPath()
        .projection(projection);

    // Step 2. Setup a color scale. The data we have contains the per_gop and per_dem
    // properties which contain (on a scale from 0 to 1) the percentage that voted
    // republic or democratic. Create a d3.scaleLinear with domain [-0.8, 0, 0, 0.8]
    // and a range of 4 color. The first 2 colors will be used when democrats won
    // a county, the last 2 colors for when a republic won a county.
    var scale = d3.scaleLinear().domain([-0.8, 0, 0, 0.8]).range(["blue", "#A6D8F0", "#FFB3A6", "red"]);

    // load the data
    d3.queue()
        .defer(d3.json, "./data/cb_2015_us_county_500k.simplified.topojson")
        .defer(d3.csv, "./data/2016_US_County_Level_Presidential_Results.csv")
        .await(function (error, topo, data) {
            process(topo, data)
        });

    // display the data
    function process(topo, data) {

        // Do some minimal data cleanup
        topo.objects['cb_2015_us_county_500k'].geometries.forEach(function (d) { d.id = +d.id; });
        data.forEach(function (d) {
            d['combined_fips'] = +d['combined_fips'];
            d['per_gop'] = +d['per_gop'];
            d['per_dem'] = +d['per_dem'];
        });

        // create a simple lookup map, so we can use the id from the data to lookup that
        // specific counties election results
        var dataKV = data.reduce(function (res, el) { res[el.combined_fips] = el; return res; }, {});
        var features = topojson.feature(topo, topo.objects['cb_2015_us_county_500k']).features;

        // step 3. Append a number of 'path' elements to the chart.
        //    - Pass the features array to the data function
        //    - Assign the .county class
        //    - Set the 'd' attribute to the value of path(d)
        //    - set the fill using the scale we created earlier. The value
        //      for the fill should be calculated something like this:
        //
        //    var electionData = dataKV[d.id];
        //         return electionData
        //                ? scale(electionData["per_gop"] - electionData["per_dem"])
        //                : "#ccc"
        chart.selectAll(".county")
            .data(features)
            .enter()
            .append("path")
            .attr("class", "county")
            .attr("fill", function (d) {
                var electionData = dataKV[d.id];
                return electionData
                    ? scale(electionData["per_gop"] - electionData["per_dem"])
                    : "#ccc"
            }).attr("d", path)
    }

};