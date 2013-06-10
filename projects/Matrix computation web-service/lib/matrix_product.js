/**
* matrix_product.js
*
* @author Luca Menichetti and Fabrizio Rebecca
* @copyright 2013 Luca Menichetti and Fabrizio Rebecca
* @licence MIT
*/

!(function (exports){
	
	var mrp = exports.matrix_remote_product = {};

	mrp.url = "http://cvd01.dia.uniroma3.it:3000/service/test/multiply";

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
