/*

	In this file there are some text to test the performace of the
	matrix_util_accel and matrix_util_accel_json layer

	You can find this library in the 'support' folder of the project on github.

	Github link : https://github.com/cvdlab-bio/weblar/tree/master/projects/Matrix%20computation%20web-service

*/

log("====================================");
log("You are executing test_final_coo.js");
log("====================================");


var currentdate = new Date();
var start = currentdate.getTime();

log("Execute 10x10 matrix product using matrix_util_accel_json layer.");

var matrixAB_coo_json_10 = matrix_util_accel_json.coo_json_product(matrixA_coo_json_10,matrixB_coo_json_10);

currentdate = new Date();
var end = currentdate.getTime();
var time = (end-start)/1000;
log("Time taken for the result: "+time+" second");

currentdate = new Date();
start = currentdate.getTime();

log("Execute 10x10 matrix product using matrix_util_accel layer.");

var matrixAB_coo_10 = matrix_util_accel.coo_product(matrixA_coo_10,matrixB_coo_10);

currentdate = new Date();
end = currentdate.getTime();
time = (end-start)/1000;
log("Time taken for the result: "+time+" second");

log("-----------------------------");

currentdate = new Date();
start = currentdate.getTime();

log("Execute 100x100 matrix product using matrix_util_accel_json layer.");

var matrixAB_coo_json_100 = matrix_util_accel_json.coo_json_product(matrixA_coo_json_100,matrixB_coo_json_100);

currentdate = new Date();
end = currentdate.getTime();
time = (end-start)/1000;
log("Time taken for the result: "+time+" second");

currentdate = new Date();
start = currentdate.getTime();

log("Execute 100x100 matrix product using matrix_util_accel layer.");

var matrixAB_coo_100 = matrix_util_accel.coo_product(matrixA_coo_100,matrixB_coo_100);

currentdate = new Date();
end = currentdate.getTime();
time = (end-start)/1000;
log("Time taken for the result: "+time+" second");

log("-----------------------------");

currentdate = new Date();
start = currentdate.getTime();

log("Execute 1000x1000 matrix product using matrix_util_accel_json layer.");

var matrixAB_coo_json_1000 = matrix_util_accel_json.coo_json_product(matrixA_coo_json_1000,matrixB_coo_json_1000);

currentdate = new Date();
end = currentdate.getTime();
time = (end-start)/1000;
log("Time taken for the result: "+time+" second");

currentdate = new Date();
start = currentdate.getTime();

log("Execute 1000x1000 matrix product using matrix_util_accel layer.");

var matrixAB_coo_1000 = matrix_util_accel.coo_product(matrixA_coo_1000,matrixB_coo_1000);

currentdate = new Date();
end = currentdate.getTime();
time = (end-start)/1000;
log("Time taken for the result: "+time+" second");

log("-----------------------------");
