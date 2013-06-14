/*

	This is a brief example of how to use the prodMatrix function
	available on the lib matrix_remote_product.js

	Github link : https://github.com/cvdlab-bio/weblar/tree/master/projects/Matrix%20computation%20web-service

	NOTE: the service must be available at the url "http://webpdb.dia.uniroma3.it/service/test/multiply"

*/

log("====================================");
log("You are executing test_prodMatrix.js");
log("====================================");

log("Test: example of a matrix product.");

matrix_remote_product.url = "http://webpdb.dia.uniroma3.it/service/test/multiply";

log("Service must be available at the url: " + matrix_remote_product.url);


// testing function : prodMatrixAsync_log()

log("Testing prodMatrixAsync_log(), an ascynchronous request will be sent and the response will be printed in the console.");

var Ajson = { "ROWCOUNT" : 3, "COLCOUNT" : 3, "ROW" : [0,1,3,5], "COL" : [2,0,2,0,1], "DATA" : [1,1,1,1,1] };
var Bjson = { "ROWCOUNT" : 3, "COLCOUNT" : 3, "ROW" : [0,1,3,5], "COL" : [2,0,2,0,1], "DATA" : [1,1,1,1,1] };

matrix_remote_product.prodMatrixAsync_log(Ajson,Bjson);

// Of couse you can try other functions, for example the sync function or the function without logs.
// The result will be the same, a product will be executed, the differences will be on request's type.
// Uncomment the following tests to try them.


/*

	// testing function : prodMatrixSync_log()

	log("Testing prodMatrixSync_log(), a scynchronous request will be sent and the response will be printed in the console.");

	var Ajson = { "ROWCOUNT" : 3, "COLCOUNT" : 3, "ROW" : [0,1,3,5], "COL" : [2,0,2,0,1], "DATA" : [1,1,1,1,1] };
	var Bjson = { "ROWCOUNT" : 3, "COLCOUNT" : 3, "ROW" : [0,1,3,5], "COL" : [2,0,2,0,1], "DATA" : [1,1,1,1,1] };

	matrix_remote_product.prodMatrixSync_log(Ajson,Bjson);

*/


/*

	// testing function : prodMatrixAsync()

	log("Testing prodMatrixAsync(), an ascynchronous request will be sent.");

	var Ajson = { "ROWCOUNT" : 3, "COLCOUNT" : 3, "ROW" : [0,1,3,5], "COL" : [2,0,2,0,1], "DATA" : [1,1,1,1,1] };
	var Bjson = { "ROWCOUNT" : 3, "COLCOUNT" : 3, "ROW" : [0,1,3,5], "COL" : [2,0,2,0,1], "DATA" : [1,1,1,1,1] };

	var callbackFunction = function(data){
		// do what you want here
		// considering that data is a matrix in json format
		console.log(data);
	}

	matrix_remote_product.prodMatrixAsync(Ajson,Bjson,callbackFunction);

*/


/*

	// testing function : prodMatrixSync()

	log("Testing prodMatrixSync(), a scynchronous request will be sent.");

	var Ajson = { "ROWCOUNT" : 3, "COLCOUNT" : 3, "ROW" : [0,1,3,5], "COL" : [2,0,2,0,1], "DATA" : [1,1,1,1,1] };
	var Bjson = { "ROWCOUNT" : 3, "COLCOUNT" : 3, "ROW" : [0,1,3,5], "COL" : [2,0,2,0,1], "DATA" : [1,1,1,1,1] };

	var callbackFunction = function(data){
		// do what you want here
		console.log(data);
	}

	matrix_remote_product.prodMatrixSync(Ajson,Bjson);

	// now the result is in the matrix_remote_product.sync_result variable

	callbackFunction( matrix_remote_product.sync_result );

*/
