function show() {
    'use strict';

    var margin = { top: 40, bottom: 40, right: 40, left: 40 },
        width = 800 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    var chart = d3.select(".chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + ","
                                        + margin.top + ")");

    // chart configuration
    var namesToShow = 10;
    var barWidth = 20;
    var barMargin = 5;

    // First we're going to load the data
    d3.csv('data/yob2015.txt', function (d) { return { name: d.name, sex: d.sex, amount: +d.amount }; }, function (data) {

        // group the data and get the top n females, and the top males
        // we also, at the same moment, convert the amount to a number
        var grouped = _.groupBy(data, 'sex');
        var top10F = grouped['F'].slice(0, namesToShow);
        var top10M = grouped['M'].slice(0, namesToShow);

        var both = top10F.concat(top10M.reverse());

        // We've created SVG groups and positioned them
        // to position a group, we set the transform property.
        var bars = chart.selectAll("g").data(both)
            .enter().append('g')
            .attr('transform', function (d, i) {
                var yPos = ((barWidth + barMargin) * i);
                return 'translate( 0 ' + yPos +  ')';
            });

        // Step 1. Setup a d3.scaleLinear that handles the width of the bars.
        // var yScale = d3.scaleLinear()
        //          .domain([0, ..max value of the both array])
        //          .range([0, ..the width of the chart])
        //
        // now when you call yScale(amount), you get back the correct width
        var yScale = d3.scaleLinear()
            .domain([0, d3.max(both, function (d) { return d.amount; })])
            .range([0, width]);


        // Step 2. To each element of the bars selection append a 'rect' and set
        // the height to 'barWidth', and the width to yScale(d.amount). Finally
        // if 'sex === F' set class to 'female' else set it to 'male'
        bars.append('rect')
            .attr("height", barWidth)
            .attr("width", function (d) { return yScale(d.amount); })
            .attr("class", function (d) { return d.sex === 'F' ? 'female' : 'male'; });

        // Step 3. Also add the popular name as a 'text' element. And set the class
        // to 'label'.
        bars.append("text")
            .attr("class", "label")
            .attr("x", function (d) { return yScale(d.amount) - 5 ; })
            .attr("y", barWidth / 2)
            .attr("dy", ".35em")
            .text(function(d) { return d.name; });

        // without a legend it is difficult to see what the scores mean
        // so lets add that as well. We create an axis definition
        var bottomAxis = d3.axisBottom().scale(yScale).ticks(20, "s");
        var topAxis = d3.axisTop().scale(yScale).ticks(20, "s");

        // and add them to the chart
        chart.append("g")
            .attr('transform', 'translate( 0 ' + both.length * (barWidth + barMargin) +  ')')
            .call(bottomAxis);

        chart.append("g")
            .attr('transform', 'translate( 0 ' + -barMargin + ' )')
            .call(topAxis);
    });
}

