/*

	This is a brief example of how to use the prodMatrix function
	available on the lib matrix_remote_product.js

	Github link : https://github.com/cvdlab-bio/weblar/tree/master/projects/Matrix%20computation%20web-service

	NOTE: the service must be available at the url "http://webpdb.dia.uniroma3.it/service/test/multiply"

*/

log("====================================");
log("You are executing test_cooMatrix.js");
log("====================================");

log("Test: example of a matrix product.");

matrix_remote_product.url = "http://webpdb.dia.uniroma3.it/service/test/multiply";

log("Service must be available at the url: " + matrix_remote_product.url);

