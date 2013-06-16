/*

	This is a brief example of how to use coo.js

	Github link : https://github.com/cvdlab-bio/weblar/tree/master/projects/Matrix%20computation%20web-service

*/

log("====================================");
log("You are executing test_cooMatrix.js");
log("====================================");
log("");
log("Test: how to use coo matrix library.");

/*

	First test
	Create a coo matrix starting from a coo representation
	
	I want to represent the following matrix

	1 0 1 0
	0 2 0 1
	1 3 6 0

*/

log("Testing how to create a matrix from values.");

var n = 3;
var m = 4;

var row =  [0,0,1,1,2,2,2];
var col =  [0,2,1,3,0,1,2];
var val = [1,1,2,1,1,3,6];

log("Create a matrix ["+n+" by "+m+"]");
log("Row indices value: ["+row+"]");
log("Columns indices value: ["+col+"]");
log("Values array: ["+val+"]");

var json = {"rowcount": n, "colcount": m, "row": row, "col": col, "val": val};

var matrix = new coo_matrix(json);

log("The matrix is created and this is its toString() value:");
print(matrix.toString());

log("Print the json:")
print(matrix.toJSON());

log("Print the dense matrix:");
print(matrix.toDense());

log("-----------------------------");

/*

	Second test

	Create a csr matrix starting from a json csr representation

*/

log("Testing how to create a matrix from json.");

var coo_json = { "rowcount": 3,
				 "colcount": 4,
				 "row": [0,0,1,1,2,2,2],
				 "col": [0,2,1,3,0,1,2],
				 "val": [1,1,2,1,1,3,6]};

log("Create a matrix from the following json:");
print(coo_json);
log("JSON.stringify() : " + JSON.stringify(coo_json));

var matrixFromJson = new coo_matrix_from_json(coo_json);

log("The coo matrix is created and this is its toString() value:");
print(matrixFromJson.toString());

log("Check if the matrix is equal to the matrix of the first test (true expected): " + matrixFromJson.equals(matrix));

log("Print the dense matrix:");
print(matrixFromJson.toDense());

log("-----------------------------");

/*

	third test

	Create a coo matrix starting from a dense representation

	[[1, 0, 1, 0],
	 [0, 2, 0, 1],
	 [1, 3, 6, 0]]

*/

log("Testing how to create a matrix from a dense representation.");

var dense_matrix = [[1, 0, 1, 0], [0, 2, 0, 1], [1, 3, 6, 0]];

log("Create the following dense matrix:");
print(dense_matrix);

var matrix_from_dense = new coo_matrix_from_dense(dense_matrix);

log("The coo matrix is created and this is its toString() value:");
print(matrix_from_dense.toString());

log("Check if the matrix is equal to the matrix of the first test (true expected): " + matrix_from_dense.equals(matrix));

log("This is his JSON : " + JSON.stringify(matrix_from_dense.toJSON()));

log("-----------------------------");