// ESEMPIO DI USO BASE: UN TRIANGOLO (input = Md)
var m = larFacets([ [ [1,0,0],[0,1,0],[0,0,0] ], [ [1,1,1],[1,1,0],[0,1,1],[1,0,1] ] ], 2, false);
m.draw();
/* Primo valore: array di array di array: contiene due array di array, il primo sono i vertici di un triangolo, 
il secondo sono le quattro facce (la faccia vera più le tre faccie esterne) */

// ESEMPIO DI USO BASE: UN TRIANGOLO (input = celle)
var m = larFacets([ [ [1,0,0],[0,1,0],[0,0,0] ], [ [0,1,2],[0,1],[1,2],[0,2] ] ], 2, true);
m.draw();
/* Primo valore: array di array di array: contiene due array di array, il primo sono i vertici di un triangolo, 
il secondo sono le quattro facce (la faccia vera più le tre faccie esterne) */

// ALTRO ESEMPIO: DUE TRIANGOLI (input = Md)
var m = larFacets([ [ [0,0,0],[2,0,0],[2,2,0],[0,2,0] ], [ [1,1,0,1],[0,1,1,1],[1,1,0,0],[1,0,0,1],[0,0,1,1],[0,1,1,0] ] ], 2, false);
m.draw();

// ALTRO ESEMPIO, DUE TRIANGOLI (input = celle)
var m = larFacets([ [ [0,0,0],[2,0,0],[2,2,0],[0,2,0] ], [ [0,1,3],[1,2,3],[0,1],[0,3],[2,3],[1,2] ] ], 2, true);
m.draw();


// PER VEDERE LE CELLE DI UN ESEMPIO:
m.hide();
var e = EXPLODE([2,2,2])(m);
e.draw();