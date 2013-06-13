# Tasks

*In this file it's shown how we are going to set up a tasks' division for our projects.*

***

# Summary

## First Project [link](Extension of the LAR.js and LAR-DEMO.js/)

**Extension of the `LAR.js` and `LAR-DEMO.js` projects with new functions**

1) Implementation of the cartesian product function.
  * [a] Study of the "larProduct" function, currently present in lar.py.
  * [b] Integration of the lar.js project with this function, which will allow to do the product between models and which is based on the "larProduct" function.   

2) Generalization of the "extract" function present in lar.js for simplicial complexes. 
  * [a] Study of the "larFacets" function (and it's implemented algorithm) present in lar.py. 
  * [b] Reimplementation of that function in the lar.js project, currently provided with an extraction function only on simplexes. 

| Assigned to       | Tasks         | Notes       |
| ------------- |-------------  | ----------- |
| Andrea Somma  |  1,2           | ---            |
| Elisa Lamberti|  1,2           | ---            |
| Fabio Cumbo   |  1,2           | ---            |


## Second Project [link](Matrix computation web-service/)

**Integration of the matrix computation web-service**

(1) Localization of code's sections that use matrix's operation
  * [a] Creation on an interface that links with the computation layer

(2) Creation of a proper layer that implements the computation of matrix's operation hiding the logic implementation
  * [a] Management of the matrix format with opportune encoding for the forwarding on the network 
  * [b] Realitazione of a procedure for the comunication's enstablishment with the web service on a public server
  * [c] Answer management and decoding

(3) Setup a web service that offers such operation online
  * [a] Acquisition, request management and result forwarding


| Assigned to       | Tasks         | Notes       |
| -------------     |-------------  | ----------- |
| Fabrizio Rebecca  | 1-a, 2-a, 2-c | ---         |
| Luca Menichetti   | 1-a, 2-b, 3-a | ---         |


## Third Project [link](PDB visualization service/)

**Integration of `PDB` visualization service**

(1) Integration of webpdb and webmol
  * [a] Identify the function structure of WebMOL and WebPDB
  * [b] Identify the connection between the two applications
  * [c] Definition of an connection interface between the two applications
  * [d] Structure the two projects in one project

| Assigned to       | Tasks         | Notes       |
| ------------- |-------------  | ----------- |
| Oscar Eijsermans              |  1             | ---             |


 
***

# Members' Responsabily

| Name              |   Role        |   Description      |
| -------------     |-------------  | -----------             |
| Fabrizio Rebecca  | Manager       | *Has to direct the work inside the team, managing the evolution off all the projects and assigning tasks between members* |
| Luca Menichetti   | Spokesperson  | *Has to represent the team weblar, showing and explaining approach, technique and results. Is responsable to get in touch with other teams.* |
| Andrea Somma      | Code Manager  | *Is in charge of organizing code's workflow on git.* |
