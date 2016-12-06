## D3.js data binding

> Learn how to create data driven document by usin the basic `select()`, `enter()`, `merge()`, `remove()` cycle when binding data to a selection


## Basic databinding
  
 - Bind data to a selection with `data(...)`
```html
<!-- Input Dom -->
<span></span>
<span></span>
<span></span>
<span></span>
```
```
var values=['a', 'b', 'c'];
d3.selectAll('span')
        .data(values)
        .text(function(d) {return d});
```   
```
<!-- Output Dom -->
<span>a</span>
<span>b</span>
<span>c</span>
<span></span>
```   


## Data driven elements

 - Assume an empty DOM

```javascript
   var values=['a', 'b', 'c'];
   var selection = d3.selectAll('span').data(values)
```
A selection is actually more than just the found elements
 - `enter()`: placeholder selection for unbound data
    
```
   // for all unbound data append a span attribute
   selection.enter().append('span').text(function(d) {return d});
```
- `exit()`: placeholder selection for leftover elements
```javascript
   // remove all the leftover elements
   selection.exit().remove()
```   


## Leads to this pattern

```javascript
function update(values) {
    // select all the current span elements and assign the data
    var selection = d3.selectAll('span').data(values)
    // for the unbound data, create a new span, and attach a class
    var newElements = selection.enter()
        .append('span')
        .attr('class', 'someClass');
        
    // Merge combines two selections. For the combined selection 
    // set the value of the span to the bound datum.
    newElements.merge(selection).text(function(d) {return d});
    
    // and remove the now obsolete elements
    selection.exit().remove();
}
```

This is the basic pattern you use to bind data, add new DOM elements, updated existing ones, and remove
obsolete ones.


## Which provides us with

- An easy way to let our data determine our elements.
- Reduces unnecessary creation of elements. 
- Allow all kinds of hooks e.g. for animations.

```javascript
// assume values contains some random numbers
function update(values) {
    var selection = d3.selectAll('circle').data(values)
    var newElements = selection.enter()
        .append('circle')
        .attr('class', 'someClass')
        .attr('cx', function(d, i) {return i * 50})
        .attr('cy', function() {return 50})
        .merge(selection)
            .transition().duration(2000)
            .attr('r', function(d, i) {return d});
    
    // and remove the now obsolete elements
    selection.exit().remove();
}
```


## Exercise 2: Goal

![](../img/ex2.png)


## Exercise 2: Databinding

  - Follow steps described in:
    - `<ROOT>/src/exercise-02/js/E02.js`
  - Use (same as previous) and `enter()`, `exit()`, `append()`, `remove()`
  - If needed reference D3.js select API: 
    - https://github.com/d3/d3-selection  
  - If time permits look at transistions API: 
    - https://github.com/d3/d3-selection  
  - You'll get approximately 5 minutes.
  
**[Should you have question? Please ask.]()**  
