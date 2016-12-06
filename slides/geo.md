## Geo

> D3.js has extensive support for working with geo data. We'll explore different ways of visualizing and interacting with geo data.


# Best part of D3.js

At least for me..


## Cause it looks nice

<img src="../img/cf1.png" height=500></img>


## and informative

<img src="../img/cf2.png" height=500></img>


## and colourful

<img src="../img/cf3.png" height=500></img>


## Quick note on projections

Projection defines how the coordinates from the source are projected to a flat canvas. The [Sinu Mollweide]() projection:

<img src="../img/proj1.png" height=350></img>
 
[Example](http://localhost/dev/git/dataviz-d3js/src/chapter-05/D05-02.html) 


## Creating a map

Going to explain how to create this:

<img src="../img/map.png" height=400></img>

[Example](http://localhost/dev/git/dataviz-d3js/src/chapter-05/D05-03.html)


## How to load data

- Most common format for GIS data is ArcGIS shapefile.
    - binary format
- Use QGis, Mapshaper, OGR to convert to open formats
- D3.js can work with:
    - GeoJSON: A standard supported by many applications.
    - TopoJSON: A specific optimized format for smaller files.


## GeoJSON and TopoJSON formats

- Can contain multiple geometries.
- Each geometry is described (usually) as a path.
- Can contain additional properties
    - population, unemployment rate, etc.
    - one file for everything
- Try to work with TopoJSON, since it's much smaller
    
```json
{"type":"Topology","objects":{"cb_2015_us_county_500k": {"type":
"GeometryCollection","geometries":[{"type":"Polygon","properties":
{"GEOID":"01005","NAME":"Barbour"},"id":"01005","arcs":[[0,1,2,3
,4,5,6,-7,6,7,8,9,10,11,12,13,14 ...
```


## Working with topo data in D3.js

(pretty much the same way as we did before)

1. Setup a path generator and projection
3. Load the data
4. Use the projection to generate path segments


## Load the data

(this is prepared data, where value contains percentage of internet users)

```
{"type":"Topology","objects":{"countries":{"type":"GeometryCollection",
 "geometries":[{"type":"Polygon","id":"004","arcs":[[0,1,2,3,4,5]],
 "properties":{"value":"7","countryA":"AFG","name":"Afghanistan"}},
 {"type":"MultiPolygon","id":"024","arcs":[[[6,7,8,9 ....
```

```javascript
d3.json("./data/world-110m-inet.json", function(loadedTopo) {
   // by using topojson.feature, we convert the topoJson to geojson,
   // where each country is a single feature in the features array. 
  countries  = topojson.feature(loadedTopo, 
                       loadedTopo.objects.countries).features;
});
```


## When loaded the data looks like this

<img src="../img/loaded_topo.png" height=500></img>


## Setup the path generator

```javascript
var projection = d3.geoNaturalEarth()
var path = d3.geoPath().projection(projection)
```

- For all the supported projections see:
 - https://github.com/d3/d3-geo/
 - https://github.com/d3/d3-geo-projection
- Pretty much any projection you can think off
 - Relatively easy to create your own one


## With a generator and the data

```
var projection = d3.geoNaturalEarth()
var path = d3.geoPath().projection(projection)

d3.json("./data/world-110m-inet.json", function(loadedTopo) {
  countries  = topojson.feature(loadedTopo, 
                       loadedTopo.objects.countries).features;
                       
  svg.selectAll('.country').data(countries).enter()
     .append("path")
     .classed('country', true)
     .attr("d", path);
}
```

And that's it..


## And you're done!

<img src="../img/loaded_topo_2.png" height=450></img>

But colors?


## Add a simple scale

```
var color = d3.scaleSequential(d3.interpolateGreens).domain([0,100])
var projection = d3.geoNaturalEarth()
var path = d3.geoPath().projection(projection)

d3.json("./data/world-110m-inet.json", function(loadedTopo) {
  countries  = topojson.feature(loadedTopo, 
                       loadedTopo.objects.countries).features;
                       
  svg.selectAll('.country').data(countries).enter()
     .append("path")
     .classed('country', true)
     .attr("d", path);
     .attr("fill", function(d) {return d.properties.value 
                ? color(+d.properties.value) 
                : '#ccc'});
}
```


## Easy right?

<img src="../img/loaded_topo_3.png" height=450></img>


## Exercise 7: Goal

> Render the US election 


## Exercise 7, render the us election results

  - Follow steps described in:
    - `<ROOT>/src/exercise-07/js/E07.js`
  - If needed reference D3.js APIs:
     - https://github.com/d3/d3-geo/
     - https://github.com/d3/d3-geo-projection
  - You'll get approximately 10 minutes.
  