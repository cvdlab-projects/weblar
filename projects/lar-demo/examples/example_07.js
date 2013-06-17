/**
* larProduct & larFacets demo
*
* @author Fabio Cumbo, Elisa Lamberti and Andrea Somma
* @copyright 2013 Fabio Cumbo, Elisa Lamberti and Andrea Somma
*
*/

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
step(function () {

// ESEMPIO 1: DUE VETTORI, IL CUI PRODOTTO è UN QUADRATO
m3 = larProduct(m1, m2);
m3.draw();

});

//STEP 02
step(function () {

m3.hide();

});

//STEP 03
step(function () {

// ESEMPIO 2: DUE TRIANGOLI SU UN PIANO DISTANZIATI DI DUE UNITà 
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
step(function () {

// ESEMPIO 3: 
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
step(function () {

// ESEMPIO 5: UN VETTORE E UN QUADRATO, IL CUI PRODOTTO è UN CUBO
v1 = [[0.0, 0.0], [0.0, 1.0], [1.0, 0.0], [1.0, 1.0]]
c1 = [[0, 1, 2, 3]];
m1 = new lar.Model(v1, c1);

v2 = [[0.0, 1.0], [1.0, 1.0]]
c2 = [[0, 1]];
m2 = new lar.Model(v2, c2);
m3 = larProduct(m1, m2);
m3.draw();

});

//STEP 08
step(function () {

m3.hide();

});

//STEP 09
step(function () {

// ESEMPIO DI USO BASE: UN TRIANGOLO (input = celle)
model = new lar.Model([ [1,0,0],[0,1,0],[0,0,0] ], [ [0,1,2],[0,1],[1,2],[0,2] ]);
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
step(function () {

// ALTRO ESEMPIO, DUE TRIANGOLI (input = celle)
e.hide();

model = new lar.Model([ [0,0,0],[2,0,0],[2,2,0],[0,2,0] ], [ [0,1,3],[1,2,3],[0,1],[0,3],[2,3],[1,2] ]);
m = larFacets_simple(model, 2, true);
m.draw();

});

//STEP 12
step(function () {

m.hide();
e = EXPLODE([2,2,2])(m);
e.draw();

});

//STEP 13
step(function () {

// ESEMPIO: DUE QUADRATI (input = Md)
e.hide();
m = larFacets_simple([ [ [0,0,0],[0,1,0],[1,1,0],[1,0,0],[2,1,0],[2,0,0] ], 
	[ [1,1,1,1,0,0],[0,0,1,1,1,1],[1,1,0,0,0,0],[0,1,1,0,0,0],[0,0,1,0,1,0],[0,0,0,0,1,1],[0,0,0,1,0,1],[1,0,0,1,0,0] ] ], 2, false);
m.draw();

});

//STEP 14
step(function () {

m.hide();
e = EXPLODE([2,2,2])(m);
e.draw();

});

//STEP 15
step(function () {

// ESEMPIO COMPLESSO: UN CUBO (input = Md)
e.hide();
m = larFacets_simple([ [ [0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,1,1],[1,1,1],[1,0,1],[0,0,1] ], 
	[ [1,1,1,1,1,1,1,1],[1,1,1,1,0,0,0,0],[0,1,1,0,0,1,1,0],[0,0,1,1,1,1,0,0],[1,0,0,1,1,0,0,1],[1,1,0,0,0,0,1,1],[0,0,0,0,1,1,1,1] ] ], 3, false);
m.draw();

});

//STEP 16
step(function () {

m.hide();
e = EXPLODE([2,2,2])(m);
e.draw();

});

//STEP 17
step(function () {

// ESEMPIO: DUE CUBI ATTACCATI (input = Md)
e.hide();
m = larFacets_simple([ [ [0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,1,1],[1,1,1],[1,0,1],[0,0,1],[1,2,0],[0,2,0],[0,2,1],[1,2,1] ], 
	[ [1,1,1,1,1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0,0,0,0,0],[0,1,1,0,0,1,1,0,0,0,0,0],[1,0,0,1,1,0,0,1,0,0,0,0],[1,1,0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,1,1,0,0,0,0]
,[0,0,1,0,0,1,0,0,1,0,0,1],[0,0,1,1,0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,0,1,1,1,1],[0,0,0,1,1,0,0,0,0,1,1,0],[0,0,0,0,1,1,0,0,0,0,1,1],[0,0,1,1,1,1,0,0,1,1,1,1]
	 ] ], 3, false);
m.draw();

});

//STEP 18
step(function () {

m.hide();
e = EXPLODE([2,2,2])(m);
e.draw();

});

//STEP 19
step(function () {

// ESEMPIO: UNA PIRAMIDE
e.hide();
m = new lar.Model([[0,0,0],[1,0,0],[0,1,0],[0,0,1]],[[0,1,2,3]]);
f = larFacets(m, 3);
f.draw();

});

//STEP 20
step(function () {

f.hide();
e = EXPLODE([2,2,2])(f);
e.draw();

});

//STEP 21
step(function () {

// ESEMPIO: CUBO FATTO DI CELLE TRIANGOLARI
e.hide();
m = new lar.Model([ [0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,1,1],[1,1,1],[1,0,1],[0,0,1] ], 
	[ [6,5,2,4],[1,2,6,3],[6,2,3,4],[6,7,4,3],[6,7,1,3],[0,7,1,3] ]);
f = larFacets(m, 3);
f.draw();

});

//STEP 22
step(function () {

f.hide();
e = EXPLODE([2,2,2])(f);
e.draw();

});

//STEP 23
step(function () {

//ESEMPIO: SIMPLESSOFRATTALE 2D
e.hide();
fSimplex2D = fractalSimplex(2,3,5)
fSimplex2D.draw();

});

//STEP 24
step(function () {

fSimplex2D.hide();
f = larFacets(fSimplex2D, 2);
f.draw();

});

//STEP 25
step(function () {

f.hide();
e = EXPLODE([2,2,2])(f);
e.draw();

});

//STEP 26
step(function () {

//ESEMPIO: SIMPLESSOFRATTALE 3D
e.hide();
fSimplex3D = fractalSimplex(3,3,5)
fSimplex3D.draw();

});

//STEP 27
step(function () {

fSimplex3D.hide();
f = larFacets(fSimplex3D, 3);
f.draw();

});

//STEP 28
step(function () {

f.hide();
e = EXPLODE([2,2,2])(f);
e.draw();

});

//STEP29
step(function () {

e.hide();

d = nn(5)
m1 = lar.Model(d[0],d[1]);
m1.draw();

});

//STEP30
step(function () {

m1.hide();

m2 = larProduct(m1, m1);
m2.draw();

});

//STEP31
step(function () {

m2.hide();

m3 = larProduct(m2, m1);
m3.draw();

});

//STEP32
step(function () {

m3.hide();

m3 = addExtFacetsToModel(m3);
m4 = larFacets_simple(m3,3,true);
m4.draw();

});

//STEP32
step(function () {

m4.hide();

e = EXPLODE([2,2,2])(m4);
e.draw();

});

// FINAL STEP
step(function () {

e.hide();
//the end :)

});