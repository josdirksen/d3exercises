## Visualize graphs

> Quick introduction on different ways how to use the force, hord, and matrix layouts to visualize a graph of data


## force layout for graphs

- API: https://github.com/d3/d3-force
- A graph is a set of nodes.
- Define forces which are applied:
    - to nodes
    - to links
- Run a simulation


## Can apply different forces

- `forceCenter`: keeps nodes in the center
- `forceCollide`: nodes have a radius, avoid collisions
- `forceLink`: push/pull nodes together based on distance
- `forceManyBody`: simulate attraction or repulsion between nodes
- `forceX`: force nodes towards specific position
- `forceY`: force nodes towards specific position


## basic setup

```javascript
var graph = ...

// define forces
var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

// run a simulation
simulation
  .nodes(graph.nodes)
  .on("tick", ticked);

// do something on each tick
function ticked() {...}
```


## Force layout multiple forces

<img src='../img/force_1.png' height=450>

[~ example ~](http://localhost/dev/git/dataviz-d3js/src/chapter-04/D04-01.html)


## Also use without links

<img src='../img/force_2.png' height=450>

[~ example ~](http://localhost/dev/git/dataviz-d3js/src/chapter-04/D04-02.html)


## Alternative: chord diagram

<img src='../img/chord.png' height=450>

[~ example ~](http://localhost/dev/git/dataviz-d3js/src/chapter-04/D04-03.html)


## Alternative: matrix diagram

<img src='../img/matrix.png' height=450>

[~ example ~](http://localhost/dev/git/dataviz-d3js/src/chapter-04/D04-04.html)


## Exercise 6: Goal

> Play around with the different forces and see the effect.


## Exercise 6, apply forces

  - Follow steps described in:
    - `<ROOT>/src/exercise-06/js/E06.js`
  - If needed reference D3.js APIs:
    - https://github.com/d3/d3-force
  - You'll get approximately 5 minutes.
  