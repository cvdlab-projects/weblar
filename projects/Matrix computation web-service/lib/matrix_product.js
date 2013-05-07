/**

	"matrix_remote_product.js"

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
	
	var mrp = exports.matrix_remote_product = {};

	mrp.url = "http://cvd01.dia.uniroma3.it:3000/service/test/multiply";

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

	/**
		Verifica se è rispettato il pattern { "ROWCOUNT" : 3, "COLCOUNT" : 3, "ROW" : [0,1,3,5], "COL" : [2,0,2,0,1], "DATA" : [1,1,1,1,1] };
		effettuando controlli sulle chiavi
	*/
	var isValidJsonMatrix = function(){
		// TODO
		return true;
	}


	/**
		Verifica se è rispettato il pattern { "ROWCOUNT" : 3, "COLCOUNT" : 3, "ROW" : [0,1,3,5], "COL" : [2,0,2,0,1], "DATA" : [1,1,1,1,1] };
		effettuando controlli sul contenuto delle chiavi
	*/
	var areMatrixValid = function(matrixA,matrixB){
		//TODO
		if ( !isValidJsonMatrix(matrixA) || !isValidJsonMatrix(matrixB) )
			return false;

		return true;
	}


	/**

	*/
	var sendRequest = function(matrixA,matrixB,callback,asynchronous){ 

		$.ajax({
			type: 'POST' ,
			url: mrp.url ,
			data :  "matrixa=" + JSON.stringify(matrixA) + "&matrixb=" + JSON.stringify(matrixB) ,
			async : asynchronous ,
			processData : false ,
			success : callback , 
			error : function(req, status, ex) {} ,
			timeout:60000
		});

	}


	/**

	*/
	var sync_result = mrp.sync_result = {};
	
	/**
		Synchronous method that implements a POST request to the rest webserver.
		It stores the result in the "sync_result" variable.
	*/
	var sendRequestSync = function(matrixA,matrixB){

		if ( !areMatrixValid(matrixA,matrixB) )
			throw new Error(); //TODO

		var callback = function(data) {
			mrp.sync_result = data;
		};

		sendRequest(matrixA,matrixB,callback,false);

	};

	/**
		Asynchronous method that implements a POST request to the rest webserver.
		On success will be executed the "callback" function
	*/
	var sendRequestAsync = function(matrixA,matrixB,callback){

		if ( !areMatrixValid(matrixA,matrixB) )
			throw new Error(); //TODO

		sendRequest(matrixA,matrixB,callback,true);

	};

	/**

	*/
	mrp.prodMatrixSync = function (matrixA,matrixB) {
		
		sendRequestSync(matrixA,matrixB);

	}

	/**

	*/
	mrp.prodMatrixSync_log = function (matrixA,matrixB) {
		
		sendRequestSync(matrixA,matrixB);

		console.log(this.sync_result);

	}

	/**

	*/
	mrp.prodMatrixAsync = function (matrixA,matrixB,callback) {
		
		sendRequestAsync(matrixA,matrixB,callback);

	}

	/**

	*/
	mrp.prodMatrixAsync_log = function (matrixA,matrixB) {

		sendRequestAsync(matrixA,matrixB, function(data) { console.log(data); });
		
	}

}(this));
