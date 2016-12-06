## Tree and hierarchies

> See what is possible in d3 to visualizes nested trees of data


## D3.js supports tree data

- API: https://github.com/d3/d3-hierarchy
- Many standard visualizations: `d3.tree()`

![](../img/tree_1.png)


## `d3.cluster()`

- Same as the tree, but leaves are at the same position
 
![](../img/tree_2.png)


## `d3.treemap()`

- Supports different clustering algorithms

![](../img/treemap.png)


## `d3.pack()`

- Same as `d3.treemap`, but with circles

![](../img/pack.png)


## Or your custom implementation

<img src='../img/radial.png' height=500></img>

[Sample](http://localhost/dev/git/dataviz-d3js/src/chapter-03/D03-02.html)


## All follow same approach

1. Load the data (`d3.csv`,`d3.tsv`,`d3.json` etc.)
2. Convert the data into a tree stucture
3. Pass it through a generator
4. Use the output from the generator to draw the chart 


## Nested data: d3.stratisfy
  
d3.stratisfy() can follow `ids` in your data 
```
id,parentId,name,description
180580,,Felidae,cats
180581,552363,Lynx,lynxes
180582,180581,rufus,Bobcat
180583,180582,rufus,bobcat
180584,180581,lynx,Eurasian Lynx
180585,180581,canadensis,Canada lynx`       
```
```javascript
var stratify = d3.stratify();
var root = stratify(data);
```
<img src='../img/stratisfy.png' height=200></img>


## Nested: d3.nest / d3.hierarchy

`d3.nest()` can group data (multiple times) based on a key

```
"Country (en)";"Country (de)";"Country (local)";"Country code";"Continent";
"Afghanistan";"Afghanistan";"Afganistan/Afqanestan";"AF";"Asia";
"Egypt";"Ägypten";"Misr";"EG";"Africa";
```
```javascript
var entries = d3.nest()
    .key(function (d) {return d.Continent; })
    .entries(data);
    
var root = d3.hierarchy({values: entries}, 
           function(d) { return d.values; })        
```

<img src='../img/nest.png' height=200></img>


## Use a generator

With data in the correct structure, we can use a generator

```
// normal node tree
var tree = d3.tree()
    .size([height, width])
    .separation(function(a, b) { 
    return (a.parent === b.parent ? 5 : 13)
    });
    
// create a treemap
var tree = d3.treemap()
    .size([width, height])
    .padding(2)
    .tile(d3.treemapSquarify.ratio(1))
    
// enrich the root    
tree(root)    

```


## Which enriches the structure
 
 <img src='../img/tree_data.png' height=300>
 <img src='../img/treemap_data.png' height=300>
 
```javascript
 root.leaves()       // return all the nodes without children
 root.descendants()  // return array of this and all descendants
 
 chart.selectAll(".node")
   .data(root.descendants())
   .enter(..)
```


## Exercise 5: Goal

<img src='../img/ex5.png' height=550></img>


## Exercise 5, create a treemap

  - Follow steps described in:
    - `<ROOT>/src/exercise-05/js/E05.js`
  - If needed reference D3.js APIs:
    - https://github.com/d3/d3-hierarchy
  - You'll get approximately 8 minutes.
  