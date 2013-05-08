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

var matB = [[1,1,1],[2,5,1],[0,-2,1]];

var matA = [[1,1,2],[0,1,-3]];

var result = matrix_util_accel.denseMatrixProduct(matA,matB);

log("Matrix a : "); print(matA);

log("Matrix b : "); print(matB);

log("Result : "); print(result);

// Of couse you can try other functions.
// Uncomment the following tests to try them.

/*

 */