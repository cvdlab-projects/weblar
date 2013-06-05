USERSGUIDE TO WEBMOL-WEBPDB
===================

Required software
----------------------
-  CouchDB 1.0.1
-  Node.js

Procedure
----------------------

Install the required software.

Install the node modules with the installModules.sh script that you could find in the WebPDB folder. 

Configure the database in which the proteins should be stored. To do this, modify the file database.json  
and config.json that you can find in folder dbmodule of WebPDB. Here you can put the username and password 
of the database.

Populate the database with the .pdb proteins. To do this, go to folder importer of WebPDB. 
Open file testModules.js and uncomment the following row: 

  * importer.runImpoprt(�directory_with_pdb_proteins�, false, �proteins�, frUtils.filterExtension(PDB_EXTENSION));                                                                                                         

and change the directory with the directory that contains the .pdb proteins. 
Apply the same procedure when you need to load the monomers. In this case, uncomment the following row 

  * importer.runImpoprt(�directory_with_pdb_monomers�, false, �monomers�, frUtils.filterExtension(PDB_EXTENSION));

After uncomment one of this two rows, run the importer. To do this, just type on command line: node testModule.
Now the database is populated with the protiens.

Start the REST service. To do this, just type on command line: node server_express. 
Now WebPDB is ready to accept requests.

Start WebMOL and input the id of the protein to view the desired protein.


**NOTE:** For the communication is used AJAX. WebMOL uses HTTP requests via 
XMLHttpRequest that is subject to the same-origin-policy. This implies that an application that uses XMLHttpRequest 
can do HTTP requests only to domains in which it is loaded from and not to others. 

**NOTE:** In WebMOL, in file index.js in folder js, the method downloadProtein() contains the URL that indicates 
to whom the request will be send to download the protein. To test the application in local, the address it's used is 
http://localhost:3000/ where 3000 is the port where server_express of WebPDB is waiting for requests. 
When it's required to put the application online, it's necessary to modify this URL with the desired address. 
