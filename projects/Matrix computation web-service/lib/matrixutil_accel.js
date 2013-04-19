/**

	matrixutil_accel.js

	Accelerated matrix utility

	The MIT License
	===============
	    
	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the
	'Software'), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:

	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
	CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
	TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
	SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

!(function (exports){
	
	var matrix_util = exports.matrix_util = {};

	matrix_util.url = "http://cvd01.dia.uniroma3.it:3000/service/test/multiply";

	/*

	var csrToJSON = function(CSRm){

	    if (not isspmatrix_csr(CSRm)):
	        trow Exception('Matrix is not in CSR format')

	    var ROWCOUNT = CSRm.shape[0];
	    var COLCOUNT = CSRm.shape[1];
	    var ROW = CSRm.indptr.tolist();
	    var COL = CSRm.indices.tolist();
	    var DATA = CSRm.data.tolist();
	    var JSONm = json.dumps({"ROWCOUNT":ROWCOUNT, "COLCOUNT":COLCOUNT, "ROW":ROW, "COL":COL, "DATA":DATA })

	    logging.debug('CSRm.todense(): ' + str(CSRm.todense()));
	    logging.info('ROWCOUNT: ' + str(ROWCOUNT));
	    logging.info('COLCOUNT: ' + str(COLCOUNT));
	    logging.info('ROW: ' + str(ROW));
	    logging.info('COL: ' + str(COL));
	    logging.info('DATA: ' + str(DATA));

	    return JSONm
	};

	var jsonToCSR = function(JSONm){

	    var ROWCOUNT = JSONm['ROWCOUNT'];
	    var COLCOUNT = JSONm['COLCOUNT'];
	    var ROW = JSONm['ROW'];
	    var COL = JSONm['COL'];
	    var DATA = JSONm['DATA'];
	    var CSRm = csr_matrix((array(DATA),array(COL),array(ROW)),shape=(ROWCOUNT,COLCOUNT));

	    if (!isspmatrix_csr(CSRm))
	        trow Exception('Matrix is not in CSR format');

	    logging.debug('CSRm.todense(): ' + str(CSRm.todense()));
	    logging.info('ROWCOUNT: ' + str(ROWCOUNT));
	    logging.info('COLCOUNT: ' + str(COLCOUNT));
	    logging.info('ROW: ' + str(ROW));
	    logging.info('COL: ' + str(COL));
	    logging.info('DATA: ' + str(DATA));
	    
	    return CSRm;
	}

	matrix_util.csrTranspose = function(CSRm){
	    CSRm = CSRm.T;
	    return CSRm;
	}
	
	*/

	/*
		Synchronous method that implements a POST request to the rest webserver.
		It stores the result in the "sync_result" variable
	*/

	var sync_result = exports.sync_result = {};

	matrix_util.sendRequestSync = function(matrixA,matrixB){

		var callback = function(data) { 
			sync_result = data;
		};

		$.ajax({
			type: 'POST' ,
			url: matrix_util.url ,
			data :  "matrixa=" + JSON.stringify(matrixA) + "&matrixb=" + JSON.stringify(matrixB) ,
			async : false ,
			processData : false ,
			success : callback , 
			error : function(req, status, ex) {} ,
			timeout:60000
		});

	};


	/*
		Asynchronous method that implements a POST request to the rest webserver.
		It stores the result in the "sync_result" variable
	*/

	matrix_util.sendRequestAsync = function(matrixA,matrixB,callback){

		$.ajax({
			type: 'POST' ,
			url: matrix_util.url ,
			data :  "matrixa=" + JSON.stringify(matrixA) + "&matrixb=" + JSON.stringify(matrixB) ,
			processData : false ,
			success : callback , 
			error : function(req, status, ex) {} ,
			timeout:60000
		});

	};

}(this));
