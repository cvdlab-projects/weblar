/*

	In this file there are some text to test the performace of the
	matrix product

	You can find this library in the 'support' folder of the project on github.

	Github link : https://github.com/cvdlab-bio/weblar/tree/master/projects/Matrix%20computation%20web-service

*/

log("====================================");
log("You are executing performance_100.js");
log("====================================");

var currentdate = new Date();
var start = currentdate.getTime();

log("100x100 PRODUCT");
log("Execute 100x100 CSR matrix product.");
var matrixAB_csr_100 = matrix_util_accel.csr_product(matrixA_csr_100,matrixB_csr_100);
currentdate = new Date();
var end = currentdate.getTime();
var time = (end-start)/1000;
log("Time taken: "+time+" second");

log("Execute 100x100 COO matrix product.");
currentdate = new Date();
start = currentdate.getTime();
var matrixAB_coo_100 = matrix_util_accel.coo_product(matrixA_coo_100,matrixB_coo_100);
currentdate = new Date();
end = currentdate.getTime();
time = (end-start)/1000;
log("Time taken: "+time+" second");