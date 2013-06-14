/*

	In this file there are some text to test the performace of the
	matrix conversion

	You can find this library in the 'support' folder of the project on github.

	Github link : https://github.com/cvdlab-bio/weblar/tree/master/projects/Matrix%20computation%20web-service

*/

log("====================================");
log("You are executing conversion_speed.js");
log("====================================");

log("CSR CONVERSION SPEED");

var currentdate = new Date();
var start = currentdate.getTime();

var matrixA_csr_1000 = new csr_matrix_from_dense(matrix_a_1000);
currentdate = new Date();
var end = currentdate.getTime();
var time = (end-start)/1000;
log("Time taken for DENSE TO CSR conversion (1000x1000): "+time+" second");


currentdate = new Date();
start = currentdate.getTime();
var matrixA_csr_json_1000 = matrixA_csr_1000.toJSON();
currentdate = new Date();
end = currentdate.getTime();
time = (end-start)/1000;
log("Time taken for CSR TO JSON conversion (1000x1000): "+time+" second");

currentdate = new Date();
start = currentdate.getTime();
var matrixA_dense_1000 = matrixA_csr_1000.toDense();
currentdate = new Date();
end = currentdate.getTime();
time = (end-start)/1000;
log("Time taken for CSR TO DENSE conversion (1000x1000): "+time+" second");

log("-----------------------------");


log("COO CONVERSION SPEED");

currentdate = new Date();
start = currentdate.getTime();

var matrixA_coo_1000 = new coo_matrix_from_dense(matrix_a_1000);
currentdate = new Date();
end = currentdate.getTime();
time = (end-start)/1000;
log("Time taken for DENSE TO COO conversion (1000x1000): "+time+" second");

currentdate = new Date();
start = currentdate.getTime();
var matrixA_coo_json_1000 = matrixA_coo_1000.toJSON();
currentdate = new Date();
end = currentdate.getTime();
time = (end-start)/1000;
log("Time taken for COO TO JSON conversion (1000x1000): "+time+" second");

currentdate = new Date();
start = currentdate.getTime();
var matrixA_dense_1000 = matrixA_coo_1000.toDense();
currentdate = new Date();
end = currentdate.getTime();
time = (end-start)/1000;
log("Time taken for COO TO DENSE conversion (1000x1000): "+time+" second");

log("-----------------------------");