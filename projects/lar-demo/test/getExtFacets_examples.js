/**
* addExtFacets example
*
* @author Fabio Cumbo, Elisa Lamberti and Andrea Somma
* @copyright 2013 Fabio Cumbo, Elisa Lamberti and Andrea Somma
*
*/

//ESEMPIO AVANZATO: ESTRAZIONE AUTOMATICA DI CELLE CONVESSE DA UN INSIEME DI CUBI PRODOTTI CON LARPRODUCT

var d = nn(5);
var m1 = lar.Model(d[0],d[1]);
var m2 = larProduct(m1, m1);
var m3 = larProduct(m2, m1);
m3 = addExtFacetsToModel(m3);
var m5 = larFacets_simple(m3,3,true);
m5.draw();

//ESEMPIO AVANZATO: ESTRAZIONE AUTOMATICA DI CELLE CONVESSE DA UN INSIEME DI CUBI PRODOTTI CON LARPRODUCT

var d = ns(6);
var m1 = lar.Model(d[0],d[1]);
var m2 = larProduct(m1, m1);
var m3 = larProduct(m2, m1);
m3 = addExtFacetsToModel(m3);
var m5 = larFacets_simple(m3,3,true);
m5.draw();

// PER VEDERE LE CELLE DELL'ESEMPIO:
m5.hide();
var e = EXPLODE([2,2,2])(m5);
e.draw();