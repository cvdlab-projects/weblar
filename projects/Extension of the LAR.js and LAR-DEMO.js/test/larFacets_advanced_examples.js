// ESEMPIO: I DUE TRIANGOLI
var m = new lar.Model([ [0,0,0],[2,0,0],[2,2,0],[0,2,0] ], [ [0,1,3],[1,2,3] ]);
var f = larFacets(m, 2);
f.draw();

// ESEMPIO: UNA PIRAMIDE
var m = new lar.Model([[0,0,0],[1,0,0],[0,1,0],[0,0,1]],[[0,1,2,3]]);
var f = larFacets(m, 3);
f.draw();

// ESEMPIO: DUE QUADRATI - NON FUNZIONA, COLPA DI BOUNDARY CHE RITORNA UN MODELLO SENZA CELLE
var m = new lar.Model( [ [0,0,0],[0,1,0],[1,1,0],[1,0,0],[2,1,0],[2,0,0] ], 
	[ [0,1,2,3],[2,3,4,5] ]);
var f = larFacets(m, 2);
f.draw();

// ESEMPIO TOSTO: CUBO MONOCELLA - FUNZIONA MALE, COLPA DI BOUNDARY, CHE TROVA 57 CELLE
var m = new lar.Model([ [0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,1,1],[1,1,1],[1,0,1],[0,0,1] ], 
	[ [0,1,2,3,4,5,6,7] ]);
var f = larFacets(m, 3);
f.draw();

// ESEMPIO FINALE: DUE CUBI ATTACCATI - NON FUNZIONA, E DA UN MODELLO CON 333 CELLE X'D
var m = new lar.Model([ [0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,1,1],[1,1,1],[1,0,1],[0,0,1],[1,2,0],[0,2,0],[0,2,1],[1,2,1] ], 
	[ [0,1,2,3,4,5,6,7],[2,3,4,5,8,9,10,11] ]);
var f = larFacets(m, 3);
f.draw();


// PER VEDERE LE CELLE DI UN ESEMPIO:
f.hide();
var e = EXPLODE([2,2,2])(f);
e.draw();