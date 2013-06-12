/**!
* matrix_util_accel.js
*
* @author Luca Menichetti and Fabrizio Rebecca
* @copyright 2013 Luca Menichetti and Fabrizio Rebecca
* @licence MIT
*/

!(function (exports){
	
	var matrix_util_accel = exports.matrix_util_accel = {};

	/**
	 * Convert from a CSR instance to JSON
	 * @param  {csr} csrMatrix
	 * @return {JSON}
	 */
	var csr_to_json = matrix_util_accel.csr_to_json = function (csrMatrix) {
		if ( csrMatrix.constructor != csr_matrix )
			throw new Error("The argument of this function has to be a csr object.");
		return csrMatrix.toJSON();
	};

	/**
	 * Convert from a JSON to a CSR instance
	 * @param  {JSON} jsonMatrix
	 * @return {csr}
	 */
	var json_to_csr = matrix_util_accel.json_to_csr = function (jsonMatrix) {
		return new csr_matrix_from_json(jsonMatrix);
	};

	/**
	 * Convert from a COO instance to JSON
	 * @param  {coo} cooMatrix
	 * @return {JSON}          
	 */
	var coo_to_json = matrix_util_accel.coo_to_json = function (cooMatrix) {
		if ( cooMatrix.constructor != coo_matrix )
			throw new Error("The argument of this function has to be a coo object.");
		return cooMatrix.toJSON();
	};

	/**
	 * Convert from a JSON to a COO instance
	 * @param  {JSON} jsonMatrix
	 * @return {coo}
	 */
	var json_to_coo = matrix_util_accel.json_to_coo = function (jsonMatrix) {
		return new coo_matrix_from_json(jsonMatrix);
	};


	/**
	 * Send a request for an accelerated matrix product for the web service.
	 * Starting from two instances of CSR matrices returns their product.
	 * @param  {csr} csrMatrixA
	 * @param  {csr} csrMatrixB
	 * @return {csr}           
	 */
	matrix_util_accel.csr_product = function (csrMatrixA, csrMatrixB) {
		if ( csrMatrixA.constructor != csr_matrix || csrMatrixB.constructor != csr_matrix )
			throw new Error("Expecting two matrices that have to be csr_matrix objects.");
		return json_to_csr(
			matrix_util_accel_json.csr_json_product(
				csr_to_json(csrMatrixA),
				csr_to_json(csrMatrixB)
			)
		);
	};

    /**
	 * Send a request for an accelerated matrix product for the web service.
	 * Starting from two instances of COO matrices returns their product.
	 * @param  {coo} cooMatrixA
	 * @param  {coo} cooMatrixB
	 * @return {coo} 
	 */
	matrix_util_accel.coo_product = function (cooMatrixA, cooMatrixB) {
		if ( cooMatrixA.constructor != coo_matrix || cooMatrixB.constructor != coo_matrix )
			throw new Error("Expecting two matrices that have to be coo_matrix objects.");
		return json_to_coo(
			matrix_util_accel_json.coo_json_product(
				coo_to_json(cooMatrixA),
				coo_to_json(cooMatrixB)
			)
		);
	};

	/**
	 * Send a request for an accelerated matrix product for the web service.
	 * Starting from two array of array representing two matrices returns their product.
	 * @param  {Array{Array}} denseMatrixA
	 * @param  {Array{Array}} denseMatrixB
	 * @return {Array{Array}}
	 */
	matrix_util_accel.dense_product = function (denseMatrixA, denseMatrixB) {
		return (json_to_csr(
			matrix_util_accel_json.csr_json_product(
				csr_to_json(new csr_matrix_from_dense(denseMatrixA)),
				csr_to_json(new csr_matrix_from_dense(denseMatrixB))
			)
		)).toDense();
	};

}(this));