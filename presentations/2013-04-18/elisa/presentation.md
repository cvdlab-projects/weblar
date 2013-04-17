Extension of the LAR.js and LAR-DEMO.js projects with convex cells
===
* Reimplementation of the "extract" function, already present in the project,
generalizing it to make it work on cells with general shape. 

!

The problem:
===
The current implementation of the project is provided by an "extract" function
which computes (d-1)-chains from d-chains, that is, generates the facets from 
the input cells. This function currently works only on simplexes and use a simple
algorithm which extracts facets by deleting one vertex a time.
We need to reimplement the "extract" function to make it work with generic cells.

!

The solution: 
===
The characteristic matrix Md is the matrix that fully describes the input object.
The new "extract" function will implement an algorithm which compute the M(d-1) matrix starting from Md. 
It's necessary that there be a partition of the entire space, including the external
space that could be represent by putting together the boundary vertices.

!

The algorithm's steps:
===
* Computation of the adjacency matrix Ad: computed by matrix multiplication between
the characteristic matrix Md and its traspose. Each element aij would represent the
number of shared cells between cell i and cell j.
* Computation of facets: having a generic aij greater or equal to the dimension d of 
cells means that the cell i and the cell j must share a common facet, that can be computed
as integer product of rows i and j of Md. The generated characteristic vector gives a row of the output matrix Md-1.

!
