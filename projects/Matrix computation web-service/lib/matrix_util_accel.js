/**

	"matrix_util_accel.js"

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
	
	var matrix_util_accel = exports.matrix_util_accel = {};

	/**
	 * [csrToJson description]
	 * @param  {[type]} csrMatrix [description]
	 * @return {[type]}           [description]
	 */
	var csrToJson = matrix_util_accel.csrToJson = function (csrMatrix) {
		if ( csrMatrix.constructor != csr_matrix )
			throw new Error("The argument of this function has to be a csr object.");
		return csrMatrix.toJSON();
	};

	/**
	 * [jsonToCsr description]
	 * @param  {[type]} jsonMatrix [description]
	 * @return {[type]}            [description]
	 */
	var jsonToCsr = matrix_util_accel.jsonToCsr = function (jsonMatrix) {
		return new csr_matrix_from_json(jsonMatrix);
	};


	/**
	 * [csrMatrixProduct description]
	 * @param  {[type]} csrMatrixA [description]
	 * @param  {[type]} csrMatrixB [description]
	 * @return {[type]}            [description]
	 */
	matrix_util_accel.csrMatrixProduct = function (csrMatrixA, csrMatrixB) {

		if ( csrMatrixA.constructor != csr_matrix || csrMatrixB.constructor != csr_matrix )
			throw new Error("csrMatrixA and csrMatrixB have to be csr_matrix objects.");

		return jsonToCsr(
						csrJsonMatrixProduct(
							csrToJson(csrMatrixA),
							csrToJson(csrMatrixB)
							)
						);

	};

	/**
	 * [denseMatrixProduct description]
	 * @param  {[type]} denseMatrixA [description]
	 * @param  {[type]} denseMatrixB [description]
	 * @return {[type]}              [description]
	 */
	matrix_util_accel.denseMatrixProduct = function (denseMatrixA, denseMatrixB) {
		
		return (jsonToCsr(
						csrJsonMatrixProduct(
							csrToJson(new csr_matrix_from_dense(denseMatrixA)),
							csrToJson(new csr_matrix_from_dense(denseMatrixB))
							)
						)).toDense();

	};

	/**
	 * [csrJsonMatrixProduct description]
	 * @param  {[type]} csrJsonMatrixA [description]
	 * @param  {[type]} csrJsonMatrixB [description]
	 * @return {[type]}                [description]
	 */
	var csrJsonMatrixProduct = matrix_util_accel.csrJsonMatrixProduct = function (csrJsonMatrixA,csrJsonMatrixB) {
		
		matrix_remote_product.prodMatrixSync(csrJsonMatrixA,csrJsonMatrixB);

		return matrix_remote_product.sync_result;
	};


	/**
	 * [cooJsonMatrixProduct description]
	 * @param  {[type]} cooJsonMatrixA [description]
	 * @param  {[type]} cooJsonMatrixB [description]
	 * @return {[type]}                [description]
	 */

	matrix_util_accel.cooRSJsonMatrixProduct = function (cooJsonMatrixA, cooJsonMatrixB) {
		
		if ( !isValidCooJson(cooJsonMatrixA) || !isValidCooJson(cooJsonMatrixB))
			throw new Error("Format not valid. Needs two COO Json rapresentations with sorted rows. Syntax" +
				"{ \"row\": [...], \"col\": [...], \"val\": [...], \"rowcount\": numberOfRows, \"colcount\": numberOfcolunms }");

		return csrJsonMatrixToCooJsonMatrix(csrJsonMatrixProduct(cooRSJsonToCsrJson(cooJsonMatrixA), cooRSJsonToCsrJson(cooJsonMatrixB)));

	};

	/**
	 * [ description]
	 * @param  {[type]} csrJson [description]
	 * @return {[type]}         [description]
	 */
	matrix_util_accel.csrJsonMatrixToCooJsonMatrix = function (csrJson) {
		
		if ( !isValidCsrJson(csrJson) )
			throw new Error("Format not valid. Needs a CSR Json rapresentation. Syntax" +
				"{ \"ROW\": [...], \"COL\": [...], \"DATA\": [...], \"ROWCOUNT\": numberOfRows, \"COLCOUNT\": numberOfcolunms }");

		var row = [];
		var col = [];
		var val = [];

		var i,j;
		var filled_index = 0;

		// ottimizzazione csrJson.ROW.length = csrJson.ROWCOUNT+1

		for (i=0; i < csrJson.ROW.length; i++){

			if ( i+1 == csrJson.ROW.length){
				return { "row" : row, "col" : col, "val" : val, "rowcount" : csrJson.ROWCOUNT, "colcount" : csrJson.COLCOUNT };
			}

			if ( csrJson.ROW[i] == csrJson.ROW[i+1] ){
				continue;
			}

			for (j=0; j<(csrJson.ROW[i+1] - csrJson.ROW[i]); j++){
				col[filled_index] = csrJson.COL[csrJson.ROW[i]+j];
				row[filled_index] = i;
				val[filled_index] = csrJson.DATA[csrJson.ROW[i]+j];
				filled_index++;
			}

		}

		throw new Error("Something terrible happends during CSR -> COO conversion.");

	};

	/**
	 * [cooRowSortedJsonMatrixToCsrMatrix description]
	 * @param  {[type]} cooJson [description]
	 * @return {[type]}         [description]
	 */
	/**
		[[0,1,0],[2,3,0],[0,0,1]]

	 * var m = matrix_util_accel.cooRowSortedJsonMatrixToCsrMatrix({"row":[0,1,1,2],"col":[1,0,1,2],"val":[1,2,3,1],"colcount":3,"rowcount":3})
	 */
	matrix_util_accel.cooRSJsonMatrixToCsrMatrix = function (cooJson) {

		return new csr_matrix_from_json(cooRSJsonToCsrJson(cooJson));

	};



	/**
	 * [ description]
	 * @param  {[type]} cooJson [description]
	 * @return {[type]}         [description]
	 */
	var cooRSJsonToCsrJson = matrix_util_accel.cooRSJsonMatrixToCsrJsonMatrix = function (cooJson) {
		
		if ( !isValidCooJson(cooJson) )
			throw new Error("Format not valid. Needs a COO Json rapresentation with sorted rows. Syntax" +
				"{ \"row\": [...], \"col\": [...], \"val\": [...], \"rowcount\": numberOfRows, \"colcount\": numberOfcolunms }");

		var ptr = [];
		var col = [];
		var data = [];

		var i;

		for (i=0; i<=cooJson.rowcount; i++)
			ptr[i] = 0;

		for (i=0; i<cooJson.row.length; i++)
			ptr[cooJson.row[i]+1]++;

		for (i=0; i<cooJson.rowcount; i++)
			ptr[i+1] += ptr[i];

		for (i = 0; i < cooJson.row.length; i++) {
			col[i] = cooJson.col[i];
			data[i] = cooJson.val[i];
		}

		return { "ROW" : ptr, "COL" : col, "DATA" : data, "ROWCOUNT" : cooJson.rowcount, "COLCOUNT" : cooJson.colcount };

	};

	var isValidCooJson = function (cooJson) {
		return !( !cooJson.hasOwnProperty("row") || !cooJson.hasOwnProperty("col") || !cooJson.hasOwnProperty("val") ||
			!cooJson.hasOwnProperty("rowcount") || !cooJson.hasOwnProperty("colcount") );
	};

	var isValidCsrJson = function (csrJson) {
		return !( !csrJson.hasOwnProperty("ROW") || !csrJson.hasOwnProperty("COL") || !csrJson.hasOwnProperty("DATA") ||
			!csrJson.hasOwnProperty("ROWCOUNT") || !csrJson.hasOwnProperty("COLCOUNT") );
	};

}(this));