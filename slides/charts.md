## Basic charts and elements

> Learn how to create basic charts and elements using scales and generators.


## SVG, groups and positioning

Absolute positioning:

```html
<rect x="100", y="100"></rect>
<circle cx="100", cy="100"></circle>
```
Provides a `g` element for grouping
 - `g` doesn't have an `x` or `y` like attribute, uses `transform`
 - All attributes on this element apply on children
 
```
<g transform="translate(50 200)">...</g> <!-- positioning -->    
<g transform="scale(0.5 0.3)">...</g> <!-- sizing -->
<g transform="rotate(45)">...</g> <!-- rotate the g -->    
``` 
- These actions can be combined
- But positioning is still difficult


## Positioning with scales

- A scale translates an input domain to an output range
- Different scales (https://github.com/d3/d3-scale)
  - [scaleLinear](): continuous input to continuous output
    - scalePow, scaleLog, scaleTime
  - [scaleSequential](): continuous input to interpolator
  - scaleQuantize: continuous input to discrete range
  - scaleQuantile: sampled input to discrete range
  - scaleThreshold: scaleQuantize with thresholds
  - scaleOrdinal: discrete input to discrete range
    - [scaleBand](), scalePoint
- Lots of useful helper functions    


##scaleLinear: continuous input to continuous output

```javascript
var x = d3.scaleLinear()
    .domain([10, 130])   // e.g the min and max of your data
    .range([0, 960]);    // the width of your chart

x(20); // 80
x(50); // 320

var color = d3.scaleLinear()
    .domain([10, 100])
    .range(["brown", "steelblue"]);

color(20); // "#9a3439"
color(50); // "#7b5167"
```


## What can we interpolate?

The domain must be numbers, the range can be any of this:
 
![](../img/what_interpolate.png) 

And if this doesn't match, you can create your own.


##scaleSequential: continuous input to interpolator

```javascript
var color = d3.scaleSequential(d3.interpolatePlasma).domain([0, 100]);
color(30); // #8f0da4
color(60); // #e16462
color(80); // #fca636
```

Many interpolators available:

![](../img/colors_1.png)


## How would you use this?

```javascript
// say our values contains data from 1984 to 2014
var min = d3.min(values, function (d) { return d.value; });
var max = d3.max(values, function (d) { return d.value; });
// evenly divide the years along the xAxis
var xScale = d3.scaleLinear().domain([1984,2014]).range([0, 1080]);
// evenly divide the values along the yAxis            
var yScale = d3.scaleLinear()
    .domain([min, max]).range([0, 700]);
// get a color    
var col = d3.scaleSequential(d3.interpolatePlasma).domain([0, 100]);

d3.selectAll("rect").data(values).enter()
    .append("rect")
    .attr("x", xScale) // xScale = (d: any) => Numeric 
    .attr("y", function(d) {return yScale(d)})  // alternatively
    .attr("fill", col)
```


## Scales and axis

- D3 provides easy way to create an axis:
  - https://github.com/d3/d3-axis

```javascript
var min = d3.min(values, function (d) { return d.value; });
var max = d3.max(values, function (d) { return d.value; });

var yScale = d3.scaleLinear()
    .domain([min, max]).range([0, 700]);

// s denotes that we want to use international system of units
// to display axis values
var bottomAxis = d3.axisBottom().scale(yScale).ticks(20, "s");
```

Results in:
![](../img/axis.png)


## Exercise 3: Goal

<img src='../img/ex3.png' height=550></img>


## Before we start
D3.js support easy loading csv, tsv, json, xml

```
name,sex,amount
Emma,F,20355
Olivia,F,19553
...
```

```javascript
d3.csv('data/yob2015.txt', 
   function (d) { return {  
            name: d.name, 
            sex: d.sex, 
            amount: +d.amount }; 
            }, 
   function (data) {
}
```


## Also for multiple files

```
d3.queue()
    .defer(d3.json, "./data/world-110m.v1.json")
    .defer(d3.csv, "./data/worldbank_popular_2014.csv")
    .defer(d3.csv, "./data/iso-mapping.csv")
    .await(function (error, topoData, worldbank, mapping) {
}
```


## Exercise 3: Working with scales

  - Follow steps described in:
    - `<ROOT>/src/exercise-03/js/E03.js`
  - If needed reference D3.js APIs: 
    - https://github.com/d3/d3-scale  
    - https://github.com/d3/d3-axis  
  - You'll get approximately 8 minutes.
  
**[Should you have question? Please ask.]()**  


## Using SVG for charts

- SVG provides a large number of elements:
  - https://developer.mozilla.org/en-US/docs/Web/SVG
- But limited primitive shapes: `<circle>`, `<ellipse>`, `<line>`, `<path>`, `<polygon>`, `<polyline>`, `<rect>`

<img src="../img/pie1.png" height="370px"/>


## The `path` element is versatile

- the `d` attribute describes a path:

```html
<path class="arc" d="M136.86141570725613,-17.69047457265137A138,138,
0,0,1,124.60150267951192,59.31665474390461L62.948628653284814,28.
257214134993035A69,69,0,0,0,68.61145448511735,-7.312203049469534Z" 
style="fill: rgb(252, 160, 130);"></path>
```
- `M`, `L`, `A`, `C`, `A`, `Q`, `T` ... for lines, arcs, curves 
- Hard to determine the correct values yourself
- D3.js provides generators for complex shapes


## The arc generator

- We'll create an `arc` segment, a part of a pie chart

<img src="../img/pie_1.png" height="150"/><img src="../img/arc_1.png" height="150"/>

```javascript
var arc = d3.arc()
    .outerRadius(height/2 * 0.6).innerRadius(height/2 * 0.3);
// create the right half of a pie chart    
arc({
  startAngle: 0,
  endAngle: Math.PI
}); 

// "M1.469576158976824e-14,-240A240,240,0,1,1,1.469576158976824e-14,
// 240L7.34788079488412e-15,120A120,120,0,1,0,7.34788079488412e-15,
// -120Z"

```


## Combined with the pie function
- Piechart: `d3.pie()` to generate config for `d3.arc`

```javascript
var arc = d3.arc()
    .outerRadius(height/2 * 0.6).innerRadius(height/2 * 0.3);
var data = [{count:10}, {count:20}, {count:30}]
var pie = d3.pie()
    .padAngle(0.04)
    .value(function (d) { return d.count; });

var arcs = pie(data)    
// "[{"data":{"count":10},"index":2,"value":10,
//    "startAngle":5.215987755982988,
//    "endAngle":6.283185307179586,"padAngle":0.04},
//   {"data":{"count":20},"index":1,"value":20,
//    "startAngle":3.121592653589793,
//    "endAngle":5.215987755982988,"padAngle":0.04} ... 
selectAll("path").data(arcs).enter()
   .append("path").attr("d", arc);
``` 


## Another standard pattern 

1. Define generator which creates paths based on properties. (`d3.arc`)
2. Define generator which creates config for other generators (`d3.pie`)
3. Pass data to step 2, result is enriched data with config.
4. Use the normal `selectAll()`, `enter()`, `merge()`, `exit()` pattern


## Exercise 4: Goal

<img src='../img/donut.png' height=550></img>


## Exercise 4, create a pie chart

  - Follow steps described in:
    - `<ROOT>/src/exercise-04/js/E04.js`
  - If needed reference D3.js APIs:
    - https://github.com/d3/d3-shape
  - You'll get approximately 5 minutes.
  