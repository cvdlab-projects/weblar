/**!
* matrix_util_accel_json.js
*
* @author Luca Menichetti and Fabrizio Rebecca
* @copyright 2013 Luca Menichetti and Fabrizio Rebecca
* @licence MIT
*/

!(function (exports){
	
	/**
	 * [matrix_util_accel description]
	 * @type {[type]}
	 */
	var matrix_util_accel_json = exports.matrix_util_accel_json = {};


	/**
	 * [csrJsonMatrixProduct description]
	 * @param  {[type]} csrJsonMatrixA [description]
	 * @param  {[type]} csrJsonMatrixB [description]
	 * @return {[type]}                [description]
	 */
	var csr_json_product = matrix_util_accel_json.csr_json_product = function (csrJsonMatrixA,csrJsonMatrixB) {
		
		matrix_remote_product.prodMatrixSync(csrJsonMatrixA,csrJsonMatrixB);

		return matrix_remote_product.sync_result;
	};


	/**
	 * [cooJsonMatrixProduct description]
	 * @param  {[type]} cooJsonMatrixA [description]
	 * @param  {[type]} cooJsonMatrixB [description]
	 * @return {[type]}                [description]
	 */

	matrix_util_accel_json.coo_json_product = function (cooJsonMatrixA, cooJsonMatrixB) {
		
		if ( !is_valid_coo_json(cooJsonMatrixA) || !is_valid_coo_json(cooJsonMatrixB))
			throw new Error("Format not valid. Needs two COO Json rapresentations with sorted rows. Syntax" +
				"{ \"row\": [...], \"col\": [...], \"val\": [...], \"rowcount\": numberOfRows, \"colcount\": numberOfcolunms }");

		return matrix_util_accel_json.csr_json_to_coo_json(csr_json_product(coo_json_to_csr_json(cooJsonMatrixA), coo_json_to_csr_json(cooJsonMatrixB)));

	};

	/**
	 * [ description]
	 * @param  {[type]} csrJson [description]
	 * @return {[type]}         [description]
	 */
	matrix_util_accel_json.csr_json_to_coo_json = function (csrJson) {
		
		if ( !is_valid_csr_json(csrJson) )
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
	matrix_util_accel_json.coo_json_to_csr = function (cooJson) {

		return new csr_matrix_from_json(coo_json_to_csr_json(cooJson));

	};

	/**
	 * [ description]
	 * @param  {[type]} cooJson [description]
	 * @return {[type]}         [description]
	 */
	var coo_json_to_csr_json = matrix_util_accel_json.coo_json_to_csr_json = function (cooJson) {
		
		if ( !is_valid_coo_json(cooJson) )
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

	/**
	 * [ description]
	 * @param  {[type]} cooJson [description]
	 * @return {[type]}         [description]
	 */
	var is_valid_coo_json = function (cooJson) {
		return !( !cooJson.hasOwnProperty("row") || !cooJson.hasOwnProperty("col") || !cooJson.hasOwnProperty("val") ||
			!cooJson.hasOwnProperty("rowcount") || !cooJson.hasOwnProperty("colcount") );
	};

	/**
	 * [ description]
	 * @param  {[type]} csrJson [description]
	 * @return {[type]}         [description]
	 */
	var is_valid_csr_json = function (csrJson) {
		return !( !csrJson.hasOwnProperty("ROW") || !csrJson.hasOwnProperty("COL") || !csrJson.hasOwnProperty("DATA") ||
			!csrJson.hasOwnProperty("ROWCOUNT") || !csrJson.hasOwnProperty("COLCOUNT") );
	};

}(this));