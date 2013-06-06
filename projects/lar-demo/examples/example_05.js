//STEP 01
step(function () {

v1 = [[0.0, 0.0], [1.0, 0.0], [2.0, 0.0], [0.0, 1.0], [1.0, 1.0], [2.0, 1.0], [0.0, 2.0], [1.0, 2.0], [2.0, 2.0]]
c1 = [[0,1,3], [1,2,4], [2,4,5], [3,4,6], [4,6,7], [5,7,8]]
});

//STEP 02
step(function () {

m1 = new lar.Model(v1, c1).draw()

});

//STEP 03
step(function () {

m1.hide()
m1_sk1 = m1.skeleton(1).draw()

});

//STEP 04
step(function () {

m1_sk1.hide();
m2 = m1.extrude([0.5,0.5]).draw()

});

//STEP 05
step(function () {

m2.hide()
m2_sk1 = m2.skeleton(1).draw()

});

//STEP 06
step(function () {

m2_sk1.hide()
m2_b = m2.boundary(3).draw()

});


//STEP 7
step(function () {

m2_b.hide()
m2_exploded = m2.explode([1.6, 1.6, 1.6]).draw()

});

//STEP 8
step(function () {

m2_exploded.hide()
m2_b = m2.boundary(3).draw().color([.6, .5, .4, 0.75])

})

//STEP 9
step(function () {

m2_b.hide()
m2_b_exploded = m2_b.explode([1.6, 1.6, 1.6]).draw()

})

//STEP 10
step(function () {

m2_b.hide()
empty_m = m2_b.boundary(2)
console.log(empty_m.isEmpty())

});




// FINAL STEP
step(function () {

//the end :)

});
