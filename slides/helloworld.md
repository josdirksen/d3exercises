## Helloworld of D3.js

> Goal of this first example, is to learn how you can select elements with D3.js, append new ones, remove elements, and set basic properties on the elements.


## Selections
  - `d3.select` and `d3.selectAll`
    - Uses the W3C selection syntax: uses `querySelector` and `querySelectorAll` 
  - Examples:
```javascript
   d3.selectAll('p') // Select all p elements in the document.
   d3.select('p') // Select first p element in the document.

   // Selects 1st span element of all <p> in the document    
   d3.selectAll('p').select('span')
   d3.select('#id') // select on id
   d3.select('.classname') // select on css class
```  


## We can change the properties off these selections

- `attr()`, `style()`, `html()`, `text()`, `classed()`
```javascript
    d3.selectAll('img.thumb').attr('height', 50)
    d3.selectAll('span').style('color', 'steelblue')
    d3.selectAll('span').html('<strong>d3.js</strong>')
    d3.selectAll('span').text('content')
    // conditionally set or remove classes
    d3.select('div').classed('container', true)
```
- Value can also be a function:

```javascript
    // d is bound data, i is the index
    d3.selectAll('img').attr('src', function(d, i) {
        return 'image' + i + '.png';
    });
```


## Modify the selection

- `append()`: Append child to each element of selection
```javascript
     d3.selectAll('p').append('span').
```
- `remove()`: Remove all the elements in the selection
```javascript
    // remove the first li of every lu
    d3.selectAll('ul').select('li').remove()
```
- `insert()`: Insert an element before another element
```javascript
    // insert a new span as the first element of the p
    d3.selectAll('p').insert('span', ':first-child');
```

**Selections are immutable, these actions return new selections, so we can chain them!**


## But Jquery can do...
  
 - With [jQuery]() you manipulate elements from a selection, with [D3.js]() you bind data (next example)
 - [D3.js]() has many data visualization utils and APIs and [jQuery]() focusses on web app related plugins.
 
 - But there is a big overlap
   - both are [DOM manipulation]() libraries
   - have [CSS/W3C selectors]()
   - and use a [fluent API]().

 - Similar to D3.js: Raphael.js and Processing.js


## Let's get started

```
$ git clone https://github.com/josdirksen/d3-exercises
$ python -m SimpleHTTPServer
```

Once again, if you don't have python, you can use mongoose:

- View at http://localhost:8000/src/exercise-01/E01.html

![](../img/ex1.png)


## Exercise 1: Learning d3.js

  - Follow steps described in:
    - `<ROOT>/src/exercise-01/js/E01.js`
  - Use `d3.select()`, `d3.selectAll()`, `class()`, `attr()`, `append()`, `remove()`, `html()`, `text()`
  - If needed reference D3.js select API: 
    - https://github.com/d3/d3-selection  
  - You'll get approximately 5 minutes.
  
**[Should you have question? Please ask.]()**  
