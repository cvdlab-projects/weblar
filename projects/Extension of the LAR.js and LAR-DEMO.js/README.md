# Main folder of the extension of the LAR.js and LAR-DEMO.js projects

## Come utilizzare larProduct (simple): 
Dare in input alla funzione i due modelli di cui si vuole fare il prodotto.

## Come utilizzare larFacets (simple): 
La versione attuale lavora su uno pseudo-modello composto da vertici e celle + celle esterne. Attualmente le celle sono passate in due modi: versione matriciale binaria e versione matriciale lar (non binaria). Per il primo caso, il terzo input della funzione, che è un booleano, andrà settato a false, per il secondo true oppure nulla.

## Come utilizzare larFacets (advanced): 
Questa è la versione che lavora su un lar model vero e proprio. L'apprendimento delle celle esterne avviene tramite la funzione boundary, su cui vengono quindi scaricate le responsabilità.

## Come fare i test: 
Aprire il collegamento a index.html e aprire uno dei file di test, presenti sotto la cartella test. Copiare uno degli esempi presenti nel file desiderato ed incollarlo nella consolle.