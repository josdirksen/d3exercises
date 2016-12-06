function show() {
    'use strict';

    // Step 1. Select the HTML body and add a <p> element
    //         with some text. Use d3.select('selector')
    //         and append() on this selection to add the element.
    //         After adding you can use text or html to set the
    //         content.

    // d3.select(...)

    // Step 2. We can also select multiple elements. Use d3.select and
    //         d3.selectAll to see the difference when selecting all the
    //         <li> elements, and use either classed or attr to set the class
    //         of these elements to 'step2'.

    // Step 3. Add a new <p> element to all the li elements, with some text

    // Step 4. Using remove, we can remove all the elements from a selection.
    //         Select all the added p elements below the li, and remove them.

    // standard setup for SVG chart with padding
    var margin = { top: 20, bottom: 20, right: 40, left: 40 },
        width = 800 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // add a main group element, and set the offset based on margins
    var chart = d3.select(".chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + ","
            + margin.top + ")");

    // working with SVG is pretty much the same as with normal HTML.

    // Step 5. Add an SVG 'rect' element to the chart selection. Make sure
    //         to set the x, y, width, height attributes and assign the
    //         rect-style class.

    // chart.append(...)

    // Step 6. With D3.js we can dynamically assign values in each of the
    //         attr, classed, style, etc. functions. Instead of using
    //         .attr("x", 100), you can do .attr("x", function (d, i) {return ...}).
    //         Create a 'circle', and assign a random values to the cx, cy and r attributes.

    // chart.append(...)

}

