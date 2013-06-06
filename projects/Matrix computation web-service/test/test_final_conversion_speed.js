/*

	In this file there are some text to test the performace of the
	matrix conversion

	You can find this library in the 'support' folder of the project on github.

	Github link : https://github.com/cvdlab-bio/weblar/tree/master/projects/Matrix%20computation%20web-service

*/

log("====================================");
log("You are executing test_final_conversion_speed.js");
log("====================================");

log("Create csr instances");

var currentdate = new Date();
var start = currentdate.getTime();

var matrixA_csr_10 = new csr_matrix_from_dense(matrix_a_10);
var matrixA_csr_json_10 = matrixA_csr_10.toJSON();

var matrixB_csr_10 = new csr_matrix_from_dense(matrix_b_10);
var matrixB_csr_json_10 = matrixB_csr_10.toJSON();

var matrixA_csr_100 = new csr_matrix_from_dense(matrix_a_100);
var matrixA_csr_json_100 = matrixA_csr_100.toJSON();

var matrixB_csr_100 = new csr_matrix_from_dense(matrix_b_100);
var matrixB_csr_json_100 = matrixB_csr_100.toJSON();

var matrixA_csr_1000 = new csr_matrix_from_dense(matrix_a_1000);
var matrixA_csr_json_1000 = matrixA_csr_1000.toJSON();

var matrixB_csr_1000 = new csr_matrix_from_dense(matrix_b_1000);
var matrixB_csr_json_1000 = matrixB_csr_1000.toJSON();

currentdate = new Date();
var end = currentdate.getTime();
var time = (end-start)/1000;

log("Time taken for DENSE TO CSR (INSTANCE AND JSON) conversion (10x10,100x100,1000x1000): "+time+" second");
log("-----------------------------");


log("Create coo instances");

currentdate = new Date();
start = currentdate.getTime();

var matrixA_coo_10 = new coo_matrix_from_dense(matrix_a_10);
var matrixA_coo_json_10 = matrixA_coo_10.toJSON();

var matrixB_coo_10 = new coo_matrix_from_dense(matrix_b_10);
var matrixB_coo_json_10 = matrixB_coo_10.toJSON();

var matrixA_coo_100 = new coo_matrix_from_dense(matrix_a_100);
var matrixA_coo_json_100 = matrixA_coo_100.toJSON();

var matrixB_coo_100 = new coo_matrix_from_dense(matrix_b_100);
var matrixB_coo_json_100 = matrixB_coo_100.toJSON();

var matrixA_coo_1000 = new coo_matrix_from_dense(matrix_a_1000);
var matrixA_coo_json_1000 = matrixA_coo_1000.toJSON();

var matrixB_coo_1000 = new coo_matrix_from_dense(matrix_b_1000);
var matrixB_coo_json_1000 = matrixB_coo_1000.toJSON();

currentdate = new Date();
end = currentdate.getTime();
time = (end-start)/1000;

log("Time taken for DENSE TO COO (JSON) conversion (10x10,100x100,1000x1000): "+time+" second");
log("-----------------------------");
/**/