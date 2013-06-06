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