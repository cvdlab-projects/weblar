//STEP 01
step(function () {

v1 = [[0.0, 0.0], [1.0, 0.0]]
c1 = [[0, 1]];
m1 = new lar.Model(v1, c1);

v2 = [[0.0, 1.0], [1.0, 1.0]]
c2 = [[0, 1]];
m2 = new lar.Model(v2, c2);

m3 = larProduct(m1, m2);
m3.draw();

});

//STEP 02
step(function () {

m3.hide();

});

//STEP 03
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
step(function () {

m = larFacets_simple([ [ [1,0,0],[0,1,0],[0,0,0] ], [ [0,1,2],[0,1],[1,2],[0,2] ] ], 2, true);
m.draw();

});

//STEP 06
step(function () {

m.hide();
e = EXPLODE([2,2,2])(m);
e.draw();

});

//STEP 07
step(function () {

e.hide();
m = larFacets_simple([ [ [0,0,0],[2,0,0],[2,2,0],[0,2,0] ], [ [0,1,3],[1,2,3],[0,1],[0,3],[2,3],[1,2] ] ], 2, true);
m.draw();

});

//STEP 08
step(function () {

m.hide();
e = EXPLODE([2,2,2])(m);
e.draw();

});

//STEP 09
step(function () {

e.hide();
m = larFacets_simple([ [ [0,0,0],[0,1,0],[1,1,0],[1,0,0],[2,1,0],[2,0,0] ], 
	[ [1,1,1,1,0,0],[0,0,1,1,1,1],[1,1,0,0,0,0],[0,1,1,0,0,0],[0,0,1,0,1,0],[0,0,0,0,1,1],[0,0,0,1,0,1],[1,0,0,1,0,0] ] ], 2, false);
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

e.hide();
m = larFacets_simple([ [ [0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,1,1],[1,1,1],[1,0,1],[0,0,1] ], 
	[ [1,1,1,1,1,1,1,1],[1,1,1,1,0,0,0,0],[0,1,1,0,0,1,1,0],[0,0,1,1,1,1,0,0],[1,0,0,1,1,0,0,1],[1,1,0,0,0,0,1,1],[0,0,0,0,1,1,1,1] ] ], 3, false);
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

e.hide();
m = larFacets_simple([ [ [0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,1,1],[1,1,1],[1,0,1],[0,0,1],[1,2,0],[0,2,0],[0,2,1],[1,2,1] ], 
	[ [1,1,1,1,1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0,0,0,0,0],[0,1,1,0,0,1,1,0,0,0,0,0],[1,0,0,1,1,0,0,1,0,0,0,0],[1,1,0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,1,1,0,0,0,0]
,[0,0,1,0,0,1,0,0,1,0,0,1],[0,0,1,1,0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,0,1,1,1,1],[0,0,0,1,1,0,0,0,0,1,1,0],[0,0,0,0,1,1,0,0,0,0,1,1],[0,0,1,1,1,1,0,0,1,1,1,1]
	 ] ], 3, false);
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

e.hide();
m = new lar.Model([[0,0,0],[1,0,0],[0,1,0],[0,0,1]],[[0,1,2,3]]);
f = larFacets(m, 3);
f.draw();

});

//STEP 16
step(function () {

f.hide();
e = EXPLODE([2,2,2])(f);
e.draw();

});

//STEP 17
step(function () {

e.hide();
m = new lar.Model([ [0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,1,1],[1,1,1],[1,0,1],[0,0,1] ], 
	[ [6,5,2,4],[1,2,6,3],[6,2,3,4],[6,7,4,3],[6,7,1,3],[0,7,1,3] ]);
f = larFacets(m, 3);
f.draw();

});

//STEP 18
step(function () {

f.hide();
e = EXPLODE([2,2,2])(f);
e.draw();

});

// FINAL STEP
step(function () {

//the end :)

});