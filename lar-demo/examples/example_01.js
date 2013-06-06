//STEP 01
step(function () {

v1 = [[0.0],[1.0],[2.0],[3.0]]
c1 = [[0,1],[1,2],[2,3]]

});

//STEP 02
step(function () {

m1 = new lar.Model(v1, c1).draw()

});

//STEP 03
step(function () {

m1.hide();
m2 = m1.extrude([1,1,1]).draw()

});

//STEP 04
step(function () {

m2.hide()
m2_sk1 = m2.skeleton(1).draw()

});

//STEP 05
step(function () {

m2_sk1.hide()
m2_b = m2.boundary(2).draw()

});

//STEP 06
step(function () {

chain_1 = [16]
m1_edge = m2.submodel(1, chain_1).draw()

});

//STEP 07
step(function () {

m2_edge_cob = m2.coboundary(1, chain_1).draw()

});

//STEP 08
step(function () {

m2_b.hide()
m1_edge.hide()
m2_edge_cob.hide()
chain_2 = [7, 10]
m2_hole = m2.submodel(2, chain_2, false).draw()

});

//STEP 09
step(function () {

m2_hole.hide()
m2_hole_sk1 = m2_hole.skeleton(1).draw()

});

//STEP 10
step(function () {

m2_hole_sk1.hide()
m2_hole_b = m2_hole.boundary(2).draw()

});

//STEP 11
step(function () {

m2_hole_b.hide()
m3 = m2_hole.extrude([1,1,1]).draw()

});

//STEP 12
step(function () {

m3.hide()
m3_exploded = m3.explode([1.6, 1.6, 1.6]).draw()

});

//STEP 13
step(function () {

m3_exploded.hide()
m3_b = m3.boundary(3).draw().color([.6, .5, .4, 0.75])

})

//STEP 14
step(function () {

m3_b.hide()
m3_b_exploded = m3_b.explode([1.6, 1.6, 1.6]).draw()

})

//STEP 15
step(function () {

m3_b.hide()
empty_m = m3_b.boundary(2)
console.log(empty_m.isEmpty())

});




// FINAL STEP
step(function () {

//the end :)

});