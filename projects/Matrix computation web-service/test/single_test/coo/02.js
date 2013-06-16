
var coo_json = { "rowcount": 3,
		    "colcount": 4,
		    "row": [0,0,1,1,2,2,2],
		    "col": [0,2,1,3,0,1,2],
	                 "val": [1,1,2,1,1,3,6]};

var matrixFromJson = new coo_matrix_from_json(coo_json);