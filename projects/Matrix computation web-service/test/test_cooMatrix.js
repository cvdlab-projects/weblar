/*

	This is a brief example of how to use the prodMatrix function
	available on the lib matrix_remote_product.js

	Github link : https://github.com/cvdlab-bio/weblar/tree/master/projects/Matrix%20computation%20web-service

*/

log("====================================");
log("You are executing test_cooMatrix.js");
log("====================================");

log("");

matrix_remote_product.url = "http://webpdb.dia.uniroma3.it/service/test/multiply";

log("Service must be available at the url: " + matrix_remote_product.url);

