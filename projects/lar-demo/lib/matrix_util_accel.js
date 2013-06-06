/**!
* matrix_util_accel.js
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
	var matrix_util_accel = exports.matrix_util_accel = {};

	/**
	 * [csrToJson description]
	 * @param  {[type]} csrMatrix [description]
	 * @return {[type]}           [description]
	 */
	var csr_to_json = matrix_util_accel.csr_to_json = function (csrMatrix) {
		if ( csrMatrix.constructor != csr_matrix )
			throw new Error("The argument of this function has to be a csr object.");
		return csrMatrix.toJSON();
	};

	/**
	 * [jsonToCsr description]
	 * @param  {[type]} jsonMatrix [description]
	 * @return {[type]}            [description]
	 */
	var json_to_csr = matrix_util_accel.json_to_csr = function (jsonMatrix) {
		return new csr_matrix_from_json(jsonMatrix);
	};

		/**
	 * [cooToJson description]
	 * @param  {[type]} csrMatrix [description]
	 * @return {[type]}           [description]
	 */
	var coo_to_json = matrix_util_accel.coo_to_json = function (cooMatrix) {
		if ( cooMatrix.constructor != coo_matrix )
			throw new Error("The argument of this function has to be a coo object.");
		return cooMatrix.toJSON();
	};

	/**
	 * [jsonTocoo description]
	 * @param  {[type]} jsonMatrix [description]
	 * @return {[type]}            [description]
	 */
	var json_to_coo = matrix_util_accel.json_to_coo = function (jsonMatrix) {
		return new coo_matrix_from_json(jsonMatrix);
	};


	/**
	 * [csrMatrixProduct description]
	 * @param  {[type]} csrMatrixA [description]
	 * @param  {[type]} csrMatrixB [description]
	 * @return {[type]}            [description]
	 */
	matrix_util_accel.csr_product = function (csrMatrixA, csrMatrixB) {

		if ( csrMatrixA.constructor != csr_matrix || csrMatrixB.constructor != csr_matrix )
			throw new Error("csrMatrixA and csrMatrixB have to be csr_matrix objects.");

		return json_to_csr(
						matrix_util_accel_json.csr_json_product(
							csr_to_json(csrMatrixA),
							csr_to_json(csrMatrixB)
							)
						);

	};

    /**
	 * [cooMatrixProduct description]
	 * @param  {[type]} csrMatrixA [description]
	 * @param  {[type]} csrMatrixB [description]
	 * @return {[type]}            [description]
	 */
	matrix_util_accel.coo_product = function (cooMatrixA, cooMatrixB) {

		if ( cooMatrixA.constructor != coo_matrix || cooMatrixB.constructor != coo_matrix )
			throw new Error("cooMatrixA and cooMatrixB have to be coo_matrix objects.");

		return json_to_coo(
						matrix_util_accel_json.coo_json_product(
							coo_to_json(cooMatrixA),
							coo_to_json(cooMatrixB)
							)
						);

	};

	/**
	 * [denseMatrixProduct description]
	 * @param  {[type]} denseMatrixA [description]
	 * @param  {[type]} denseMatrixB [description]
	 * @return {[type]}              [description]
	 */
	matrix_util_accel.dense_product = function (denseMatrixA, denseMatrixB) {
		
		return (json_to_csr(
						matrix_util_accel_json.csr_json_product(
							csr_to_json(new csr_matrix_from_dense(denseMatrixA)),
							csr_to_json(new csr_matrix_from_dense(denseMatrixB))
							)
						)).toDense();

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
	matrix_util_accel.coo_json_to_csr = function (cooJson) {

		return new csr_matrix_from_json(matrix_util_accel_json.coo_json_to_csr_json(cooJson));

	};

}(this));