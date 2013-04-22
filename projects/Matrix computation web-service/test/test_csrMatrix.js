/*

	In this file there are some text useful to understand how to use
	sparse matrix and dense matrix, using the csrStuff.js library.

	You can find this library in the 'support' folder of the project on github.

	Github link : https://github.com/cvdlab-bio/weblar/tree/master/projects/Matrix%20computation%20web-service

*/

log("====================================");
log("You are executing test_csrMatrix.js");
log("====================================");

log("Test: how to use csr matrix library.");


/*

	First test
	Create a csr matrix starting from a csr representation
	
	I want to represent the following matrix

	1 0 1
	0 1 0
	1 0 0

*/

log("Testing how to create a matrix from values.");

var n = 3;
var m = 3;

var newPtr = [0,2,3,4];
var newCol = [0,2,1,0];
var newData = [1,1,1,1];

log("Create a matrix ["+n+" by "+m+"]");
log("Pointer array (row non-zero values): ["+newPtr+"]");
log("Columns indices value: ["+newCol+"]");
log("Values array: ["+newData+"]");

var matrix = new csr_matrix({"numrows": n, "numcols": m, "rowptr": newPtr, "colindices": newCol, "data": newData});

log("The matrix is created and this is its toString() value:");
print(matrix.toString());

log("Print the json:")
print(matrix.toJSON());

log("Print the dense matrix:");
print(matrix.toDense());

log("Test if is a binary matrix (true expected): "+matrix.isBinary());

log("-----------------------------");

/*

	Second test

	Create a csr matrix starting from a json csr representation

*/

log("Testing how to create a matrix from json.");

// { "ROW" : [0,2,3,4], "COL" : [0,2,1,0], "DATA" : [1,1,1,1], "ROWCOUNT" : 3, "COLCOUNT" : 3 }

var csr_json = { "ROW" : [0,2,3,4], "COL" : [0,2,1,0], "DATA" : [1,1,1,1], "ROWCOUNT" : 3, "COLCOUNT" : 3 };

log("Create a matrix from the following json:");
print(csr_json);
log("JSON.stringify() : " + JSON.stringify(csr_json));

var matrixFromJson = new csr_matrix_from_json(csr_json);

log("The csr matrix is created and this is its toString() valus:");
print(matrixFromJson.toString());

log("Check if the matrix is equal to the matrix of the first test (true expected): " + matrixFromJson.equals(matrix));

log("Print the dense matrix:");
print(matrixFromJson.toDense());

log("-----------------------------");

/*

	third test

	Create a csr matrix starting from a dense representation

*/

log("Testing how to create a matrix from a dense representation.");

