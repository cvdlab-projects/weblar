/*

	This is a brief example of how to use the prodMatrix function
	available on the lib matrix_util_accel.js

	Github link : https://github.com/cvdlab-bio/weblar/tree/master/projects/Matrix%20computation%20web-service

	NOTE: the service must be available at the url "http://webpdb.dia.uniroma3.it/service/test/multiply"

*/

log("=========================================");
log("You are executing test_matrixUtilAccel.js");
log("=========================================");

// testing function : denseMatrixProduct(a,b)

log("Test: example of a REMOTE DENSE matrix product.");

matrix_remote_product.url = "http://webpdb.dia.uniroma3.it/service/test/multiply";

log("Service must be available at the url: " + matrix_remote_product.url);

var matA = [[1,1,2],[0,1,-3]];

var matB = [[1,1,1],[2,5,1],[0,-2,1]];

var result = matrix_util_accel.dense_product(matA,matB);

log("Matrix a : "); print(matA);

log("Matrix b : "); print(matB);

log("Result : "); print(result);


// testing function : csrMatrixProduct(a,b)

log("Test: example of a REMOTE CSR matrix product.");

/*

	[[0,1,1],
	 [0,2,0],
	 [1,3,0]
	 [1,0,1]]

	[[1,0,2],
	 [2,3,0],
	 [0,0,1]]

 */

var csrMatrixA = new csr_matrix_from_json({"ROW":[0,2,3,5,7],"COL":[1,2,1,0,1,0,2],"DATA":[1,1,2,1,3,1,1],"ROWCOUNT":4,"COLCOUNT":3});

var csrMatrixB = new csr_matrix_from_json({"ROW":[0,2,4,5],"COL":[0,2,0,1,2],"DATA":[1,2,2,3,1],"ROWCOUNT":3,"COLCOUNT":3});

var result = matrix_util_accel.csr_product(csrMatrixA,csrMatrixB);

log("Matrix a : "); print(csrMatrixA.toJSON());

log("Matrix b : "); print(csrMatrixB.toJSON());

log("Result : "); print(result.toJSON());


// testing function : cooRSJsonMatrixToCsrMatrix(jsonA,jsonB)

log("Test: example of a COO to CSR convertion starting from a JSON COO representation.");

/*
	COO matrix 1
		
		[[4, 0, 9, 0],
        [0, 7, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 5]]
 */

var cooJsonMatrix = {"row":[0,0,1,3],"col":[0,2,1,3],"val":[4,9,7,5],"rowcount":4,"colcount":4};

var csrConvertedMatrix = matrix_util_accel.coo_json_to_csr(cooJsonMatrix);


// testing function : csrJsonMatrixProduct(jsonA,jsonB)

log("Test: example of csr product starting from 2 json representation.");

var csrJsonMatrixA = {"ROW":[0,2,3,3,4],"COL":[0,2,1,3],"DATA":[4,9,7,5],"ROWCOUNT":4,"COLCOUNT":4};

var csrJsonMatrixB = {"ROW":[0,1,3,5,6],"COL":[1,0,1,0,1,0],"DATA":[1,2,3,4,5,6],"ROWCOUNT":4,"COLCOUNT":2};

var resultJson = matrix_util_accel_json.csr_json_product(csrJsonMatrixA,csrJsonMatrixB);

print(resultJson);

// Of couse you can try other functions.
// Uncomment the following tests to try them.

/*

 */