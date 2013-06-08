// ESEMPIO DI USO BASE: UN TRIANGOLO (input = Md)
var m = larFacets_simple([ [ [1,0,0],[0,1,0],[0,0,0] ], [ [1,1,1],[1,1,0],[0,1,1],[1,0,1] ] ], 2, false);
m.draw();
/* Primo valore: array di array di array: contiene due array di array, il primo sono i vertici di un triangolo, 
il secondo sono le quattro facce (la faccia vera più le tre faccie esterne) */

// ESEMPIO DI USO BASE: UN TRIANGOLO (input = celle)
var model = new lar.Model([ [1,0,0],[0,1,0],[0,0,0] ], [ [0,1,2],[0,1],[1,2],[0,2] ]);
var m = larFacets_simple(model, 2, true);
m.draw();
/* Primo valore: array di array di array: contiene due array di array, il primo sono i vertici di un triangolo, 
il secondo sono le quattro facce (la faccia vera più le tre faccie esterne) */

// ALTRO ESEMPIO: DUE TRIANGOLI (input = Md)
var m = larFacets_simple([ [ [0,0,0],[2,0,0],[2,2,0],[0,2,0] ], [ [1,1,0,1],[0,1,1,1],[1,1,0,0],[1,0,0,1],[0,0,1,1],[0,1,1,0] ] ], 2, false);
m.draw();

// ALTRO ESEMPIO, DUE TRIANGOLI (input = celle)
var model = new lar.Model([ [0,0,0],[2,0,0],[2,2,0],[0,2,0] ], [ [0,1,3],[1,2,3],[0,1],[0,3],[2,3],[1,2] ]);
var m = larFacets_simple(model, 2, true);
m.draw();

// ESEMPIO RICHIESTO DAL PROF 
var model = new lar.Model([[0,6],[0,0],[3,0],[6,0],[0,3],[3,3],[6,3],[6,6],[3,6]], [[5,6,7,8],[0,5,8],[0,4,5],[1,2,4,5],[2,3,5,6],[0,8,7],[3,6,7],[1,2,3],[0,1,4],[0,6,7],[3,8,7]]);
var m = larFacets_simple(model, 2,true);
//le celle risultanti sono esatte e presenti nel modello in output ma facendo il draw non ne disegna 2...perchè????



// PER VEDERE LE CELLE DI UN ESEMPIO:
m.hide();
var e = EXPLODE([2,2,2])(m);
e.draw();