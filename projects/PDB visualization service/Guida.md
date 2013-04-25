GUIDA ALL�UTILIZZO DI WEBMOL-WEBPDB
===================

Software necessario
----------------------
-  CouchDB 1.0.1
-  Node.js

Procedura
----------------------

Installare il software necessario.

Installare i moduli node tramite l�opportuno script installModules.sh presente in WebPDB. 

Configurare il database nel quale si vogliono memorizzare le proteine in formato .pdb. 
Per far ci� modificare i file database.json e config.json, presenti nella cartella dbmodule di WebPDB, 
inserendo gli opportuni databases, username e password.

Popolare il database con le proteine in formato .pdb. Per far ci�, andare nella cartella importer di webpdb. 
Aprire il file testModules.js e decommentare la riga 

  * importer.runImpoprt(�directory_contenente_proteine_pdb�, false, �proteins�, frUtils.filterExtension(PDB_EXTENSION));                                                                                                         

e modificare il nome della directory che contiene i file delle proteine in formato .pdb. 
Applicare lo stesso procedimento quando si vogliono caricare i monomeri ma decommentando la riga 

  * importer.runImpoprt(�directory_contenente_proteine_pdb�, false, �monomers�, frUtils.filterExtension(PDB_EXTENSION));

Avviare il servizio REST avviando server_express. Per far ci� digitare da riga di comando: node server_express. 
A questo punto WebPDB � pronto a ricevere richieste.

Avviare WebMOL e digitare l�identificatore della proteina nell�apposito campo per visualizzare tale proteina.


**NOTA:** Per la comunicazione vengono utilizzate richieste AJAX. In particolare, WebMOL effettua richieste HTTP tramite 
XMLHttpRequest che sono soggette alla same-origin-policy. Ci� comporta che un�applicazione che usa XMLHttpRequest 
pu� effettuare richieste HTTP verso il dominio dal quale � stato caricato ma non verso altri domini. 

**NOTA:** In WebMOL, nel file index.js presente nella cartella js, il metodo downloadProtein() contiene l�URL che indica 
a chi inviare la richiesta per il download della proteina. Per la prova in locale � stato utilizzato come 
indirizzo http://localhost:3000/ dove 3000 � la port dove � in attesa il server_express di WebPDB. 
Quando si vuole rendere il servizio on-line � dunque necessario modificare tale URL con il dominio di interesse. 
