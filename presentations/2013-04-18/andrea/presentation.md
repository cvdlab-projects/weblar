Weblar - Task one: 
===
Extension of the `LAR.js` and `LAR-DEMO.js` projects with `convex cells`

!

Point (sub-task) one: 

Implementation of the cartesian product function between convex cells.

* Study of the "larProduct" function, currently present in lar.py.
* Integration of the lar.js project with this function, which will allow to do the product between convex cells and which is based on the "larProduct" function.

!

The problem: 
===
* The current implementation of lar.js and lar-demo.js isn't provided of the product operation between convex cells. This operation, given two lar models with dimension d1 and d2, each one composed by two arrays (vertices and cells), would allow to generate a third lar model with dimension d1+d2, whose vertices will be the cartesian product between input model's vertices. The same operation will be applied to the array of cells of the input models to generate the cells of the final model.

!

The solution:
===
* The javascript implementation of this function will calculate the cartesian product descripted above. This function will be tested with simple models. We will use basic operations like "for cicles" and sorting algorithm, to combine the input models' vertexes and cells.

[Task's folder](https://github.com/cvdlab-bio/weblar/tree/master/projects/Extension%20of%20the%20LAR.js%20and%20LAR-DEMO.js)
