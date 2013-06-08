// ESEMPIO 1: DUE VETTTORI, IL CUI PRODOTTO è UN QUADRATO

v1 = [[0.0, 0.0], [1.0, 0.0]]
c1 = [[0, 1]];
m1 = new lar.Model(v1, c1);

v2 = [[0.0, 1.0], [1.0, 1.0]]
c2 = [[0, 1]];
m2 = new lar.Model(v2, c2);

var m3 = larProduct(m1, m2);
m3.draw();

// ESEMPIO 2: DUE TRIANGOLI SU UN PIANO DISTANZIATI DI DUE UNITà

v1 = [[0.0, 0.0],[0.0, 1.0],[1.0, 0.0]];
c1 = [[0, 1, 2]];
m1 = new lar.Model(v1, c1);

v2 = [[2.0, 0.0],[2.0, 1.0],[3.0, 0.0]];
c2 = [[0, 1, 2]];
m2 = new lar.Model(v2, c2);

var m3 = larProduct(m1, m2);
m3.draw();

// ESEMPIO 3: 
var m1 = new lar.Model([[0,6],[0,0],[3,0],[6,0],[0,3],[3,3],[6,3],[6,6],[3,6]], [[5,6,7,8],[0,5,8],[0,4,5],[1,2,4,5],[2,3,5,6],[0,8,7],[3,6,7],[1,2,3],[0,1,4]]);
var m2 = new lar.Model([[0],[1]], [[0,1]]);
var m3 = larProduct(m1, m2);
m3.draw();

//ESEMPIO 4: // non è un modello lar valido VD istruzione if nel costruttore di Model
var m1 = new lar.Model([[0,6],[0,0],[3,0],[6,0],[0,3],[3,3],[6,3],[6,6],[3,6]], [[5,6,7,8],[0,5,8],[0,4,5],[1,2,4,5],[2,3,5,6],[0,8,7],[3,6,7],[1,2,3],[0,1,4]]);
var m2 = new lar.Model([[0.],[1.],[2.],[4.]], [[0],[1],[2],[3]]);  
var m3 = larProduct(m1, m2);
m3.draw();