//STEP 00
step(function () {

v1 = [[0.0, 0.0], [1.0, 0.0]]
c1 = [[0, 1]];
m1 = new lar.Model(v1, c1);

v2 = [[0.0, 1.0], [1.0, 1.0]]
c2 = [[0, 1]];
m2 = new lar.Model(v2, c2);

});

//STEP 01
// ESEMPIO 1: DUE VETTTORI, IL CUI PRODOTTO è UN QUADRATO
step(function () {

m3 = larProduct(m1, m2);
m3.draw();

});

//STEP 02
step(function () {

m3.hide();

});

//STEP 03
// ESEMPIO 2: DUE TRIANGOLI SU UN PIANO DISTANZIATI DI DUE UNITà 
step(function () {

v1 = [[0.0, 0.0],[0.0, 1.0],[1.0, 0.0]];
c1 = [[0, 1, 2]];
m1 = new lar.Model(v1, c1);

v2 = [[2.0, 0.0],[2.0, 1.0],[3.0, 0.0]];
c2 = [[0, 1, 2]];
m2 = new lar.Model(v2, c2);

m3 = larProduct(m1, m2);
m3.draw();

});

//STEP 04
step(function () {

m3.hide();

});

//STEP 05
// ESEMPIO 3: 
step(function () {

m1 = new lar.Model([[0,6],[0,0],[3,0],[6,0],[0,3],[3,3],[6,3],[6,6],[3,6]], [[5,6,7,8],[0,5,8],[0,4,5],[1,2,4,5],[2,3,5,6],[0,8,7],[3,6,7],[1,2,3],[0,1,4]]);
m2 = new lar.Model([[0],[1]], [[0,1]]);
m3 = larProduct(m1, m2);
m3.draw();

});

//STEP 06
step(function () {

m3.hide();

});

//STEP 07
// ESEMPIO DI USO BASE: UN TRIANGOLO (input = celle)
step(function () {

model = new lar.Model([ [1,0,0],[0,1,0],[0,0,0] ], [ [0,1,2],[0,1],[1,2],[0,2] ]);
m = larFacets_simple(model, 2, true);
m.draw();

});

//STEP 08
step(function () {

m.hide();
e = EXPLODE([2,2,2])(m);
e.draw();

});

//STEP 09
// ALTRO ESEMPIO, DUE TRIANGOLI (input = celle)
step(function () {

e.hide();

model = new lar.Model([ [0,0,0],[2,0,0],[2,2,0],[0,2,0] ], [ [0,1,3],[1,2,3],[0,1],[0,3],[2,3],[1,2] ]);
m = larFacets_simple(model, 2, true);
m.draw();

});

//STEP 10
step(function () {

m.hide();
e = EXPLODE([2,2,2])(m);
e.draw();

});

//STEP 11
// ESEMPIO: DUE QUADRATI (input = Md)
step(function () {

e.hide();
m = larFacets_simple([ [ [0,0,0],[0,1,0],[1,1,0],[1,0,0],[2,1,0],[2,0,0] ], 
	[ [1,1,1,1,0,0],[0,0,1,1,1,1],[1,1,0,0,0,0],[0,1,1,0,0,0],[0,0,1,0,1,0],[0,0,0,0,1,1],[0,0,0,1,0,1],[1,0,0,1,0,0] ] ], 2, false);
m.draw();

});

//STEP 12
step(function () {

m.hide();
e = EXPLODE([2,2,2])(m);
e.draw();

});

//STEP 13
// ESEMPIO COMPLESSO: UN CUBO (input = Md)
step(function () {

e.hide();
m = larFacets_simple([ [ [0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,1,1],[1,1,1],[1,0,1],[0,0,1] ], 
	[ [1,1,1,1,1,1,1,1],[1,1,1,1,0,0,0,0],[0,1,1,0,0,1,1,0],[0,0,1,1,1,1,0,0],[1,0,0,1,1,0,0,1],[1,1,0,0,0,0,1,1],[0,0,0,0,1,1,1,1] ] ], 3, false);
m.draw();

});

//STEP 14
step(function () {

m.hide();
e = EXPLODE([2,2,2])(m);
e.draw();

});

//STEP 15
// ESEMPIO FINALE: DUE CUBI ATTACCATI (input = Md)
step(function () {

e.hide();
m = larFacets_simple([ [ [0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,1,1],[1,1,1],[1,0,1],[0,0,1],[1,2,0],[0,2,0],[0,2,1],[1,2,1] ], 
	[ [1,1,1,1,1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0,0,0,0,0],[0,1,1,0,0,1,1,0,0,0,0,0],[1,0,0,1,1,0,0,1,0,0,0,0],[1,1,0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,1,1,0,0,0,0]
,[0,0,1,0,0,1,0,0,1,0,0,1],[0,0,1,1,0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,0,1,1,1,1],[0,0,0,1,1,0,0,0,0,1,1,0],[0,0,0,0,1,1,0,0,0,0,1,1],[0,0,1,1,1,1,0,0,1,1,1,1]
	 ] ], 3, false);
m.draw();

});

//STEP 16
step(function () {

m.hide();
e = EXPLODE([2,2,2])(m);
e.draw();

});

//STEP 17
// ESEMPIO: UNA PIRAMIDE
step(function () {

e.hide();
m = new lar.Model([[0,0,0],[1,0,0],[0,1,0],[0,0,1]],[[0,1,2,3]]);
f = larFacets(m, 3);
f.draw();

});

//STEP 18
step(function () {

f.hide();
e = EXPLODE([2,2,2])(f);
e.draw();

});

//STEP 19
// ESEMPIO: CUBO FATTO DI CELLE TRIANGOLARI
step(function () {

e.hide();
m = new lar.Model([ [0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,1,1],[1,1,1],[1,0,1],[0,0,1] ], 
	[ [6,5,2,4],[1,2,6,3],[6,2,3,4],[6,7,4,3],[6,7,1,3],[0,7,1,3] ]);
f = larFacets(m, 3);
f.draw();

});

//STEP 20
step(function () {

f.hide();
e = EXPLODE([2,2,2])(f);
e.draw();

});

// FINAL STEP
step(function () {

//the end :)

});