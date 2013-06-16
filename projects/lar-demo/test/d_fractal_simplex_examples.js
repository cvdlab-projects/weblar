/**
* simplexFractal tests
*
* @author Fabio Cumbo, Elisa Lamberti and Andrea Somma
* @copyright 2013 Fabio Cumbo, Elisa Lamberti and Andrea Somma
*
*/

//ESEMPIO: SIMPLESSOFRATTALE 2D

var fSimplex2D = fractalSimplex(2,3,5)
fSimplex2D.draw();

fSimplex2D.hide();
var f = larFacets(fSimplex2D, 2);
f.draw();

f.hide();
var e = EXPLODE([2,2,2])(f);
e.draw();


//ESEMPIO: SIMPLESSOFRATTALE 3D

var fSimplex3D = fractalSimplex(3,3,5)
fSimplex3D.draw();

fSimplex3D.hide();
var f = larFacets(fSimplex3D, 3);
f.draw();

f.hide();
var e = EXPLODE([2,2,2])(f);
e.draw();