var dense_matrix = [[1, 0, 1],[0, 1, 0],[1, 0, 0]];

var matrix_from_dense = 
	new csr_matrix_from_dense(dense_matrix);

log("This is his JSON : " + 	JSON.stringify(matrix_from_dense.toJSON()));
