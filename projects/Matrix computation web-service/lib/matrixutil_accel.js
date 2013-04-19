		/*
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
		    
		

		!(function (exports){

		var matrix_util = exports.matrix_util = {};

		matrix_util.url = "http://webpdb.dia.uniroma3.it/multiply";

		matrix_util.csrToJSON = function(CSRm){

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

		matrix_util.jsonToCSR = function(JSONm){

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
		    
		matrix_util.matrixProduct = function(A,B){

		// Input parameters check

		    if (!isspmatrix(A))
		        trow Exception('A is not a scipy matrix')
		    if (!isspmatrix(B)):
		        trow Exception('B is not a scipy matrix')
		    if (!(A.shape[1] == B.shape[0])):
		        trow Exception('Column of matrix A are not equal to raws of matrix B')

		// Convert to JSON

		    logging.info('Matrix A');
		    var Ajson = csrToJSON(A.tocsr());
		    
		    logging.info('Matrix B');
		    var Bjson = csrToJSON(B.tocsr()); 

		// Send A and B, Receive A*B

		    var payload = {"matrixa": Ajson, "matrixb": Bjson};   

		    var req = requests.post(url, data=payload);
		    logging.info('Matrix A and matrix B sent');
		    logging.info('Status code: ' + str(req.status_code));
		    logging.info('Url: ' + str(req.url));
		    logging.info('Headers: ' + req.headers['Content-Type']);
		    //logging.debug('Content: ' + str(req.content));

		    ABjson = json.loads(req.content);
		    logging.info('Matrix A*B received');

		// Convert to CSR

		    logging.info('Matrix AB');
		    var AB = jsonToCSR(ABjson);

		// Output parameters check

		    if (!isspmatrix(AB))
		        trow Exception('A*B is not a scipy matrix');
		    if (!((AB.shape[0] == A.shape[0]) and (AB.shape[1] == B.shape[1])))
		        trow Exception('Output matrix A*B dimensions are not compatible with input matrices A,B dimensions');

		    return AB;
		}

	}());

*/

// matrix_util.send({ "ROW" : 3, "COL" : 3, "DATA" : [1,1,1,1,1], "ROWCOUNT" : [0,1,3,5], "COLCOUNT" : [2,0,2,0,1] })

!(function (exports){

	var matrix_util = exports.matrix_util = {};

	var url = matrix_util.url = "http://cvd01.dia.uniroma3.it:3000/multiply";

	this.send = matrix_util.send = function(model) {  
	$.ajax({  
		type: 'POST',  
		url: this.url,  
		data: JSON.stringify(model), // '{"name":"' + model.name + '"}',  
		dataType: 'text',  
		processData: false,  
		contentType: 'application/json',  
		success: function(data){ console.log("wiiiiiiiiiiiii"); console.log(data); },  
		error: function(req, status, ex) {},  
		timeout:60000  
	});

  }; 

}(this));