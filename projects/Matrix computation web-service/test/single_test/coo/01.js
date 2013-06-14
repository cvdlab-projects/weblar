
var dense_matrix = [[1, 0, 1, 0], [0, 2, 0, 1], [1, 3, 6, 0]];

var matrix_from_dense = 
	new coo_matrix_from_dense(dense_matrix);

log("This is his JSON : " + 	JSON.stringify(matrix_from_dense.toJSON()));
